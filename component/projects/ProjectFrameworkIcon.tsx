"use client"

import React, { ComponentProps, FC, useState } from "react"
import type { IconType } from "react-icons"
import { SiReact, SiTerraform, SiNextdotjs, SiTypescript, SiVisualstudiocode, SiElectron, SiLua, SiNeovim } from "react-icons/si"

const Icons = {
    react: {
        icon: SiReact,
        color: "#61DBFB",
    },
    nextjs: {
        icon: SiNextdotjs,
        color: "#FFFFFF",
    },
    terraform: {
        icon: SiTerraform,
        color: "#7640B6",
    },
    typescript: {
        icon: SiTypescript,
        color: "#2F74C0",
    },
    vscode: {
        icon: SiVisualstudiocode,
        color: "#2A9EEA",
    },
    electron: {
        icon: SiElectron,
        color: "#9CE6F3",
    },
    lua: {
        icon: SiLua,
        color: "#00007C",
    },
    neovim: {
        icon: SiNeovim,
        color: "#83BC66",
    }
} satisfies Record<string, { icon: IconType, color: string }>

export type Framework = keyof typeof Icons

type Props = {
    framework: Framework
} & ComponentProps<IconType>

export const ProjectFrameworkIcon: FC<Props> = ({ framework, ...props }) => {
    const Icon = Icons[framework].icon
    const color = Icons[framework].color

    const [hovered, setHovered] = useState(false)
    
    return (
        <Icon 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}

            className="transition-colors duration-150"

            style={{ ...hovered && { color } }}
            
            {...props}
        />
    )
}