import { Ref } from "react";
import { TWantedPersonMeta } from "./types";
import { TWantedListRenderTypes } from "./state";

export type TGlobalStatItemProps = {
  label: string;
  statistic: string;
};

export type TGlobalLoaderProps = {
  message: string;
  type: "card" | "page";
};

export type WantedListItemProps = {
  handleViewWantedPerson: (personUid: string) => void;
  person: TWantedPersonMeta;
  lastElementRef: Ref<HTMLDivElement> | undefined;
};

export type WantedListProps = {
  type: TWantedListRenderTypes;
};
