import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Logo1, Logowhite2 } from "@/assets";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="min-h-screen bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2 md:gap-6">
            <div className="h-12 w-12 flex rounded-full">
              <img src={Logowhite2.src} className="h-8 translate-x-3 translate-y-2" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button
                variant="outline"
                className="hidden sm:inline-flex rounded-full"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
