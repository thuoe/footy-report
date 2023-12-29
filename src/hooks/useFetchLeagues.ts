import useSportMonksClient from "./useSportMonksClient";

type SportMonksSeason = {
  id: string;
  name: string;
  is_active: boolean;
};

type SportMonksLeagueRespsonse = {
  id: string;
  name: string;
  image_path: string;
  seasons: SportMonksSeason[];
};

const useFetchLeagues = (name: string) => {
  const { data, isLoading, revalidate } = useSportMonksClient({
    method: "get",
    path: `/leagues/search/${name}?include=seasons`,
    execute: name.length > 0,
  });
  const response: SportMonksLeagueRespsonse[] = data?.data;
  const finalData =
    response?.map(({ seasons, ...league }) => ({
      id: league.id,
      name: league.name,
      image_path: league.image_path,
      season: seasons.find((season) => season.is_active),
    })) ?? [];
  return { data: finalData, isLoading, revalidate };
};

export default useFetchLeagues;
