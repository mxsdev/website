import cl from "classnames"
import * as RadixSlider from "@radix-ui/react-slider"
import { FC } from "react"

interface Props {
    value?: number,
    defaultValue?: number,
    onChange?: (val: number) => void
    id?: string
    className?: string
    max: number
    min: number
    step?: number
    ariaLabel: string,
}

export const Slider: FC<Props> = ({ value, onChange, defaultValue, id, className, max, min, step = 0.1, ariaLabel }) => (
    <RadixSlider.Root
        className={cl("relative flex items-center select-none touch-none h-[20px]", className)}
        value={value ? [value] : undefined}
        onValueChange={([v]) => onChange?.(v)}
        defaultValue={defaultValue ? [defaultValue] : undefined}
        max={max}
        min={min}
        step={step}
        aria-label={ariaLabel}
        id={id}
    >
        <RadixSlider.Track
            className="bg-fg/50 relative flex-grow h-[3px]"
        >
            <RadixSlider.Range
                className="bg-fg absolute h-full" />
        </RadixSlider.Track>

        <RadixSlider.Thumb
            className="block h-4 w-4 rounded-full bg-fg hover:cursor-pointer" />
    </RadixSlider.Root>
)
