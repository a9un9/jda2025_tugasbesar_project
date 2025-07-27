'use client';

import UserForm from '@/components/users/UserForm';

export default function AddUserPage() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tambah Pengguna</h1>
      <UserForm />
    </div>
  );
}
