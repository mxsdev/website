import React, { FC } from "react"
import cl from "classnames"

type Props = {
    text: string,
    onClick?: () => void,
    className?: string,
    ariaLabel?: string,
    active?: boolean
}

export const SimpleButton: FC<Props> = ({ text, onClick, className, ariaLabel, active }) => {
    return (
        <button
            className={
                cl(
                    "border-2 border-fg bg-bg shadow-fg/40 hover:shadow-md hover:bg-fg hover:text-bg leading-[1.1] text-sm px-1",
                    { ["bg-fg text-bg"]: active },
                    className
                )
            }
            aria-label={ariaLabel}
            onClick={onClick}
        >
            {text}
        </button>
    )
}