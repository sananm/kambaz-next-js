"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "./Account/SessionContext";

export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { isLoading } = useSession();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Wait for session to finish loading before redirecting
    if (!isLoading && !redirecting) {
      setRedirecting(true);
      if (currentUser) {
        router.replace("/Dashboard");
      } else {
        router.replace("/Account/Signin");
      }
    }
  }, [isLoading, currentUser, router, redirecting]);

  // Show loading spinner while checking session
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
