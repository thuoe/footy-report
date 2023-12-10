import useSportMonksClient from "./useSportMonksClient";

const useFetchPlayerStats = ({
  id,
  teamId,
}: {
  id: string;
  teamId: string;
}) => {
  const { data, isLoading, revalidate } = useSportMonksClient({
    method: "get",
    path: `/players/${id}?include=statistics.season;statistics.details&filters=playerStatisticDetailTypes:52,79,321;team=${teamId}`,
  });

  const stats = data?.data?.statistics.map(({ season, details }) => {
    const { name } = season;
    const goals =
      details.find(({ type_id }) => type_id === 52)?.value?.total ?? 0;
    const assists =
      details.find(({ type_id }) => type_id === 79)?.value?.total ?? 0;
    const appearances =
      details.find(({ type_id }) => type_id === 321)?.value?.total ?? 0;
    return [name, goals, assists, appearances];
  });

  return { data: stats, isLoading, revalidate };
};

export default useFetchPlayerStats;
