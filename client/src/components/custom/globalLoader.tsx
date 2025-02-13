import { cn } from "@/lib/utils";
import { TGlobalLoaderProps } from "@/types/props";
import { Loader } from "lucide-react";

export default function GlobalLoader({ message, type }: TGlobalLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-auto h-auto m-auto rounded-xl",
        type === "card" ? "!bg-zinc-950" : "!bg-black"
      )}
    >
      <Loader className="animate-spin text-blue-400" />
      <p className="text-sm text-center text-blue-400 font-bold w-80 h-auto">
        {message}
      </p>
    </div>
  );
}
