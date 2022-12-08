"use client"

import React, { FC, useCallback, useEffect, useState } from "react"
import { FormArea } from "../component/ui/FormArea"
import { FormEntry } from "../component/ui/FormEntry"
import { Select } from "../component/ui/Select"
import { SimpleButton } from "../component/ui/SimpleButton"
import { TextInput } from "../component/ui/TextInput"
import { deserializeGraphEdgeListPrimitive, deserializeGraphNodeListPrimitive, GraphEdgeListPrimitive, GraphNodeListPrimitive, layoutForce } from "./force"
import { SVGGraphResult } from "./renderGraph"
import { BinaryTreePrimitive, deseralizeBinaryTreePrimitive, layoutBinaryTree } from "./trees"

type Props = {
    
}

type Mode = 'graph'|'tree'

const GraphExamples: [GraphNodeListPrimitive, GraphEdgeListPrimitive][] = [
    [[1,2,3,4,5], [[1,2],[2,3],[1,3],[5,4],[4,3]]],
    [[1,2,3], [[1,2],[2,3],[1,3]]],
]

const TreeExamples: BinaryTreePrimitive[] = [
    [1,2,3,4,null,3,"x"]
]

export const GraphDrawingDemo: FC<Props> = ({ }) => {
    const [ mode, setMode ] = useState<Mode>('graph')

    const [ tree, setTree, treeLayout, treePrimitive ] = useBinaryTree(TreeExamples[0])
    const {
        edgeList: [ edgeList, setEdgeList, edgeListDeserialized ],
        nodeList: [ nodeList, setNodeList, nodeListDeserialized ],
        getLayout: graphLayout,
    } = useGraph(...GraphExamples[0])

    const { display, form, examples } = ({
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
                        code
                    />
                </FormEntry>
                <FormEntry id="edges" text="Edges">
                    <TextInput 
                        value={edgeList}
                        setValue={setEdgeList}
                        code
                    />
                </FormEntry>
            </>),
            examples: GraphExamples.map(([nodes, edges]) => ({
                callback: () => {
                    setNodeList(JSON.stringify(nodes))
                    setEdgeList(JSON.stringify(edges))
                },
                active: (JSON.stringify(nodes) === JSON.stringify(nodeListDeserialized)) && 
                    (JSON.stringify(edges) === JSON.stringify(edgeListDeserialized))
            })),
        },
        tree: {
            display: (
                <SVGGraphResult 
                    graph={treeLayout()}
                    text={treePrimitive.map(x => x ? x.toString() : "") as Record<number, string>}
                />
            ),
            form: (
                <FormEntry id="tree" text="Tree (Level-Order)">
                    <TextInput 
                        value={tree}
                        setValue={setTree}
                        code
                    />
                </FormEntry>
            ),
            examples: TreeExamples.map((exampleTree) => ({
                callback: () => {
                    setTree(JSON.stringify(exampleTree))
                },
                active: JSON.stringify(exampleTree) === JSON.stringify(treePrimitive)
            }))
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
                <FormEntry id="mode" text="Algorithm">
                    <Select<Mode>
                        ariaLabel="algorithm"
                        options={[
                            {
                                value: 'graph',
                                text: "Graph (Force)"
                            },
                            {
                                value: 'tree',
                                text: "Tree"
                            }
                        ]}

                        value={mode}
                        setValue={setMode}
                    />
                </FormEntry>
                {form}
                <FormEntry id="example" text="Example">
                    <div className="flex gap-2">
                        { 
                            examples.map(({ callback, active }, index) =>
                                <SimpleButton 
                                    key={`example-${index}`}
                                    onClick={callback}
                                    active={active}
                                    text={index.toString()}
                                />
                            )
                        }
                    </div>
                </FormEntry>
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
        edgeList: [ edgeListSerialized, setEdgeListSerialized, edgeList ],
        nodeList: [ nodeListSerialized, setNodeListSerialized, nodeList ],
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