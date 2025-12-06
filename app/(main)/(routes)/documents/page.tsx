"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";

function DocumentsPage() {
  const { user } = useUser();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Emtpy"
        height={250}
        width={250}
        className="object-contain dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="Emtpy"
        height={250}
        width={250}
        className="object-contain hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button>
        <PlusCircleIcon className="size-4"/>
        Create a note
      </Button>
    </div>
  );
}

export default DocumentsPage;
