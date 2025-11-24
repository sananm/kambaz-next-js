"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountPage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Small delay to let Redux state hydrate
    const timer = setTimeout(() => {
      setChecked(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (checked) {
      if (currentUser) {
        router.replace("/Account/Profile");
      } else {
        router.replace("/Account/Signin");
      }
    }
  }, [checked, currentUser, router]);

  // Show nothing while redirecting
  return null;
}
