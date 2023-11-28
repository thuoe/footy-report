import { computeSelectFields } from "@src/utils";
import useSportMonksClient from "./useSportMonksClient";
import { subDays, format, addDays } from "date-fns";
import { Fixture, Result } from "@src/types";

type SelectFields = {
  result_info: boolean;
  starting_at: boolean;
};

const computeScore =
  (participant) =>
  (goals, { score, description }) => {
    if (score.participant === participant && description === "CURRENT") {
      return goals + score.goals;
    }
    return goals;
  };

const useFetchFixtures = (teamId: string, selectFields: SelectFields) => {
  const selectedFields = computeSelectFields(selectFields);
  const startDate = format(subDays(new Date(), 30), "y-MM-ii");
  const endDate = format(addDays(new Date(), 30), "y-MM-ii");
  const { data, isLoading, revalidate } = useSportMonksClient({
    method: "get",
    path: `/fixtures/between/${startDate}/${endDate}/${teamId}?include=league;venue;participants;tvStations.tvStation;scores&select=name,${selectedFields}`,
  });
  const fixtures: Fixture[] = data?.data
    ?.map(({ league, participants, scores, tvstations, ...fixtureData }) => {
      const [host, away] = participants;
      return {
        name: fixtureData.name,
        starting_at: new Date(fixtureData.starting_at),
        league: {
          name: league.name,
          image_path: league.image_path,
        },
        venue: fixtureData.venue.name,
        participants: {
          host: {
            name: host.name,
            image_path: host.image_path,
          },
          away: {
            name: away.name,
            image_path: away.image_path,
          },
        },
        result: fixtureData?.result_info?.includes("won")
          ? Result.Win
          : fixtureData?.result_info?.includes("draw")
          ? Result.Draw
          : fixtureData?.result_info?.includes("loss")
          ? Result.Loss
          : null,
        location: participants.find((p) => p.id === teamId).meta.location,
        score: {
          host_goals:
            scores.length > 0
              ? scores.reduce(computeScore("home"), 0)
              : undefined,
          away_goals:
            scores.length > 0
              ? scores.reduce(computeScore("away"), 0)
              : undefined,
        },
        tvstations: tvstations.map(({ tvstation }) => ({
          name: tvstation.name,
          url: tvstation.url,
        })),
      };
    })
    .reverse();
  return { data: fixtures, isLoading, revalidate };
};

export default useFetchFixtures;