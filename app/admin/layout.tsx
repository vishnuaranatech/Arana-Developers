"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

const ADMIN_EMAIL = "admin@aranadevelopers.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const isLoginPage = pathname === "/admin";

      if (!user || user.email !== ADMIN_EMAIL) {
        if (!isLoginPage) {
          router.replace("/admin");
        }
      } else {
        if (isLoginPage) {
          router.replace("/admin/dashboard");
        }
      }
      setChecking(false);
    });

    return () => unsub();
  }, [pathname]);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}