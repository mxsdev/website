import { GraphBuilder, Declarations } from "graphdrawing-ts"

export interface GraphSizing {
    nodeSize: number,
    siblingSep: number,
    levelDistance: number,
}

export const defaultGraphSizing: GraphSizing = scaleSizing({
    nodeSize: 18,
    siblingSep: 15,
    levelDistance: 52.5
}, 1.25)

function scaleSizing(sizing: GraphSizing, sf: number): GraphSizing {
    const res = { ...sizing }

    for(const key of Object.keys(res)) {
        res[key as keyof GraphSizing] *= sf
    }

    return res
}