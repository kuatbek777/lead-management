"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
