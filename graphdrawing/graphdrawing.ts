import { GraphBuilder, Declarations } from "graphdrawing-ts"

export interface GraphSizing {
    nodeSize: number,
    siblingSep: number,
    levelDistance: number,
}

export const defaultGraphSizing: GraphSizing = {
    nodeSize: 18,
    siblingSep: 15,
    levelDistance: 52.5
}

// export const DefaultGraphSizing = {
//   'node size': NODE_SIZE,
//   'level distance': 52.5,
//   'sibling distance': SIB_SEP,
//   'sibling pre sep': SIB_SEP/2,
//   'sibling post sep': SIB_SEP/2,
// }