"use client";
import { Login } from "@/components/Login";
import { useWallet } from "@/context/WalletContext";
import { getUserByEmail } from "@/lib/db/user";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { evmAddress, accountId, fetchEvmAddress } = useWallet();

  const fetchUserData = async () => {
    console.log(evmAddress);
    // try {
    //   console.log("fetch user");
    //   const user = await getUserByEmail("abc@xyz");
    //   console.log(user);
    // } catch (err) {
    //   console.error("Error fetching user:", err);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 flex flex-col">
      <div className="flex-grow">
        <Login />
        {/* Hero Section */}
        <button onClick={fetchUserData}>fetchUsers</button>
        <section className="max-w-6xl mx-auto px-4 py-20 lg:py-28">
          <div className="text-center">
            <div className="w-64 mb-6 mx-auto">
              {/* <WordmarkCondensed className="mx-auto" /> */}
            </div>
            <p className="text-xl text-gray-600 mb-8 font-mono">
              Fullstack demo powered by Next.js
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/protected"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-mono transition-colors text-white"
              >
                Live demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
