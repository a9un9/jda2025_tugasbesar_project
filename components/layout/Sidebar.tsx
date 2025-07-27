"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserPlus,
  Menu,
  ChevronDown,
  ChevronRight,
  CalendarCheck2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { data: session } = useSession();
  const role = session?.user?.role || "admin";
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [openMasterData, setOpenMasterData] = useState(false);

  const isActive = (href: string) => pathname === href;

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Tutup dropdown Master Data saat berpindah halaman
  useEffect(() => {
    setOpenMasterData(false);
  }, [pathname]);

  return (
    <aside
      className={cn(
        "h-screen bg-white shadow transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-lg font-bold">Klinik Sehat</h2>}
        <button onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded m-4">
        {role.toUpperCase()}
      </div>

      <nav className="px-2 space-y-1 text-sm">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
            isActive("/dashboard") && "bg-gray-200 font-semibold"
          )}
        >
          <LayoutDashboard className="w-4 h-4" />
          {!collapsed && "Dashboard"}
        </Link>

        {/* Admin - Master Data */}
        {role === "admin" && (
          <div>
            <button
              className="flex items-center w-full gap-2 px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setOpenMasterData((prev) => !prev)}
            >
              <Users className="w-4 h-4" />
              {!collapsed && (
                <>
                  <span>Master Data</span>
                  <span className="ml-auto">
                    {openMasterData ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                </>
              )}
            </button>

            {openMasterData && !collapsed && (
              <div className="pl-6 mt-1 space-y-1">
                <Link
                  href="/dashboard/master-data/users"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                    isActive("/dashboard/master-data/users") &&
                      "bg-gray-200 font-semibold"
                  )}
                >
                  <UserPlus className="w-4 h-4" />
                  Manajemen User
                </Link>
                <Link
                  href="/dashboard/master-data/patients"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                    isActive("/dashboard/master-data/patients") &&
                      "bg-gray-200 font-semibold"
                  )}
                >
                  <Users className="w-4 h-4" />
                  Data Pasien
                </Link>
                <Link
                  href="/dashboard/master-data/doctors"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                    isActive("/dashboard/master-data/doctors") &&
                      "bg-gray-200 font-semibold"
                  )}
                >
                  <Stethoscope className="w-4 h-4" />
                  Data Dokter
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Dokter */}
        {role === "dokter" && (
          <>
            <Link
              href="/dashboard/master-data/patients"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                isActive("/dashboard/master-data/patients") &&
                  "bg-gray-200 font-semibold"
              )}
            >
              <Users className="w-4 h-4" />
              {!collapsed && "Data Pasien"}
            </Link>
            <Link
              href="/dashboard/jadwal"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                isActive("/dashboard/jadwal") && "bg-gray-200 font-semibold"
              )}
            >
              <CalendarCheck2 className="w-4 h-4" />
              {!collapsed && "Jadwal Konsultasi"}
            </Link>
          </>
        )}

        {/* Perawat */}
        {role === "perawat" && (
          <Link
            href="/dashboard/master-data/patients"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
              isActive("/dashboard/master-data/patients") &&
                "bg-gray-200 font-semibold"
            )}
          >
            <Users className="w-4 h-4" />
            {!collapsed && "Data Pasien"}
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
