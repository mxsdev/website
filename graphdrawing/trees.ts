import { parseSafe } from './util';
import { GraphSizing, defaultGraphSizing } from './graphdrawing';
import { GraphBuilder, Path, RenderGraphResult, TreeDeclarations } from 'graphdrawing-ts';

export type BinaryTreePrimitive = (string|number|null)[]

export function layoutBinaryTree(
    primitive: BinaryTreePrimitive,
    direction: '--'|'->'|'<-'|'<->' = '->',
    sizing: GraphSizing = defaultGraphSizing
): RenderGraphResult {
    const builder = new GraphBuilder(TreeDeclarations)

    builder.pushOption('extended binary tree layout')
        .pushOption(`grow'`, 'up')
        .pushOption("level distance", sizing.levelDistance)
        .pushOption("sibling distance", sizing.siblingSep)
        .pushOption("sibling pre sep", sizing.siblingSep/1)
        .pushOption("sibling post sep", sizing.siblingSep/1)
            
    const { nodeSize } = sizing

    builder.beginGraphDrawingScope()
            .pushLayout()

    const vertexId = (index: number) => index.toString()

    if(primitive.length > 0) {
        type IndexDiscriminator = [index: number, parent?: number,  left?: boolean]
        const stack: ( (IndexDiscriminator)|'descendants' )[] = [[ 0 ]]

        while(stack.length > 0) {
        const discriminator = stack.pop()!

        if(discriminator === 'descendants') {
            builder.createEvent('end', 'descendants')
        } else {
            const [ index, parentIndex, isLeft ] = discriminator

            if(isLeft != null) {
                // builder.pushVertexOption('desired child index', isLeft ? 1 : 2)
                builder.pushVertexOption(isLeft ? 'first' : 'second')
            } else {
                builder.pushVertexOption('root')
            }

            const vertexPath = Path.squarePath(nodeSize*2)

            builder.createVertex(vertexId(index), undefined, vertexPath)

            if(parentIndex != null) {
                builder.createEdge(vertexId(parentIndex), vertexId(index), direction)
            }

            const l = 2*index + 1
            const r = l + 1

            if(primitive[l] != null || primitive[r] != null) {
            stack.push('descendants')

            if(primitive[l] != null) {
                stack.push([l, index, true]) 
            } 

            if(primitive[r] != null) {
                stack.push([r, index, false]) 
            }

            builder.createEvent('begin', 'descendants')
            }
        }
        }
    }

    builder.runGraphDrawingAlgorithm()

    return builder.renderGraph()
}

export function deseralizeBinaryTreePrimitive(serialized: string): BinaryTreePrimitive|null {
    const obj = parseSafe(serialized)

    if(
        obj &&
        typeof obj === "object" &&
        Array.isArray(obj) &&
        obj.every(x => 
            x === null || typeof x === "string" || typeof x === "number"
        )
    ) {
        return obj as BinaryTreePrimitive
    }

    return null
}