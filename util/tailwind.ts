import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../tailwind.config"

export type TailwindConfig = {
    screens: {
        sm: number
        md: number
        lg: number
        xl: number
        "2xl": number
    }
}

export function getTailwindConfig(): TailwindConfig {
    const config = resolveConfig(tailwindConfig)

    const screens = config.theme!.screens! as Record<keyof TailwindConfig['screens'], string>

    const res: TailwindConfig = {
        screens: {
            sm: parseInt(screens['sm']),
            md: parseInt(screens['md']),
            lg: parseInt(screens['lg']),
            xl: parseInt(screens['xl']),
            "2xl": parseInt(screens['2xl']),
        }
    }

    return res
}