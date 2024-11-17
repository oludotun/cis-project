"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LabView from "@/components/LabView";
import deviceTypes from "@/devices";

export default function Lab() {
    const searchParams = useSearchParams();
    const labId = searchParams.get("id");

    const router = useRouter();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [lab, setLab] = useState({});
    const [devices, setDevices] = useState([]);
    const [initEdges, setInitEdges] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        // If no token is found, redirect to login page
        if (!token) {
            setUserIsLoggedIn(false);
            router.replace("/login");
            return;
        } else {
            setUserIsLoggedIn(true);
        }
    }, [router]);

    const fetchLab = async (canFetch, labId) => {
        if (!canFetch) return;
        const token = Cookies.get("token");
        try {
            const response = await fetch(
                `http://localhost:8080/api/students/labs/${labId}`,
                {
                    method: "GET",
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // if (!response.ok) throw new Error("Login failed");
            const { lab } = await response.json();
            const initState = JSON.parse(lab.initial_state);
            const savedState = JSON.parse(lab.saved_state);
            const submission = JSON.parse(lab.submission);
            setLab(lab);
            if (submission) setInitEdges(submission);
            if (savedState) {
                setDevices(savedState);
            } else {
                setDevices(initState.devices);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchLab(userIsLoggedIn, labId);
    }, [userIsLoggedIn, labId]);

    const nodeTypesObject = deviceTypes;

    // const initEdges = [];

    return (
        <main className="">
            <Navbar currentHref="/labs" />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {lab.lab_title}
                    </h1>
                </div>
            </header>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {devices.length && (
                    <LabView
                        nodeTypesObject={nodeTypesObject}
                        initNodes={devices}
                        initEdges={initEdges}
                        labId={labId}
                    />
                )}
            </div>
        </main>
    );
}
