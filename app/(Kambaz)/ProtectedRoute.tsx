'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [isChecking, setIsChecking] = useState(true);

  // Public routes that don't require authentication
  const publicRoutes = ['/Account/Signin', '/Account/Signup', '/Account'];

  useEffect(() => {
    // Give Session component time to fetch user
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If checking is done and user is not authenticated
    if (!isChecking && !currentUser) {
      // Check if current route is public
      const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));

      // If not on a public route, redirect to signin
      if (!isPublicRoute) {
        router.push('/Account/Signin');
      }
    }
  }, [isChecking, currentUser, pathname, router]);

  // Show nothing while checking authentication
  if (isChecking) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If user is not authenticated and trying to access protected route, show nothing (redirect happening)
  const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));
  if (!currentUser && !isPublicRoute) {
    return null;
  }

  // User is authenticated or on public route, show children
  return <>{children}</>;
}
