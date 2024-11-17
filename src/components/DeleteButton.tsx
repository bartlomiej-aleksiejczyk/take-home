import { FC } from 'react'
import { XMarkIcon } from './icons/XMarkIcon'

type ButtonProps = React.ComponentProps<'button'>

export const DeleteButton: FC<Omit<ButtonProps, 'children'>> = (props) => {
    return (
        <button
            className="hover:text-gray-700 transition-colors flex items-center justify-center"
            {...props}
        >
            <XMarkIcon />
        </button>
    )
}
