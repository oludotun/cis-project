"use client";
import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import ContactorSvg from "./svg/Contactor";

function Contactor({ data }) {
    return (
        <div className="">
            <ContactorSvg className="text-lg h-20" reference={data.ref} />

            <Handle
                id="L1"
                type="source"
                position={Position.Top}
                style={{ left: "15%", width: "1rem" }}
            />
            <Handle
                id="L2"
                type="source"
                position={Position.Top}
                style={{ left: "38%", width: "1rem" }}
            />
            <Handle
                id="L3"
                type="source"
                position={Position.Top}
                style={{ left: "62%", width: "1rem" }}
            />
            <Handle
                id="A1"
                type="source"
                position={Position.Top}
                style={{ left: "85%", width: "1rem" }}
            />

            <Handle
                id="T1"
                type="source"
                position={Position.Bottom}
                style={{ left: "15%", width: "1rem" }}
            />
            <Handle
                id="T2"
                type="source"
                position={Position.Bottom}
                style={{ left: "38%", width: "1rem" }}
            />
            <Handle
                id="T3"
                type="source"
                position={Position.Bottom}
                style={{ left: "62%", width: "1rem" }}
            />
            <Handle
                id="A2"
                type="source"
                position={Position.Bottom}
                style={{ left: "85%", width: "1rem" }}
            />
        </div>
    );
}

export default memo(Contactor);
