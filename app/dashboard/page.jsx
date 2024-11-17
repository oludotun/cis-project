"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
    const router = useRouter();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [stats, setStats] = useState([]);

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

    // const fetchDashboardDetails = async (canFetch) => {};

    // useEffect(() => {
    //     fetchDashboardDetails(userIsLoggedIn);
    // }, [userIsLoggedIn]);

    const fetchStats = async (canFetch) => {
        if (!canFetch) return;
        const token = Cookies.get("token");
        try {
            const response = await fetch(
                "http://localhost:8080/api/students/stats",
                {
                    method: "GET",
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { stats } = await response.json();
            setStats(stats);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStats(userIsLoggedIn);
    }, [userIsLoggedIn]);

    return (
        <div className="h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar currentHref="/dashboard" />

            {/* Header */}
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Dashboard
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                <div className="mx-auto max-w-7xl">
                    {/* Dashboard Widgets */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col bg-white shadow rounded-lg p-6 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">
                                Enrolled Courses
                            </dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                                {stats.total_enrolled_courses
                                    ? stats.total_enrolled_courses
                                    : 0}
                            </dd>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex justify-between mb-4">
                                <span className="text-lg font-medium text-gray-500">
                                    Lab Progress
                                </span>
                                <span className="text-lg font-medium text-gray-500">
                                    {stats.lab_progress_percentage
                                        ? stats.lab_progress_percentage
                                        : 0}
                                    %
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-5">
                                <div
                                    className="bg-blue-600 h-5 rounded-full"
                                    style={{
                                        width: `${
                                            stats.lab_progress_percentage
                                                ? stats.lab_progress_percentage
                                                : "0"
                                        }%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white shadow rounded-lg p-6 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">
                                Enrolled Labs
                            </dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                                {stats.total_enrolled_labs
                                    ? stats.total_enrolled_labs
                                    : 0}
                            </dd>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex justify-between mb-4">
                                <span className="text-lg font-medium text-gray-500">
                                    Average Performance
                                </span>
                                <span className="text-lg font-medium text-gray-500">
                                    {stats.average_performance
                                        ? stats.average_performance
                                        : 0}
                                    %
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-5">
                                <div
                                    className="bg-blue-600 h-5 rounded-full"
                                    style={{
                                        width: `${
                                            stats.average_performance
                                                ? stats.average_performance
                                                : "0"
                                        }%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
