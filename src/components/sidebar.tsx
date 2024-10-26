import Image from "next/image";
import Link from "next/link";
import React from "react";
import DottedSeparator from "./dotted-separator";
import { Navigation } from "./navigation";
import WorkspaceSwitcher from "./workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
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
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
