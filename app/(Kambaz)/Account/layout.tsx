import { ReactNode } from "react";
import dynamic from "next/dynamic";

// Account navigation is auth-dependent (reads redux/localStorage). Load it on client only
const AccountNavigation = dynamic(() => import("./Navigation"), { ssr: false });

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
   <div id="wd-kambaz">
     <table>
       <tbody>
         <tr>
           <td valign="top">
             <AccountNavigation />
           </td>
           <td valign="top" width="100%">
             {children}
           </td>
         </tr>
       </tbody>
     </table>
  </div>
);
}
