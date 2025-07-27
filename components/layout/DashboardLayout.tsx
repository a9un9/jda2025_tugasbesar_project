// components/layout/DashboardLayout.tsx
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 bg-gray-100 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
