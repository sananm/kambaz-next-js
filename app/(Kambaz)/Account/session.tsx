import * as client from "./client";
import { useEffect } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

// Session now fetches profile in the background and does NOT block rendering.
// This avoids showing a "checking session" or blank screen on reload.
export default function Session({ children }: { children: any }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      try {
        const currentUser = await client.profile();
        if (mounted && currentUser) dispatch(setCurrentUser(currentUser));
      } catch (err: any) {
        // ignore errors silently; user will see signin UI if unauthenticated
        console.debug('session fetch failed', err?.message || err);
      }
    };
    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return children;
}
