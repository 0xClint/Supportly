"use client";

import { ProjectFlow } from "@/assets";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Navbar />

      <div className="min-h-screen w-full flex flex-col gap-10 items-center justify-center px-6 py-16">
        <div className=" text-center max-w-3xl py-30">
          <Badge className=" from-primary via-muted/30 to-primary rounded-full py-1 border-none">
            Supportly
          </Badge>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
            Supportly: Plug-and-Play x402 Enabled Customer Chatbot
          </h1>
          <p className="mt-6 text-[17px] md:text-lg">
            An x402-enabled AI chat support platform that lets users embed smart
            support bots into their websites. It allows custom data upload, AI
            model selection, and pay-per-query billing using USDC.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full text-base">
                Get Started <ArrowUpRight className="!h-5 !w-5" />
              </Button>
            </Link>
            <Link
              href={
                "https://www.youtube.com/playlist?list=PLe3O1bPNjNtEHrxmP_d-xVpdvuoRINPom"
              }
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base shadow-none"
              >
                <CirclePlay className="!h-5 !w-5" /> Watch Demo
              </Button>
            </Link>
          </div>
        </div>
        <div className="max-w-6xl my-6 text-center text-[17px] md:text-lg">
          Customer support is often expensive, unreliable, or hard to set up for
          website owners, especially when trying to personalize answers based on
          their unique data. Supportly solves this problem by providing a
          plug-and-play AI support system where users can upload their own data
          and pay only when customers ask questions using x402 microtransactions
          in USDC. This makes smart, personalized support affordable and easy to
          use. Under the hood, AI RAG is used to ensure that responses are
          accurate and based on the user’s uploaded content.
        </div>
        <div className="w-full max-w-screen-xl mx-auto aspect-video bg-accent rounded-xl overflow-hidden">
          <img src={ProjectFlow.src} />
        </div>
      </div>
    </div>
  );
}
