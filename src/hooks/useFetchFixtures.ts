import { computeSelectFields } from "@src/utils";
import useSportMonksClient from "./useSportMonksClient";
import { subDays, format } from "date-fns";
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
  const startDate = format(subDays(new Date(), 28), "y-M-d");
  const endDate = format(new Date(), "y-M-d");
  const { data, isLoading, revalidate } = useSportMonksClient({
    method: "get",
    path: `/fixtures/between/${startDate}/${endDate}/${teamId}?include=league;venue;participants;scores&select=name,${selectedFields}`,
  });
  const fixtures: Fixture[] = data?.data
    ?.map(({ league, participants, scores, ...fixtureData }) => {
      const [host, away] = participants;
      return {
        name: fixtureData.name,
        starting_at: fixtureData.starting_at,
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
          host_goals: scores.reduce(computeScore("home"), 0),
          away_goals: scores.reduce(computeScore("away"), 0),
        },
      };
    })
    .reverse();
  return { data: fixtures, isLoading, revalidate };
};

export default useFetchFixtures;
