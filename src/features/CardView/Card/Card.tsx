import { FC } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { ListItem } from '../../../api/useGetListData'
import { Button } from '../../../components/Button'
import { XMarkIcon } from '../../../components/icons/XMarkIcon'
import { ToggleButton } from '../../../components/ToggleButton'
import { ChevronUpIcon } from '../../../components/icons/ChevronUpIcon'
import { ChevronDownIcon } from '../../../components/icons/ChevronDownIcon'

type CardProps = {
    title: ListItem['title']
    description?: ListItem['description']
    isCollapsed?: boolean
    onToggleCollapse?: (isToggled: boolean) => void
    onClickRemove?: React.MouseEventHandler<HTMLButtonElement>
}

export const Card: FC<CardProps> = ({
    title,
    description,
    isCollapsed,
    onToggleCollapse,
    onClickRemove,
}) => {
    const [parent] = useAutoAnimate({ duration: 250, easing: 'ease-out' })

    return (
        <div className="border border-black px-2 py-1.5" ref={parent}>
            <div className="flex justify-between mb-0.5">
                <h1 className="font-medium">{title}</h1>
                <div className="flex">
                    {onToggleCollapse && (
                        <ToggleButton
                            iconOn={<ChevronUpIcon />}
                            iconOff={<ChevronDownIcon />}
                            onToggle={onToggleCollapse}
                            toggleState={isCollapsed}
                        />
                    )}
                    {onClickRemove && (
                        <Button onClick={onClickRemove}>
                            <XMarkIcon />
                        </Button>
                    )}
                </div>
            </div>
            {isCollapsed && description ? (
                <p className="text-sm">{description}</p>
            ) : (
                <></>
            )}
        </div>
    )
}
