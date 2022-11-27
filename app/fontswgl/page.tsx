"use client"

import { NextPage } from "next"
import { FontData, FontsWebGLDemo } from "../../component/fonts-webgl/FontsWebGLDemo"
import { loadFont, parseFont } from "../../util/font"
import { readFile } from "fs/promises"
import path from "path"
import process from "process"
import { use, useEffect, useRef, useState } from "react"

async function getFontBuffer(fileName: string, signal?: AbortSignal) {
    // const fontBuff = await readFile(path.resolve(process.cwd(), `public/font/${fileName}`))
    // return fontBuff.toString("utf-8")

    const fontBuff = await fetch(`/font/${fileName}`, { signal }).then(x => x.arrayBuffer())
    return parseFont(fontBuff)
}

async function getFontData(signal?: AbortSignal): Promise<FontData> {
    const retrieve = async (name: string) => getFontBuffer(name, signal)

    return {
        "arial": {
            data: await retrieve("arial.ttf")
        },
        "times": {
            data: await retrieve("times-new-roman.ttf")
        }
    }
}

export default function Page() {
    const initialized = useRef<boolean>(false)
    
    const [ fonts, setFonts ] = useState<FontData|undefined>()
    
    useEffect(() => {
        if(initialized.current) return
        initialized.current = true

        const controller = new AbortController()

        getFontData(controller.signal)
            .then(data => {
                console.log(data)
                return setFonts(data)
            })
        
        // return () => controller.abort()
    }, [])

    return <FontsWebGLDemo fonts={fonts} />
}