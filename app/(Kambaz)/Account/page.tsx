'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function AccountPage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const router = useRouter();

  useEffect(() => {
    // navigate based on sign-in state
    if (currentUser) {
      router.replace('/Account/Profile');
    } else {
      router.replace('/Account/Signin');
    }
  }, [currentUser, router]);

  // show nothing while redirecting
  return null;
}
