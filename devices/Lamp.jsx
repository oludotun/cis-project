"use client";
import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import LampSvg from "./svg/Lamp";

function Lamp({ data }) {
    return (
        <div className="">
            <LampSvg className="text-lg h-16" reference={data.ref} />
            {/* <div className="flex">
                <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
                    {data.emoji}
                </div>
                <div className="ml-2">
                    <div className="text-lg font-bold">{data.name}</div>
                    <div className="text-gray-500">{data.ref}</div>
                </div>
            </div> */}

            <Handle
                id="A"
                type="source"
                position={Position.Right}
                style={{ top: "78%", height: "1rem" }}
                // className="h-8 !bg-teal-500 left-3/4"
            />
            <Handle
                id="B"
                type="source"
                position={Position.Left}
                style={{ top: "78%", height: "1rem" }}
                // className="h-8 !bg-teal-500"
            />
        </div>
    );
}

export default memo(Lamp);
