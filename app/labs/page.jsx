/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Labs() {
    const router = useRouter();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [labs, setLabs] = useState([]);

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

    const fetchLabs = async (canFetch) => {
        if (!canFetch) return;
        const token = Cookies.get("token");
        try {
            const response = await fetch(
                "http://localhost:8080/api/students/labs",
                {
                    method: "GET",
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // if (!response.ok) throw new Error("Login failed");
            const { labs } = await response.json();
            setLabs(labs);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchLabs(userIsLoggedIn);
    }, [userIsLoggedIn]);

    const formatDate = (basicDate) => {
        const date = new Date(basicDate);
        // return date.toDateString();
        return new Intl.DateTimeFormat("en-GB", {
            dateStyle: "full",
            // timeStyle: "long",
            // timeZone: "Australia/Sydney",
        }).format(date);
    };

    return (
        <main className="">
            <Navbar currentHref="/labs" />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        My Labs
                    </h1>
                </div>
            </header>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                            List of your labs
                        </h3>
                        {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                Personal details and application.
                            </p> */}
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {labs.map((lab) => (
                                <div
                                    key={lab.student_lab_id}
                                    className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 hover:bg-gray-100"
                                >
                                    <dt className="pl-4 text-sm font-medium leading-6 text-gray-900">
                                        <Link
                                            href={`/lab?id=${lab.student_lab_id}`}
                                        >
                                            <img
                                                className="h-20 w-auto"
                                                src="/img/lab-icon.svg"
                                                alt="Your Company"
                                            />
                                        </Link>
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <div>
                                            <div className="font-semibold">
                                                <Link
                                                    href={`/lab?id=${lab.student_lab_id}`}
                                                >
                                                    Lab Title: {lab.lab_title}
                                                </Link>
                                            </div>
                                            <div>
                                                Course: {lab.course_title}
                                            </div>
                                            <div>
                                                Start Date:{" "}
                                                {formatDate(lab.started_at)}
                                            </div>
                                        </div>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </main>
    );
}
