import React, { useState, FC } from 'react'

type ButtonProps = React.ComponentProps<'button'>

interface ToggleButtonProps extends ButtonProps {
    iconOn: React.ReactNode
    iconOff: React.ReactNode
    onToggle?: (isToggled: boolean) => void
    toggleState?: boolean
}

export const ToggleButton: FC<ToggleButtonProps> = ({
    iconOn,
    iconOff,
    onToggle,
    toggleState,
    ...buttonProps
}) => {
    const [isToggled, setIsToggled] = useState(toggleState || false)

    const handleClick = () => {
        setIsToggled(!isToggled)
        if (onToggle) {
            onToggle(!isToggled)
        }
    }

    return (
        <button {...buttonProps} onClick={handleClick}>
            {isToggled ? iconOn : iconOff}
        </button>
    )
}
