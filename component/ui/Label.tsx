import * as RadixLabel from '@radix-ui/react-label'
import { FC } from 'react'
import cl from "classnames"

interface Props {
    text: string
    htmlFor: string
    className?: string
}

export const Label: FC<Props> = ({ text, htmlFor, className }) => (
    <RadixLabel.Root
        className={cl("text-sm font-bold select-none", className)}
        htmlFor={htmlFor}
    >
        {text}
    </RadixLabel.Root>
)
