import { WantedListItemProps } from "@/types/props";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function WantedListItem({
  handleViewWantedPerson,
  person,
  lastElementRef,
}: WantedListItemProps) {
  return (
    <Card
      ref={lastElementRef}
      onClick={() => handleViewWantedPerson(person.uid)}
      className="grid col-span-1 lg:col-span-1 rounded-xl justify-items-stretch text-center content-start w-full h-full max-h-[550px] border-0 mb-4 bg-zinc-950 cursor-pointer"
    >
      <CardHeader className="flex flex-row justify-end items-center w-full h-auto"></CardHeader>
      <CardContent className="flex flex-col items-center justify-start min-h-[400px]">
        <div className="flex flex-row w-full h-[350px] mb-4">
          <img
            src={person.image}
            alt={person.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <p className="block w-full text-md text-blue-400 text-start font-bold">
          {String(person.title).split("-")[0]}
        </p>
        <p className="block w-full text-sm text-white text-start font-semibold">
          Nationality: {person.nationality ? person.nationality : "--"}
        </p>
        <p className="block w-full text-sm text-white text-start font-semibold">
          Published on:{" "}
          {person.publication
            ? new Date(person.publication).toDateString()
            : "--"}
        </p>
      </CardContent>
    </Card>
  );
}
