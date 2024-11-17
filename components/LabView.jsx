"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    Controls,
    applyEdgeChanges,
    applyNodeChanges,
} from "@xyflow/react";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";

const defaultEdgeOptions = { type: "smoothstep" /**animated: true*/ };

export default function LabView({
    nodeTypesObject,
    initNodes,
    initEdges = [],
    labId,
}) {
    const [nodes, setNodes] = useState(initNodes);
    const [edges, setEdges] = useState(initEdges);
    const [labUpdated, setLabUpdated] = useState(false);

    const onNodesChange = useCallback(
        (changes) => {
            // Only allow position change
            // const positionChanges = changes.filter(
            //     (change) => change.type === "position"
            // );
            setNodes((nds) => applyNodeChanges(changes, nds));
            setLabUpdated(true);
        },
        [setNodes]
    );

    // Function to prevent only nodes from being deleted
    const onBeforeDelete = useCallback(({ nodes, edges }) => {
        // console.log(nodes.length, edges.length);

        if (nodes.length) {
            return false; // Prevent deletion of nodes by returning false
        }
        // Allow deletion if only edges are selected
        return true;
    }, []);

    const onEdgesChange = useCallback(
        (changes) => {
            setEdges((eds) => applyEdgeChanges(changes, eds));
            setLabUpdated(true);
        },
        [setEdges]
    );
    const onConnect = useCallback((connection) => {
        setEdges((eds) => addEdge(connection, eds));
        setLabUpdated(true);
    }, []);

    const nodeTypes = useMemo(() => nodeTypesObject, [nodeTypesObject]);

    // Debounced updateLab function
    const debouncedUpdateLab = useRef(
        debounce(async (labId, nodes, edges) => {
            const token = Cookies.get("token");
            const body = { score: 88, saved_state: nodes, submission: edges };
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            };

            try {
                const response = await fetch(
                    `http://localhost:8080/api/students/labs/${labId}`,
                    requestOptions
                );
                const data = await response.json();
                console.log("Lab updated successfully:", data);
            } catch (error) {
                console.error("Error updating lab:", error);
            }
        }, 2000) // 2-second debounce
    ).current;

    // Send updates when labUpdated is true
    useEffect(() => {
        if (labUpdated) {
            debouncedUpdateLab(labId, nodes, edges);
            setLabUpdated(false); // Reset the flag after sending data
        }
    }, [labUpdated, labId, nodes, edges, debouncedUpdateLab]);

    return (
        <div className="m-20">
            <div className="w-full h-[600px]">
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onBeforeDelete={onBeforeDelete}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        defaultEdgeOptions={defaultEdgeOptions}
                        deleteKeyCode={["Delete", "Backspace"]}
                        // Handle type has to be "source" because ConnectionMode is "loose"
                        connectionMode={"loose"}
                        fitView
                        className="bg-teal-50 border-2 border-stone-400"
                    >
                        {/* <MiniMap /> */}
                        <Controls />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        </div>
    );
}
