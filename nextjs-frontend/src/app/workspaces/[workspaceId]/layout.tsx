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
  const response = await fetch(
    `http://localhost:3000/workspaces/${params.workspaceId}/projects`
  );
  const workspaceProjects = await response.json();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="workspace-page"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#18122A",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="workspace-page"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#18122A",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <SideBar projects={workspaceProjects || []} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
