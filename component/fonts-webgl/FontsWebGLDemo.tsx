"use client"

import React, { FC, PropsWithChildren, useState } from "react"
import { loadFont, ParsedFont, parseFont } from "../../util/font"
import { Form } from "../ui/Form"
import { FormEntry } from "../ui/FormEntry"
import { Select } from "../ui/Select"
import { Slider } from "../ui/Slider"
import { TextArea } from "../ui/TextArea"
import { FontsWebGLCanvas } from "./FontsWebGLCanvas"

export type FontOption = "times"|"arial"
export type FontData<Data = ParsedFont> = Record<FontOption, { data: Data }>

interface OwnProps {
    fonts: FontData|undefined,
}

type Props = OwnProps

export const FontsWebGLDemo = ({ fonts }: Props) => {
    const [ content, setContent ] = useState<string>("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien et ligula ullamcorper malesuada proin libero. Justo donec enim diam vulputate. Nam aliquam sem et tortor. Nec feugiat in fermentum posuere urna. Arcu ac tortor dignissim convallis aenean et tortor at risus. Arcu bibendum at varius vel pharetra vel turpis nunc. Viverra orci sagittis eu volutpat odio. Feugiat in fermentum posuere urna nec tincidunt praesent. Tincidunt augue interdum velit euismod in pellentesque. Imperdiet nulla malesuada pellentesque elit eget. Senectus et netus et malesuada fames ac turpis. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Eget mi proin sed libero enim sed faucibus turpis. Scelerisque eleifend donec pretium vulputate. Quis ipsum suspendisse ultrices gravida dictum fusce.")
    const [ font, setFont ] = useState<FontOption>("times")
    const [ fontSize, setFontSize ] = useState<number>(126)

    const fontData = fonts?.[font].data

    if(!fontData) {
        return <>loading...</>
    }

    return (
        <div className="mx-auto">
            <FontsWebGLCanvas
                content={content}
                font={fontData}
                fontSize={fontSize}
            />

            <Form>
                <FormEntry id="content" text="Text">
                    <TextArea 
                        content={content}
                        setContent={setContent}
                        className="flex-grow"
                        rows={4}
                    />
                    {/* <input type="text" name="test" value={content} onChange={e => setContent(e.target.value)} /> */}
                </FormEntry>

                <FormEntry id="font-size" text="Font Size">
                    <Slider 
                        min={10}
                        max={200}
                        ariaLabel="Font Size"
                        className="flex-grow"
                        value={fontSize}
                        onChange={setFontSize}
                    />
                </FormEntry>

                <FormEntry text="Font" id="select-font">
                    <Select<FontOption>
                        ariaLabel="Select Font"
                        options={[
                            {
                                value: "arial",
                                text: "Arial",
                                style: { fontFamily: `"Arial", sans-serif`},
                            },
                            {
                                value: "times",
                                text: "Times New Roman",
                                style: { fontFamily: `"Times New Roman", serif`},
                            }
                        ]}
                        value={font}
                        setValue={setFont}
                    />
                </FormEntry>
            </Form>


            {/* <select
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
            </select> */}
        </div>
    )
}