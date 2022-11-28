import cl from "classnames"
import React, { FC, PropsWithChildren } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

type Props<Opts extends string> = {
    ariaLabel: string
    placeholder?: string
    options: { value: Opts, text: string, className?: string, style?: React.CSSProperties }[]
    value?: Opts
    setValue?: (value: Opts) => void
}

const SelectItem = <Opts extends string>({ value, children, className, style, selected }: PropsWithChildren<{ value: Opts, className?: string, style?: React.CSSProperties, selected?: boolean }>) => {
    return (
        <RadixSelect.Item 
            className={cl("leading-normal data-[highlighted]:bg-fg data-[highlighted]:text-bg outline-none relative select-none", className)}
            value={value}
            style={style}
        >
            <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
            {/* <RadixSelect.ItemIndicator className="absolute -left-4 w-[25px] inline-flex align-center justify-center">
                <CheckIcon />
            </RadixSelect.ItemIndicator> */}
        </RadixSelect.Item>
    )
}

export const Select = <Opts extends string>({ ariaLabel, placeholder, value, setValue, options }: Props<Opts>) => {
    return (
        <RadixSelect.Root
            value={value}
            onValueChange={(v) => setValue?.(v as Opts)}
        >
            <RadixSelect.Trigger
                aria-label={ariaLabel}
                className="inline-flex items-center justify-center px-2 py-0 leading-normal gap-2 bg-bg border-2 border-fg text-sm cursor-pointer"
                style={options.find(({value: selected}) => selected === value)?.style}
            >
                <RadixSelect.Value placeholder={placeholder} />
                <RadixSelect.Icon className="opacity-70">
                    <ChevronDownIcon />
                </RadixSelect.Icon>
            </RadixSelect.Trigger>

            <RadixSelect.Portal>
                <RadixSelect.Content className="overflow-hidden bg-bg border-2 border-fg text-sm shadow-fg shadow-sm px-2">
                    <RadixSelect.Viewport className="padding-2">
                        {options.map(({ value: option, text, className, style }) => (
                            <SelectItem 
                                key={option}
                                value={option}
                                className={className}
                                style={style}
                                selected={value === option}
                            >
                                {text}
                            </SelectItem>
                        ))}
                    </RadixSelect.Viewport>
                </RadixSelect.Content>
            </RadixSelect.Portal>
        </RadixSelect.Root>
    )
}