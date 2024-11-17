import { FC } from 'react'
import { ListItem } from '../../api/getListData'
import { Card } from '../../components/Card'

type CardViewProps = {
    visibleCards: ListItem[]
}

export const CardView: FC<CardViewProps> = ({ visibleCards }) => {
    return (
        <div className="flex gap-x-16">
            <div className="w-full max-w-xl">
                <h1 className="mb-1 font-medium text-lg">
                    My Awesome List ({visibleCards.length})
                </h1>
                <div className="flex flex-col gap-y-3">
                    {visibleCards.map((card) => (
                        <Card
                            key={card.id}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full max-w-xl">
                <div className="flex items-center justify-between">
                    <h1 className="mb-1 font-medium text-lg">
                        Deleted Cards (0)
                    </h1>
                    <button
                        disabled
                        className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
                    >
                        Reveal
                    </button>
                </div>
                <div className="flex flex-col gap-y-3">
                    {/* {deletedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))} */}
                </div>
            </div>
        </div>
    )
}
