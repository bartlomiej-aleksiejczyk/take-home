import { FC } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { Card } from './Card/Card'
import { CardType } from './Card/CardType'
import { Button } from '../../components/Button'

type CardViewProps = {
    toggleRevealDeletedCards: VoidFunction
    isDeletedCardsHidden: boolean
    visibleCards: CardType[]
    visibleDeletedCards: CardType[]
    onToggleCollapse: (cardId: number) => void
    onClickRemove: (cardId: number) => void
    reloadCards: VoidFunction
}

export const CardView: FC<CardViewProps> = ({
    visibleCards,
    visibleDeletedCards,
    onToggleCollapse,
    onClickRemove,
    reloadCards,
    isDeletedCardsHidden,
    toggleRevealDeletedCards,
}) => {
    const [parent] = useAutoAnimate()
    return (
        <div className="flex flex flex-col gap-10 justify-center items-center">
            <Button
                onClick={reloadCards}
                className="w-40 border-2 border-gray-300 rounded p-1 bg-white hover:bg-gray-100 transition-colors ease-out duration-250 active:scale-95"
            >
                Refresh
            </Button>
            <div className="w-full min-h-[60vh] flex gap-x-16 flex flex-row items-start">
                <div className="w-[33vw]">
                    <div>
                        <h1 className="mb-1 font-medium text-lg">
                            My Awesome List ({visibleCards.length})
                        </h1>
                        <div className="flex flex-col gap-y-3" ref={parent}>
                            {visibleCards.map((card) => (
                                <Card
                                    key={card.id}
                                    title={card.title}
                                    description={card.description}
                                    isCollapsed={card.isCollapsed ?? false}
                                    onToggleCollapse={() =>
                                        onToggleCollapse(card.id)
                                    }
                                    onClickRemove={() => onClickRemove(card.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-[33vw]" ref={parent}>
                    <div className="flex items-center justify-between ">
                        <h1 className="mb-1 font-medium text-lg">
                            Deleted Cards ({visibleDeletedCards.length})
                        </h1>

                        <Button
                            className="border-2 border-gray-300 rounded px-2 mb-1.5 bg-white hover:bg-gray-100 transition-colors ease-out duration-250 active:scale-95"
                            onClick={toggleRevealDeletedCards}
                        >
                            {isDeletedCardsHidden ? 'Hide' : 'Reveal'}
                        </Button>
                    </div>
                    {isDeletedCardsHidden && (
                        <div className="flex flex-col gap-y-3" ref={parent}>
                            {visibleDeletedCards.map((card) => (
                                <Card key={card.id} title={card.title} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
