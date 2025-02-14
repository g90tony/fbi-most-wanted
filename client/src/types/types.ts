export type TDashboardStatsData = {
  totalWantedPersons: string;
  totalWantedCategory: string;
  mostWantedNationality: string;
};

export type TWantedPersonMeta = {
  uid: string;
  title: string;
  publication: string;
  nationality: string;
  image: string;
};

export type TWantedPersonDetails = {
  uid: string;
  occupations: string[];
  sex: string;
  dates_of_birth_used: string[];
  caution: string;
  nationality: string;
  subjects: string[];
  aliases: string[];
  title: string;
  languages: string[];
  details: string;
  image: string;
};

export type TFilterParam = {
  type: "category" | "nationality" | "race" | "search";
  query: string;
};
