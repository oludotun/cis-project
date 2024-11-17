/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Courses() {
    const router = useRouter();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [courses, setCourses] = useState([]);

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

    const fetchCourses = async (canFetch) => {
        if (!canFetch) return;
        const token = Cookies.get("token");
        try {
            const response = await fetch(
                "http://localhost:8080/api/students/courses",
                {
                    method: "GET",
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // if (!response.ok) throw new Error("Login failed");
            const { courses } = await response.json();
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourses(userIsLoggedIn);
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
            <Navbar currentHref="/courses" />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        My Courses
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                                List of courses you are enrolled
                            </h3>
                            {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                Personal details and application.
                            </p> */}
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                {courses.map((course) => (
                                    <div
                                        key={course.course_id}
                                        className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 hover:bg-gray-100"
                                    >
                                        <dt className="pl-4 text-sm font-medium leading-6 text-gray-900">
                                            <img
                                                className="h-20 w-auto"
                                                src="/img/course-icon.svg"
                                                alt="Your Company"
                                            />
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <div>
                                                <div className="font-semibold">
                                                    Course Title:{" "}
                                                    {course.course_title}
                                                </div>
                                                <div>
                                                    Enrollment Date:{" "}
                                                    {formatDate(
                                                        course.enrolled_at
                                                    )}
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
        </main>
    );
}
