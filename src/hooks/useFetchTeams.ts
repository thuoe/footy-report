import { useSportMonksClient } from "@src/hooks";
import { Team } from "@src/types";
import { computeSelectFields } from "@src/utils";

const MAX_RESULTS_PER_PAGE = 10;

type SelectFields = {
  image_path?: boolean;
};

const useFetchTeams = (name: string, selectFields: SelectFields) => {
  const selectedFields = computeSelectFields(selectFields);
  const { data, isLoading, revalidate } = useSportMonksClient({
    method: "get",
    path: `/teams/search/${name}?per_page=${MAX_RESULTS_PER_PAGE}&select=name,${selectedFields}&include=players.player.position;players.player.country`,
    execute: name.length !== 0,
  });
  const teams: Team[] =
    data?.data?.map((team) => {
      return {
        id: team.id,
        name: team.name,
        image_path: team.image_path,
        players: team.players.map(({ player, ...rest }) => {
          return {
            id: rest.id,
            jersey_number: rest.jersey_number,
            name: player.display_name,
            date_of_birth: player.date_of_birth,
            image_path: player.image_path,
            position: player.position?.name,
            country: {
              name: player.country.name,
              image_path: player.country.image_path,
            },
          };
        }),
      };
    }) ?? [];
  return { data: teams, isLoading, revalidate };
};

export default useFetchTeams;
