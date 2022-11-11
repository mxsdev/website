"use client"

import { useEffect, useState } from "react";

export function useScrollBreakpoint(after: number) {
    const [ triggered, setTriggered ] = useState<boolean>(false)

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY >= after) {
                setTriggered(true)
            } else {
                setTriggered(false)
            }
        }

        window.addEventListener("scroll", scrollListener)

        return () => window.removeEventListener("scroll", scrollListener)
    }, [after])

    return triggered
}