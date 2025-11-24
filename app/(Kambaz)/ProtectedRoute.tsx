"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "./Account/SessionContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { isLoading } = useSession();

  // Public routes that don't require authentication
  const publicRoutes = ["/Account/Signin", "/Account/Signup", "/Account"];

  const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route));

  useEffect(() => {
    // Wait for session to finish loading before checking auth
    if (!isLoading && !currentUser && !isPublicRoute) {
      router.push("/Account/Signin");
    }
  }, [isLoading, currentUser, pathname, router, isPublicRoute]);

  // Show loading spinner while session is being checked
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If user is not authenticated and trying to access protected route, show nothing (redirect happening)
  if (!currentUser && !isPublicRoute) {
    return null;
  }

  // User is authenticated or on public route, show children
  return <>{children}</>;
}
