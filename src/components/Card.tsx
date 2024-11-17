import { FC } from 'react'
import { ListItem } from '../api/getListData'
import { ExpandButton } from './ExpandButton'
import { DeleteButton } from './DeleteButton'
import { ChevronUpIcon } from './icons/ChevronUpIcon'

type CardProps = {
    title: ListItem['title']
    description: ListItem['description']
}

export const Card: FC<CardProps> = ({ title, description }) => {
    return (
        <div className="border border-black px-2 py-1.5">
            <div className="flex justify-between mb-0.5">
                <h1 className="font-medium">{title}</h1>
                <div className="flex">
                    <ExpandButton>
                        <ChevronUpIcon />
                    </ExpandButton>
                    <DeleteButton />
                </div>
            </div>
            <p className="text-sm">{description}</p>
        </div>
    )
}
