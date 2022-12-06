"use client"

import React, { FC, useCallback, useEffect, useState } from "react"
import { FormArea } from "../component/ui/FormArea"
import { FormEntry } from "../component/ui/FormEntry"
import { TextInput } from "../component/ui/TextInput"
import { deserializeGraphEdgeListPrimitive, deserializeGraphNodeListPrimitive, GraphEdgeListPrimitive, GraphNodeListPrimitive, layoutForce } from "./force"
import { SVGGraphResult } from "./renderGraph"
import { BinaryTreePrimitive, deseralizeBinaryTreePrimitive, layoutBinaryTree } from "./trees"

type Props = {
    
}

type Mode = 'graph'|'tree'

export const GraphDrawingDemo: FC<Props> = ({ }) => {
    const [ mode, setMode ] = useState<Mode>('graph')

    const [ tree, setTree, treeLayout, treePrimitive ] = useBinaryTree([1, 2, 3])
    const {
        edgeList: [ edgeList, setEdgeList ],
        nodeList: [ nodeList, setNodeList ],
        getLayout: graphLayout,
    } = useGraph([1, 2, 3], [[1, 2], [2, 3], [1, 3]])

    const { display, form } = ({
        graph: {
            display: (
                <SVGGraphResult 
                    graph={graphLayout()}
                />
            ),
            form: (<>
                <FormEntry id="nodes" text="Nodes">
                    <TextInput 
                        value={nodeList}
                        setValue={setNodeList}
                    />
                </FormEntry>
                <FormEntry id="edges" text="Edges">
                    <TextInput 
                        value={edgeList}
                        setValue={setEdgeList}
                    />
                </FormEntry>
            </>)
        },
        tree: {
            display: (
                <SVGGraphResult 
                    graph={treeLayout()}
                    text={treePrimitive.map(x => x ? x.toString() : "") as Record<number, string>}
                />
            ),
            form: (
                <FormEntry id="tree" text="Tree">
                    <TextInput 
                        value={tree}
                        setValue={setTree}
                    />
                </FormEntry>
            )
        }
    })[mode]

    return (
        <div className="mx-auto">
            <div
                className="fill-fg stroke-fg [&>svg]:mx-auto"
            >
                {display}
            </div>

            <FormArea>
                {form}
            </FormArea>
        </div>
    )
}

function useGraph(defaultNodes: GraphNodeListPrimitive, defaultEdges: GraphEdgeListPrimitive) {
    const [ edgeListSerialized, setEdgeListSerialized, edgeList ] = useSerialized(
        defaultEdges,
        JSON.stringify,
        deserializeGraphEdgeListPrimitive
    )

    const [ nodeListSerialized, setNodeListSerialized, nodeList ] = useSerialized(
        defaultNodes,
        JSON.stringify,
        deserializeGraphNodeListPrimitive
    )

    const getLayout = useCallback(() => layoutForce(nodeList, edgeList), [nodeList, edgeList])

    return {
        edgeList: [ edgeListSerialized, setEdgeListSerialized ],
        nodeList: [ nodeListSerialized, setNodeListSerialized ],
        getLayout,
    } as const
}

function useBinaryTree(defaultValue: BinaryTreePrimitive) {
    const [ serialized, setSerialized, binary ] = useSerialized(
        defaultValue,
        JSON.stringify,
        deseralizeBinaryTreePrimitive
    )

    const getLayout = useCallback(() => layoutBinaryTree(binary), [binary])

    return [ serialized, setSerialized, getLayout, binary ] as const
}

function useSerialized<T, S>(
    defaultValue: T,
    serialize: (val: T) => S,
    deserialize: (val: S) => T|null
) {
    const [ serialized, setSerialized ] = useState<S>(serialize(defaultValue))
    const [ value, setValue ] = useState<T>(defaultValue)

    useEffect(() => {
        const res = deserialize(serialized)
        if(res === null) return

        setValue(res)
    }, [serialized, deserialize])

    return [ serialized, setSerialized, value ] as const
}