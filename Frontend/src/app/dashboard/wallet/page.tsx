"use client";
import React from "react";

import { SectionCards } from "@/components/section-cards";

export default function Wallet() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 py-4 px-20 pt-0">
        <SectionCards />

        <div className="container mx-auto">
          <h3 className="scroll-m-20 text-xl mb-4 font-semibold tracking-tight">
            Transaction History
          </h3>
        </div>
      </div>
    </>
  );
}
