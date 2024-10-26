import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactElement;
}

const StandaloneLayout = ({ children }: Props) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/logo.svg"
              width={50}
              height={55}
              alt="Flowz"
              draggable="false"
            />
            <h1 className="font-semibold text-xl select-none">Flowz</h1>
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
