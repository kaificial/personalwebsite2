
import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "../styles/globals.scss";
import Header from "../components/Header";
import { ThemeProvider } from "../components/ThemeContext";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: ["400"],
});

// site metadata for SEO and social sharing
// this shows up in browser tabs and when people share links
export const metadata: Metadata = {
    title: "Kai Kim",
    keywords: ["Kai Kim", "software developer", "portfolio", "web developer", "React", "Next.js"],
    authors: [{ name: "Kai Kim" }],
    openGraph: {
        title: "Kai Kim",
        description: "Hey! I'm Kai",
        type: "website",
    },
};

/*
 * Main layout component
 * 
 * we're setting html to "dark" class by default since dark mode looks better imo
 * Users can toggle it if they like light mode
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${ibmPlexMono.variable}`}>
                <ThemeProvider>
                    <Header />
                    <main>
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
