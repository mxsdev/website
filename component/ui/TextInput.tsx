import React, { FC } from "react"
import cl from "classnames"

type Props = {
    value?: string,
    setValue?: (val: string) => void,
    name?: string,
    ariaLabel?: string,
    id?: string,
    className?: string,
}

export const TextInput: FC<Props> = ({ 
    value = "",
    setValue,
    name, ariaLabel, id,
    className
}) => {
    return (<>
        <input 
            className={cl("border-2 text-sm bg-bg border-fg text-fg placeholder:text-fg/70 p-1", className)}

            type="text"
            name={name}
            id={id}
            aria-label={ariaLabel}

            value={value}
            onChange={(e) => setValue?.(e.target.value ? e.target.value.toString() : "")}
        />
    </>)
}