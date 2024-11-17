import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

import { CardType } from './Card/CardType'
import { ListItem } from '../../api/useGetListData'

type CardViewState = {
    cards: CardType[]
    clientCardsInfo: Record<string, CardType>
}

type CardViewActions = {
    toggleCollapse: (cardId: number) => void
    removeCard: (cardId: number) => void
    mergeServerState: (fetchedCards: ListItem[]) => void
}

type PersistedState = {
    context: Record<string, CardType>
}

export const useCardViewStore = create<CardViewState & CardViewActions>()(
    persist(
        immer((set) => ({
            cards: [],
            clientCardsInfo: {},
            mergeServerState: (fetchedCards: ListItem[]) => {
                set((state) => {
                    state.cards = []

                    fetchedCards.forEach((fetchedCard) => {
                        const existingClientCard =
                            state.clientCardsInfo[fetchedCard.id]

                        if (existingClientCard) {
                            existingClientCard.title = fetchedCard.title
                            existingClientCard.description =
                                fetchedCard.description
                            existingClientCard.isVisible = fetchedCard.isVisible
                            state.cards.push(existingClientCard)
                        } else {
                            const newCard: CardType = {
                                ...fetchedCard,
                                isDeleted: false,
                                isCollapsed: false,
                            }
                            state.clientCardsInfo[newCard.id] = newCard
                            state.cards.push(newCard)
                        }
                    })
                    state.cards = Array.from(state.cards)
                })
            },
            toggleCollapse: (cardId) => {
                set((state) => {
                    const card = state.cards.find((c) => c.id === cardId)
                    const cardInfo = state.clientCardsInfo[cardId]

                    if (!card) return

                    const newCollapseState = !card.isCollapsed
                    card.isCollapsed = newCollapseState
                    if (!cardInfo) {
                        state.clientCardsInfo[cardId] = card
                    }
                    cardInfo.isCollapsed = newCollapseState
                })
            },
            removeCard: (cardId) => {
                set((state) => {
                    const card = state.cards.find((c) => c.id === cardId)
                    const cardInfo = state.clientCardsInfo[cardId]

                    if (!card) return
                    card.isDeleted = true
                    if (!cardInfo) {
                        state.clientCardsInfo[cardId] = card
                    }
                    cardInfo.isDeleted = true
                })
            },
        })),
        {
            name: 'client-cards-info-storage',
            partialize: (state) => ({ context: state.clientCardsInfo }),
            merge: (persistedState, currentState) => {
                currentState.clientCardsInfo = (
                    persistedState as PersistedState
                ).context
                return currentState
            },
        }
    )
)
