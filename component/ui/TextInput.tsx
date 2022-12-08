import React, { FC } from "react"
import cl from "classnames"

type Props = {
    value?: string,
    setValue?: (val: string) => void,
    name?: string,
    ariaLabel?: string,
    id?: string,
    className?: string,
    code?: boolean,
}

export const TextInput: FC<Props> = ({ 
    value = "",
    setValue,
    name, ariaLabel, id,
    className,
    code,
}) => {
    return (<>
        <input 
            className={cl("border-2 text-sm bg-bg border-fg text-fg placeholder:text-fg/70 px-1", className, { "font-mono": code })}

            type="text"
            name={name}
            id={id}
            aria-label={ariaLabel}

            value={value}
            onChange={(e) => setValue?.(e.target.value ? e.target.value.toString() : "")}
        />
    </>)
}