"use client";
import "react-toastify/dist/ReactToastify.css";
import "../(site)/globals.css";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  userServiceController,
  userStatus,
} from "../service/userServiceController";
import { ToastContainer, toast } from "react-toastify";
import { deleteCookie } from "cookies-next";
import { logout } from "../(site)/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const userService = new userServiceController();

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
  }, [isNavOpen]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex max-h-screen overflow-hidden relative">
          <div
            className={`absolute z-[100] top-0 lg:relative w-full xs:w-10/12 sm:w-8/12 lg:w-[600px] h-screen shadow-2xl transition-all ease-in-out duration-[700ms] 
            ${
              isNavOpen
                ? "left-0"
                : "left-[-100%] xs:left-[-83.333333%] sm:left-[-66.666667%] lg:left-0"
            }`}
          >
            <div className="relative w-full h-full bg-white lg:border-r border-[#e6e6e699]">
              <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                <div className="w-full flex flex-col justify-center items-center">
                  <p className="font-raleway font-bold text-5xl  italic">
                    Rental<span className="font-medium">Car</span>
                  </p>
                </div>

                {/* <div className="flex flex-col gap-2 justify-center items-center capitalize py-4 font-montserrat">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.link}>
                      <p
                        className={`cursor-pointer hover:tracking-widest hover:font-bold transition-all ease-in-out ${
                          link.link === "/owner" &&
                          isOwner === "false" &&
                          "hidden"
                        }`}
                        onClick={() => setIsNavOpen(false)}
                      >
                        {link.name}
                      </p>
                    </Link>
                  ))}
                </div> */}
                {/* Social Icons Section */}
                <div className="font-light text-sm text-center py-4 flex flex-col gap-3">
                  <div
                    className={`px-2 py-1 border rounded-md capitalize bg-slate-200 font-bold transition-all ease-in-out text-green-500  border-green-500"
                    `}
                  >
                    admin
                  </div>

                  <div
                    className={`px-2 py-1 border rounded-md capitalize bg-slate-200 font-bold transition-all ease-in-out text-red-500  border-red-500 cursor-pointer hover:bg-slate-300"
                    `}
                    onClick={logout}
                  >
                    Log Out
                  </div>

                  <p className="italic">
                    Koding Akademi @ 2023 <br /> by
                    <span className="font-normal">Raka</span>
                  </p>
                </div>
                {/* Close Button */}
                <div className="py-10">
                  <button
                    type="button"
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="sm:hidden rounded-full w-10 h-10 border p-2 border-black flex justify-center items-center"
                  >
                    <ChevronDoubleLeftIcon className="w-full h-full text-black" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="rounded-button absolute top-1/2 -translate-y-1/2 right-[-42px] w-[42px] h-[10%] bg-white flex flex-col justify-center items-center p-3 lg:hidden text-[#909090] hover:text-black transition-all ease-in duration-300"
              >
                <ChevronDoubleRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div
            // onClick={() => setIsNavOpen(false)}
            className={`w-full h-full overflow-hidden lg:hidden bg-black absolute transition-all ease-in-out duration-500 z-[98] bg-opacity-60 ${
              isNavOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          ></div>
          <div className="w-full min-h-screen overflow-hidden overflow-y-scroll p-8 bg-[#f8f8f8] relative z-10">
            <div className="w-full h-full pt-8 sm:p-8 lg:px-12">{children}</div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          pauseOnHover={false}
          autoClose={800}
        />
      </body>
    </html>
  );
}