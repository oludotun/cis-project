"use client";
import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import PushButtonSvg from "./svg/PushButton";

function PowerSource({ data }) {
    // Data Example:
    // {"id": "pushbutton1", "type": "PushButton", "data": {"defaultState": "N/O", "ref": "SW1"}, "position": {"x": -200, "y": 50}}
    const deviceData = {
        defaultState: data.defaultState ? data.defaultState : "N/O",
        ref: data.ref ? data.ref : "SW1",
    };

    return (
        <div className="">
            <PushButtonSvg className="text-lg h-16" data={deviceData} />

            <Handle
                id="L"
                type="source" // Type cannot be "target" because ConnectionMode is "loose"
                position={Position.Left}
                style={{ top: "50%", height: "1rem" }}
                // position={Position.Bottom}
                // style={{ left: "19%", width: "1rem" }}
            />
            <Handle
                id="N"
                type="source"
                position={Position.Right}
                style={{ top: "50%", height: "1rem" }}
                // position={Position.Bottom}
                // style={{ left: "80%", width: "1rem" }}
                // className="h-8 !bg-teal-500"
            />
        </div>
    );
}

export default memo(PowerSource);
