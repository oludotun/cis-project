/* eslint-disable @next/next/no-img-element */

"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";

// Dummy user data for illustration
const user = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    picture: "/img/user-icon.jpg", // Default user icon
};

export default function Profile() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [profilePic, setProfilePic] = useState(user.picture);
    const [file, setFile] = useState(null);
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

    const fetchProfile = async (canFetch) => {};

    useEffect(() => {
        fetchProfile(userIsLoggedIn);
    }, [userIsLoggedIn]);

    // Handlers for form submission (Password Change)
    const handlePasswordChange = (e) => {
        e.preventDefault();
        // Submit password change to backend
        console.log({ currentPassword, newPassword });
    };

    // Handle profile picture change
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            // Update profile pic preview
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfilePic(event.target.result); // Preview the selected image
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Handle picture upload form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            // Handle file upload to the backend
            console.log("Uploading profile picture:", file);

            // Reset file input after submission
            setFile(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar currentHref="/profile" />

            {/* Header */}
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        My Profile
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Sidebar (optional) */}
                        <aside className="hidden lg:block bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">
                                Profile Menu
                            </h2>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#profile"
                                        className="text-gray-700 hover:text-blue-500"
                                    >
                                        Profile Info
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#password"
                                        className="text-gray-700 hover:text-blue-500"
                                    >
                                        Change Password
                                    </a>
                                </li>
                            </ul>
                        </aside>

                        {/* Profile Details Section */}
                        <div className="lg:col-span-2">
                            {/* User Details */}
                            <section
                                id="profile"
                                className="bg-white p-6 rounded-lg shadow mb-6"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Profile Info
                                </h2>

                                <div className="flex items-center space-x-4 mb-6">
                                    <img
                                        src={profilePic}
                                        alt="Profile Picture"
                                        // width={64}
                                        // height={64}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {user.first_name} {user.last_name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Profile Picture Change Form */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="file-upload"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Change Profile Picture
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        Save Picture
                                    </button>
                                </form>

                                {/* Profile Info Display (Non-editable) */}
                                <form>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                                        <div>
                                            <label
                                                htmlFor="firstName"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                                                value={user.first_name}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="lastName"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                                                value={user.last_name}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                                                value={user.email}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </form>
                            </section>

                            {/* Password Change Section */}
                            <section
                                id="password"
                                className="bg-white p-6 rounded-lg shadow mb-6"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Change Password
                                </h2>
                                <form onSubmit={handlePasswordChange}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label
                                                htmlFor="currentPassword"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                id="currentPassword"
                                                className="mt-1 p-2 w-full border rounded-md"
                                                value={currentPassword}
                                                onChange={(e) =>
                                                    setCurrentPassword(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="newPassword"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                id="newPassword"
                                                className="mt-1 p-2 w-full border rounded-md"
                                                value={newPassword}
                                                onChange={(e) =>
                                                    setNewPassword(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        Change Password
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
