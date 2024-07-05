
import "@/app/globals.css";
import  Lownav  from "@/components/lownav";
import  Sidenav  from "@/components/sidenav";
import logo from "@/assets/LocAIly_Logo_1.svg";
import Image from "next/image";
import {left_panel_enlarge, right_panel_enlarge} from './page'
export const metadata = {
  title: "LocAI.ly",
  description: "team LocAI.ly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <div className={`sidenav`}><Sidenav/></div>
      <div>{children}</div>
      <div className="ln"><Lownav/></div> 
      </body>

    </html>
  );
}
