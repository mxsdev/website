import { FC } from "react"
import * as RadixCheckbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

interface Props {
    value?: RadixCheckbox.CheckedState
    onChange?: (state: RadixCheckbox.CheckedState) => void
    id?: string
}

export const Checkbox: FC<Props> = ({ value, onChange, id }) => (
        <RadixCheckbox.Root 
            className="w-4 h-4 border-fg border-[1px] flex items-center justify-center data-[state=checked]:bg-fg" 
            id={id}
            checked={value}
            onCheckedChange={onChange}
        >
            <RadixCheckbox.Indicator className="CheckboxIndicator">
                <CheckIcon className="text-bg" />
            </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
)