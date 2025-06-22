"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { ReactNode } from "react";
import { SidebarTrigger } from "./ui/sidebar";

const AppSidebarClient = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <div className="p-2 border-b flex items-center gap-1 ">
          <SidebarTrigger />
          <span className="text-xl ">YBH Jobs</span>
        </div>
        <div className="flex-1">{children} </div>
      </div>
    );
  }
  return children;
};

export default AppSidebarClient;
