"use client"

import { BezierCanvas } from "./BezierCanvas";
import { Slider } from "../ui/Slider"
import { FunctionComponent, useState } from "react";
import { FormEntry } from "../ui/FormEntry";
import { Checkbox } from "../ui/Checkbox";
import { FormArea } from "../ui/FormArea";

const size = 480

export const BezierDemo: FunctionComponent = () => {
    const [ strokeWidth, setStrokeWidth ] = useState<number>(6)
    const [ enableBezierPoints, setEnableBezierPoints ] = useState<boolean>(true)
    
    return (
        <>
        <div style={{ maxWidth: size }} className="mx-auto">
            <BezierCanvas
                options={{
                    enableStroke: !enableBezierPoints,
                    enableBezierPoints,
                    strokeWidth,
                }}
                width={size} height={size}
                className="border-2 border-fg mx-auto block" 
            />
        </div>

            <FormArea>
                <FormEntry text="Stroke Width" id="slider-sw">
                    <Slider 
                        className="flex-grow"
                        value={strokeWidth}
                        onChange={setStrokeWidth}
                        max={30}
                        min={0.1}
                        ariaLabel="Stroke Width"
                        id="slider-sw"
                    />
                </FormEntry>

                <FormEntry text="Sample Points" id="toggle-points">
                    <Checkbox 
                        value={enableBezierPoints}
                        onChange={(value) => setEnableBezierPoints(!!value)}
                        id="toggle-points"
                    />
                </FormEntry>
            </FormArea>
        </>
    );
}