"use client";
import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import PowerSourceSvg from "./svg/PowerSource";

function PowerSource({ data }) {
    const td = { value: "24k", type: "DC" };
    return (
        <div className="">
            <PowerSourceSvg className="text-lg h-16" data={data} />

            <Handle
                id="L"
                type="source" // Type cannot be "target" because ConnectionMode is "loose"
                position={Position.Left}
                style={{ top: "80%", height: "1rem" }}
                // position={Position.Bottom}
                // style={{ left: "19%", width: "1rem" }}
            />
            <Handle
                id="N"
                type="source"
                position={Position.Right}
                style={{ top: "80%", height: "1rem" }}
                // position={Position.Bottom}
                // style={{ left: "80%", width: "1rem" }}
                // className="h-8 !bg-teal-500"
            />
        </div>
    );
}

export default memo(PowerSource);
