import React, { FC, PropsWithChildren } from "react"
import { FontsWebGLCanvas } from "./FontsWebGLCanvas"

interface OwnProps {
    
}

type Props = OwnProps

export const FontsWebGLDemo: FC<Props> = ({ }) => {
    return (
    <>
        <FontsWebGLCanvas />
    </>
    )
}