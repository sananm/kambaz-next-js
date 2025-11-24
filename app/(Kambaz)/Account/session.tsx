"use client";
import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { SessionContext } from "./SessionContext";

export default function Session({ children }: { children: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      // User not logged in or session expired - this is expected
      console.log("No active session found");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <SessionContext.Provider value={{ isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}
