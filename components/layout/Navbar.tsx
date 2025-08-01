'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const fetchPesan = async () => {
      try {
        const [baruRes, unreadRes] = await Promise.all([
          fetch('/api/kontak/baru'),
          fetch('/api/kontak/unread'),
        ]);

        const baruData = await baruRes.json();
        const unreadData = await unreadRes.json();

        setHasNewMessage(baruData?.jumlah > 0);
        setHasUnread(unreadData?.count > 0);
      } catch (err) {
        console.error('Gagal ambil notifikasi:', err);
      }
    };

    fetchPesan();
    const interval = setInterval(fetchPesan, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">&nbsp;</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{session?.user?.email}</span>

        <div className="flex items-center gap-4">

          {/* Notifikasi */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard/kontak')}
            className={`relative text-gray-600 hover:text-red-600 transition-colors duration-200 ${
              hasNewMessage ? 'text-red-500' : ''
            }`}
          >
            <Bell className="w-5 h-5" />
            {hasNewMessage && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping" />
            )}
          </Button>

          {/* Pengaturan */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 animate-in fade-in zoom-in-95 duration-200"
            >
              <DropdownMenuLabel>Pengaturan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/master-data/users/edit/${session?.user?.id}`)
                }
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  );
}
