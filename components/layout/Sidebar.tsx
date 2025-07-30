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
  Hospital,
  HeartPulse,
  Pill,
  ClipboardList,
  BadgePlus,
  FolderCog
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { data: session } = useSession();
  // const role = session?.user?.role || "admin";
  const role = session?.user?.role?.toLowerCase() || "admin";
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [openMasterData, setOpenMasterData] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const isMasterPath = pathname.startsWith("/dashboard/master-data");
    setOpenMasterData(isMasterPath);
  }, [pathname]);

  return (
    <aside
      className={cn(
        "h-screen bg-white shadow transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-lg font-bold">Klinik Sehat Tentrem</h2>}
        <button onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 py-2 text-sm font-medium text-center text-white bg-teal-500 rounded m-4">
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

        {/* === ADMIN === */}
        {role === "admin" && (
          <div>
              <Link
                href="/dashboard/registrasi_rajal"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                  isActive("/dashboard/registrasi_rajal") && "bg-gray-200 font-semibold"
                )}
              >
                <ClipboardList className="w-4 h-4" />
                {!collapsed && "Registrasi Rawat Jalan"}
              </Link>
              <Link
                href="/dashboard/pelayanan"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                  isActive("/dashboard/pelayanan") &&
                    "bg-gray-200 font-semibold"
                )}
              >
                <BadgePlus className="w-4 h-4" />
                {!collapsed && "Pelayanan"}
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

            <button
              onClick={() => setOpenMasterData(!openMasterData)}
              className={cn(
                "flex items-center w-full gap-2 px-3 py-2 rounded hover:bg-gray-100",
                openMasterData && "bg-gray-100"
              )}
            >

              <FolderCog className="w-4 h-4" />
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

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openMasterData && !collapsed ? "max-h-96" : "max-h-0"
              )}
            >
              <div className="pl-6 space-y-1">
                <Link
                  href="/dashboard/master-data/users"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                    isActive("/dashboard/master-data/users") &&
                      "bg-gray-200 font-semibold"
                  )}
                >
                  <UserPlus className="w-4 h-4" />
                  {!collapsed && "Manajemen User"}
                </Link>
                <Link
                  href="/dashboard/master-data/pasiens"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                    isActive("/dashboard/master-data/pasiens") &&
                      "bg-gray-200 font-semibold"
                  )}
                >
                  <Users className="w-4 h-4" />
                  {!collapsed && "Data Pasien"}
                </Link>
                <Link
                  href="/dashboard/master-data/dokters"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                    isActive("/dashboard/master-data/dokters") &&
                      "bg-gray-200 font-semibold"
                  )}
                >
                  <Stethoscope className="w-4 h-4" />
                  {!collapsed && "Data Dokter"}
                </Link>
                <Link
                  href="/dashboard/master-data/polikliniks"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                    isActive("/dashboard/master-data/polikliniks") &&
                      "bg-gray-200 font-semibold"
                  )}
                >
                  <Hospital className="w-4 h-4" />
                  {!collapsed && "Data Poliklinik"}
                </Link>
                <Link
                  href="/dashboard/master-data/obats"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                    isActive("/dashboard/master-data/obats") &&
                      "bg-gray-200 font-semibold"
                  )}
                >
                  <Pill className="w-4 h-4" />
                  {!collapsed && "Data Obat"}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* === DOKTER === */}
        {role === "dokter" && (
          <div>
            <Link
              href="/dashboard/pelayanan"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                isActive("/dashboard/pelayanan") &&
                  "bg-gray-200 font-semibold"
              )}
            >
              <Users className="w-4 h-4" />
              {!collapsed && "Pelayanan"}
            </Link>
          </div>
        )}

        {/* === PERAWAT === */}
        {role === "perawat" && (
          <div>
            <Link
              href="/dashboard/registrasi_rajal"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                isActive("/dashboard/registrasi_rajal") && "bg-gray-200 font-semibold"
              )}
            >
              <ClipboardList className="w-4 h-4" />
              {!collapsed && "Registrasi Rawat Jalan"}
            </Link>
            
            <Link
              href="/dashboard/pelayanan"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100",
                isActive("/dashboard/pelayanan") &&
                  "bg-gray-200 font-semibold"
              )}
            >
              <BadgePlus className="w-4 h-4" />
              {!collapsed && "Pelayanan"}
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
