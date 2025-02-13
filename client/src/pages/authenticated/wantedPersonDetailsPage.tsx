import { useCallback, useEffect, useState } from "react";
import { TWantedPersonDetails } from "../../types/types";
import handleDashboardGetPersonDetails from "@/api/handleDashboardGetPersonDetails";
import { useNavigate, useParams } from "react-router";
import { TAuthState } from "@/types/state";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, DEAUTHENTICATE_USER } from "@/state/slices/authStateSlice";
import isDevEnv from "@/lib/isDevEnv";
import { cn } from "@/lib/utils";
import GlobalLoader from "@/components/custom/globalLoader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import handleDashboardAddPersonToWatchList from "@/api/handleDashboardAddPersonToWatchList";
import { toast } from "sonner";

export default function WantedPersonDetailsPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useNavigate();

  const authState: TAuthState = useSelector(AuthState);

  const [personDetails, setPersonDetails] = useState<TWantedPersonDetails>({
    uid: "",
    occupations: [],
    sex: "",
    dates_of_birth_used: [],
    caution: "",
    nationality: "",
    subjects: [],
    aliases: [],
    title: "",
    languages: [],
    details: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAddToPersonalList = useCallback(
    async function (selectedPersonTitle: string, selectedPersonUid: string) {
      if (authState.isAuthenticated && authState.authenticatedUser !== null) {
        try {
          const response = await handleDashboardAddPersonToWatchList(
            authState.authenticatedUser.token,
            selectedPersonUid
          );

          if (response) {
            toast.success(
              `${selectedPersonTitle} wass added successfully to your watch list`,
              {
                id: "add-to-watchlist",
              }
            );
          }
        } catch (error) {
          if (isDevEnv) {
            console.error("FETCH_DASHBOARD_FAILURE", error);
          }
          toast.error(
            "There was a problem loading the data. Please try again later",
            {
              id: "add-to-watchlist",
            }
          );
        }
      } else {
        router("/sign-up", {
          state: { trigger: "user" },
        });
      }
    },
    [authState.authenticatedUser, authState.isAuthenticated, router]
  );

  const fetchData = useCallback(
    async function () {
      if (
        authState.isAuthenticated === true &&
        authState.authenticatedUser !== null &&
        typeof params.id === "string"
      ) {
        setIsLoading(true);
        try {
          const response = await handleDashboardGetPersonDetails(
            authState.authenticatedUser.token,
            params.id
          );

          if (response !== undefined) {
            setPersonDetails(response.data);
            setIsLoading(false);
          }
        } catch (error) {
          if (isDevEnv) console.error("FETCH_PERSON_DETAILS_FAILURE", error);
          setIsLoading(false);
        }
      } else {
        dispatch(DEAUTHENTICATE_USER());
      }
    },
    [
      authState.authenticatedUser,
      authState.isAuthenticated,
      dispatch,
      params.id,
    ]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="flex flex-col w-full min-h-[90vh] gap-4 overflow-y-auto">
      <div
        className={cn(
          isLoading
            ? "flex flex-row justify-center items-start w-full h-full bg-zinc-950 rounded-lg"
            : "grid auto-rows-min grid-cols-1 lg:grid-cols-5 grid-rows-4 gap-4 w-full h-full rounded-lg"
        )}
      >
        {isLoading ? (
          <GlobalLoader message="Loading Most Wonted List" type="card" />
        ) : (
          <>
            <div className="!bg-zinc-950 row-span-4 col-span-1 lg:col-span-5 rounded-xl justify-items-stretch text-center content-start min-h-[60vh] p-4 gap-2">
              <div className="flex flex-row justify-start items-center gap-4 w-full h-auto mb-4">
                {" "}
                <img
                  src={personDetails.image}
                  alt={personDetails.title}
                  className="w-[400px] h-[400px] object-cover rounded-xl"
                />
                <div className="flex flex-col item-start justify-start w-full h-full">
                  <div className="flex flex-row justify-end items-center w-full">
                    <Button
                      onClick={() =>
                        handleAddToPersonalList(
                          personDetails.title,
                          personDetails.uid
                        )
                      }
                      className="text-xs text-blue-700 bg-white hover:bg-blue-950 hover:text-blue-400  font-bold rounded-xl border-0 w-[150px] h-[40px] mb-4"
                    >
                      Add to WatchList <Plus />
                    </Button>
                  </div>

                  <div className="flex flex-col justify-start items-start gap-4 w-full h-auto mb-4">
                    <h1 className="text-5xl capitalize text-white text-start font-bold w-full h-auto">
                      {personDetails.title.toLowerCase()}
                    </h1>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-4 w-full h-auto mb-4">
                    <p className="text-sm text-white font-bold w-auto h-auto">
                      Known Occupations
                    </p>
                    <div className="flex flex-row justify-start items-center gap-4 w-full h-auto mb-0">
                      {personDetails.occupations.length > 0 &&
                        personDetails.occupations.map((item, index) => (
                          <div
                            key={index}
                            className="bg-blue-300 py-2 px-4 rounded-xl mx-2"
                          >
                            <p className="text-xs text-blue-600 text-center font-bold w-full h-auto">
                              {item}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-4 w-full h-auto mb-4">
                    <p className="text-sm text-white font-bold w-auto h-auto">
                      Known Aliases
                    </p>
                    <div className="flex flex-row justify-start items-center gap-4 w-full h-auto mb-0">
                      {personDetails.aliases.length > 0 &&
                        personDetails.aliases.map((item, index) => (
                          <div
                            key={index}
                            className="bg-blue-300 py-2 px-4 rounded-xl"
                          >
                            <p className="text-xs text-blue-600 text-center font-bold w-full h-auto">
                              {item}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-4 w-full h-auto mb-4">
                    <p className="text-sm text-white font-bold w-auto h-auto">
                      Known Languages
                    </p>
                    <div className="flex flex-row justify-start items-center gap-4 w-full h-auto mb-0">
                      {personDetails.languages.length > 0 &&
                        personDetails.languages.map((item, index) => (
                          <div
                            key={index}
                            className="bg-blue-300 py-2 px-4 rounded-xl"
                          >
                            <p className="text-xs text-blue-600 text-center font-bold w-full h-auto">
                              {item}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-4 w-full h-auto mb-0">
                <div className="flex flex-row justify-start items-center gap-4 w-full h-auto mb-4">
                  <div className="flex flex-col justify-start items-start gap-1 w-full h-auto px-4">
                    <p className="text-lg text-blue-400 font-bold w-auto h-auto">
                      Date of Birth
                    </p>

                    <p className="py-2 px-4 rounded-xl text-sm text-white text-start font-medium w-full h-auto [&:p]:mb-2">
                      {personDetails.dates_of_birth_used.length > 0
                        ? personDetails.dates_of_birth_used[0]
                        : "Unknown"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-1 w-full h-auto px-4">
                    <p className="text-lg text-blue-400 font-bold w-auto h-auto">
                      Gender
                    </p>

                    <p className="py-2 px-4 rounded-xl text-sm text-white text-start font-medium w-full h-auto [&:p]:mb-2">
                      {personDetails.sex}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-1 w-full h-auto px-4">
                    <p className="text-lg text-blue-400 font-bold w-auto h-auto">
                      FBI Classification
                    </p>

                    <p className="py-2 px-4 rounded-xl text-sm text-white text-start font-medium w-full h-auto [&:p]:mb-2">
                      {personDetails.subjects[0]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-4 w-full h-auto mb-0">
                <div className="flex flex-col justify-start items-start gap-4 w-full h-auto mb-4 px-4 overflow-y-auto">
                  <p className="text-lg text-blue-400 font-bold w-auto h-auto">
                    Description
                  </p>

                  {personDetails.caution !== "--" && (
                    <div
                      className="py-2 px-4 rounded-xl text-sm text-white text-start font-medium w-full h-auto [&:p]:mb-2"
                      dangerouslySetInnerHTML={{
                        __html: personDetails.caution,
                      }}
                    />
                  )}

                  {personDetails.details !== "--" && (
                    <div
                      className="py-2 px-4 rounded-xl text-sm text-white text-start font-medium w-full h-auto [&:p]:mb-2"
                      dangerouslySetInnerHTML={{
                        __html: personDetails.details,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
