"use client";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
// load navigation only on the client to avoid SSR/client hydration mismatch
const KambazNavigation = dynamic(() => import("./Navigation"), { ssr: false });
import store from "./store";
import { Provider } from "react-redux";
import "./styles.css";
import Session from "./Account/session";
import ProtectedRoute from "./ProtectedRoute";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Session>
        <ProtectedRoute>
          <div id="wd-kambaz">
            <div className="d-flex">
              {/* Desktop main navigation - hidden on mobile */}
              <div className="d-none d-md-block">
                <KambazNavigation />
              </div>

              {/* Main content */}
              <div className="wd-main-content-offset p-3 flex-fill">
                {children}
              </div>
            </div>
          </div>
        </ProtectedRoute>
      </Session>
    </Provider>
  );
}