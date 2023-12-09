import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "../_components/sidebar/sidebar.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScrumBan",
  description: "Manage your agile project efficiently",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    workspaceId: number;
  };
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="workspace-page">
          <SideBar workspace_id={params.workspaceId} />
          {children}
        </div>
      </body>
    </html>
  );
}
