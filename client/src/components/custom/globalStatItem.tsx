import { TGlobalStatItemProps } from "@/types/props";

export default function GlobalStatItem({
  label,
  statistic,
}: TGlobalStatItemProps) {
  return (
    <div className="flex flex-col w-full h-full items-start justify-between px-4 py-2">
      <h2 className="text-xl text-start text-white w-full font-b">{label}</h2>
      <p className="text-md text-blue-500 text-end w-full font-bold">
        {statistic === "" ? "--" : statistic}
      </p>
    </div>
  );
}
