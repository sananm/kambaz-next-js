'use client';
import { ReactNode, useState } from "react";
import KambazNavigation from "./Navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles.css";

export default function KambazLayout({ children }: { children: ReactNode }) {
  const [showMainNav, setShowMainNav] = useState(false);

  return (
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
  );
}