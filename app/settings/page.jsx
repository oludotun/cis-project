"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Settings() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const router = useRouter();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    // Checking if users is logged in or not
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

    const fetchSettings = async (canFetch) => {};

    useEffect(() => {
        fetchSettings(userIsLoggedIn);
    }, [userIsLoggedIn]);

    // Handlers for toggling notification settings
    const handleToggleEmail = () => setEmailNotifications(!emailNotifications);
    const handleToggleSms = () => setSmsNotifications(!smsNotifications);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar currentHref="/settings" />

            {/* Header */}
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Settings
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Settings Sidebar (optional) */}
                        <aside className="hidden lg:block bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">
                                Settings Menu
                            </h2>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#notifications"
                                        className="text-gray-700 hover:text-blue-500"
                                    >
                                        Notifications
                                    </a>
                                </li>
                            </ul>
                        </aside>

                        {/* Notifications Section */}
                        <div className="lg:col-span-2">
                            <section
                                id="notifications"
                                className="bg-white p-6 rounded-lg shadow"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Notifications
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800">
                                                Email Notifications
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Receive notifications via email.
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="h-6 w-6 text-blue-600"
                                            checked={emailNotifications}
                                            onChange={handleToggleEmail}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800">
                                                SMS Notifications
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Receive notifications via SMS.
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="h-6 w-6 text-blue-600"
                                            checked={smsNotifications}
                                            onChange={handleToggleSms}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
