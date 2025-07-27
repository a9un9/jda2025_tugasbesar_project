'use client';

import UserTable from '@/components/users/UserTable';

export default function UsersPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manajemen Pengguna</h1>
      <UserTable />
    </div>
  );
}
