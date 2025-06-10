"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import AdminRouteGuard from "@/app/components/AdminRouteGuard";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <AdminRouteGuard>
      <main className="p-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Administrácia</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Sign Out
          </button>
        </div>

        <div className="space-y-4">
          <Link
            href="/admin/add-event"
            className="block p-4 border rounded hover:bg-gray-100"
          >
            ➕ Pridaj udalosť
          </Link>
          <Link
            href="/admin/add-organization"
            className="block p-4 border rounded hover:bg-gray-100"
          >
            ➕ Pridaj organizáciu
          </Link>
        </div>
      </main>
    </AdminRouteGuard>
  );
}
