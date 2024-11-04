import { SpinningTextBasic } from "@/components/spinning-text";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col space-y-2">
      <div className="">
        <SpinningTextBasic />
      </div>

      <div className="flex items-center justify-center flex-col space-y-2">
        <p className="text-sm text-muted-foreground">
          Page not found? It must be hiding!
        </p>
        <Button size="sm" variant="secondary" asChild>
          <Link href="/">
            <Home />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
