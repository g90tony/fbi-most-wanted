import { cn } from "@/lib/utils";
import { TGlobalLoaderProps } from "@/types/props";
import { AlertCircleIcon } from "lucide-react";

export default function GlobalEmptyPlaceholder({
  message,
  type,
}: TGlobalLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-auto h-auto m-auto rounded-xl gap-4",
        type === "card" && "!bg-zinc-950"
      )}
    >
      <AlertCircleIcon className=" text-rose-600 scale-200" />
      <div
        className="text-md text-center font-semibold text-rose-600 w-80 h-auto"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
}
