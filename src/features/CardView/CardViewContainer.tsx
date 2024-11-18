import { useEffect, useState } from 'react'

import { useCardViewStore } from './useCardViewStore'
import { useGetListData } from '../../api/useGetListData'

import { Spinner } from '../../components/Spinner'
import { CardView } from './CardView'
import { Button } from '../../components/Button'

export const CardViewContainer = () => {
    const { data, isLoading, isFetching, isError, refetch } = useGetListData()
    const { cards, toggleCollapse, removeCard, mergeServerState } =
        useCardViewStore()
    const [isDeletedCardsHidden, setIsDeletedCardsHidden] = useState(false)

    const toggleRevealDeletedCards = () => {
        setIsDeletedCardsHidden((prev) => !prev)
    }

    useEffect(() => {
        if (!isLoading && data) {
            mergeServerState(data)
        }
    }, [data, isLoading])

    const visibleCards =
        cards.filter((item) => item.isVisible && !item.isDeleted) ?? []
    const visibleDeletedCards =
        cards.filter((item) => item.isVisible && item.isDeleted) ?? []
    const reloadCards = () => {
        refetch({ cancelRefetch: false })
    }
    if (isLoading || isFetching) {
        return <Spinner />
    }
    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center gap-2">
                <p>
                    Unxpected Error Occured, press the refresh button to try
                    again.
                </p>
                <Button
                    className="border-2 border-gray-300 rounded p-1 bg-white hover:bg-gray-100 transition-colors ease-out duration-250 active:scale-95"
                    onClick={reloadCards}
                >
                    Refetch
                </Button>
            </div>
        )
    }
    return (
        <CardView
            isDeletedCardsHidden={isDeletedCardsHidden}
            toggleRevealDeletedCards={toggleRevealDeletedCards}
            reloadCards={reloadCards}
            visibleCards={visibleCards}
            visibleDeletedCards={visibleDeletedCards}
            onToggleCollapse={toggleCollapse}
            onClickRemove={(cardId: number) => removeCard(cardId)}
        />
    )
}
