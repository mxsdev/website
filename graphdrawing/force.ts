import { GraphBuilder, ForceDeclarations, Path } from "graphdrawing-ts"
import { GraphSizing, defaultGraphSizing } from "./graphdrawing"
import { parseSafe } from "./util"

type GraphId = string|number

export type GraphNodeListPrimitive = GraphId[]
export type GraphEdgeListPrimitive = [GraphId, GraphId][]

export function layoutForce(
    nodeList: GraphNodeListPrimitive,
    edgeList: GraphEdgeListPrimitive,
    direction: '--'|'->'|'<-'|'<->' = '->',
    sizing: GraphSizing = defaultGraphSizing
) {
    const builder = new GraphBuilder(ForceDeclarations)

    builder.pushOption('spring Hu 2006 layout')
  
    const { nodeSize, levelDistance, siblingSep } = sizing
  
    const vertexPath = () => Path.squarePath(nodeSize)
  
    builder
        .pushOption('node distance', nodeSize*3.5)
        .pushOption('level distance', levelDistance)
        .pushOption('sibling sep', siblingSep)
  
    builder.beginGraphDrawingScope().pushLayout()

    const idSet = new Set(nodeList.map(node => node.toString()))

    for(const id of idSet) {
        builder.createVertex(id, undefined, vertexPath())
    }

    for(const [from, to] of edgeList.map(([x, y]) => [x.toString(), y.toString()])) {
        if(!idSet.has(from) || !idSet.has(to)) continue
        builder.createEdge(from, to, direction)
    }

    return builder.runGraphDrawingAlgorithm().renderGraph()
}

export function deserializeGraphNodeListPrimitive(
    serialized: string
): GraphNodeListPrimitive|null {
    const obj = parseSafe(serialized)

    if(
        Array.isArray(obj) &&
        obj.every(x => typeof x === "number" || typeof x === "string")
    ) {
        return obj as GraphNodeListPrimitive
    }

    return null
}

export function deserializeGraphEdgeListPrimitive(
    serialized: string
): GraphEdgeListPrimitive|null {
    const obj = parseSafe(serialized)

    if(
        Array.isArray(obj) &&
        obj.every(x => 
            Array.isArray(x) &&
            x.length >= 2 &&
            x.every(y => 
                typeof y === "number" || typeof y === "string"
            )
        )
    ) {
        return obj as GraphEdgeListPrimitive
    }

    return null
}