import { cn } from "@/lib/utils";
import { TGlobalLoaderProps } from "@/types/props";
import { Loader } from "lucide-react";

export default function GlobalLoader({ message, type }: TGlobalLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-auto h-auto m-auto",
        type === "card" && "!bg-zinc-950"
      )}
    >
      <Loader className="animate-spin text-blue-600" />
      <p className="text-sm text-center text-blue-600 w-80 h-auto">{message}</p>
    </div>
  );
}
