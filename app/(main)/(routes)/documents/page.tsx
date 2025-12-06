"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

function DocumentsPage() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = create({
      title: "Untitled",
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

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
      <Button onClick={handleCreate}>
        <PlusCircleIcon className="size-4" />
        Create a note
      </Button>
    </div>
  );
}

export default DocumentsPage;
