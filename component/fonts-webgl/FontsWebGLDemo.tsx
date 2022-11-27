"use client"

import React, { FC, PropsWithChildren, useState } from "react"
import { loadFont, ParsedFont, parseFont } from "../../util/font"
import { FontsWebGLCanvas } from "./FontsWebGLCanvas"

export type FontOption = "times"|"arial"
export type FontData<Data = ParsedFont> = Record<FontOption, { data: Data }>

interface OwnProps {
    fonts: FontData|undefined,
}

type Props = OwnProps

export const FontsWebGLDemo = ({ fonts }: Props) => {
    const [ content, setContent ] = useState<string>("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien et ligula ullamcorper malesuada proin libero. Justo donec enim diam vulputate. Nam aliquam sem et tortor. Nec feugiat in fermentum posuere urna. Arcu ac tortor dignissim convallis aenean et tortor at risus. Arcu bibendum at varius vel pharetra vel turpis nunc. Viverra orci sagittis eu volutpat odio. Feugiat in fermentum posuere urna nec tincidunt praesent. Tincidunt augue interdum velit euismod in pellentesque. Imperdiet nulla malesuada pellentesque elit eget. Senectus et netus et malesuada fames ac turpis. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Eget mi proin sed libero enim sed faucibus turpis. Scelerisque eleifend donec pretium vulputate. Quis ipsum suspendisse ultrices gravida dictum fusce.")
    const [ font, setFont ] = useState<FontOption>("arial")

    const fontData = fonts?.[font].data

    if(!fontData) {
        return <>loading...</>
    }

    return (
        <>
            <FontsWebGLCanvas
                content={content}
                font={fontData}
            />

            <input type="text" name="test" value={content} onChange={e => setContent(e.target.value)} />

            <select
                onChange={(e) => {
                    const value = e.target.value as FontOption
                    setFont(value)
                }}
            >
                {(["arial", "times"] as FontOption[]).map(o => (
                    <option value={o} key={o}>
                        {`${fonts[o].data.name.fontFamily}`}
                    </option>
                ))}
                {/* <option value="arial"></option>
                <option value="times"></option> */}
            </select>
        </>
    )
}