import { BezierDrawConfig, CubicBezier } from './types';
import { RefObject, useEffect, useRef } from "react";
import { BezierContext } from './draw';

export const useBezier = (ref: RefObject<HTMLCanvasElement>, options: BezierDrawConfig, initial: CubicBezier) => {
    const bezier = useRef<BezierContext>()

    useEffect(() => {
        if(!ref.current) return

        const canvas = ref.current
        const ctx = canvas.getContext("2d")

        if(!ctx) return

        if(!bezier.current) {
            bezier.current = new BezierContext(
                canvas,
                ctx,
                initial,
                options
            )
        } else {
            bezier.current.updateConfig(options)
        }
    }, [options, initial, ref])
}