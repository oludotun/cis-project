import { Inter } from "next/font/google";
import "@xyflow/react/dist/base.css";
import "./globals.css";
// import "./tailwind-config.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "TT SIM App",
    description: "Hands on Training Simulation Software.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
