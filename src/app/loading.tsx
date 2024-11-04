"use client";

import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-4">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loading;
