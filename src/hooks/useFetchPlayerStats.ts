import useSportMonksClient from "./useSportMonksClient";

enum EventType {
  GOALS = 52,
  ASSISTS = 79,
  APPS = 321,
}

const isEvent =
  (event: EventType) =>
  ({ type_id }: { type_id: number }) => {
    return type_id === event;
  };

const formatEvents = () => {
  const values: number[] = [];
  Object.keys(EventType)
    .filter((v) => !isNaN(Number(v)))
    .forEach((value) => {
      values.push(Number(value));
    });
  return values.join(",");
};

const useFetchPlayerStats = ({
  id,
  teamId,
}: {
  id: string;
  teamId: string;
}) => {
  const { data, isLoading, revalidate } = useSportMonksClient({
    method: "get",
    path: `/players/${id}?include=statistics.season;statistics.details&filters=playerStatisticDetailTypes:${formatEvents()};team=${teamId}`,
  });

  const stats = data?.data?.statistics.map(({ season, details }) => {
    const { name } = season;
    const goals = details.find(isEvent(EventType.GOALS))?.value?.total ?? 0;
    const assists = details.find(isEvent(EventType.ASSISTS))?.value?.total ?? 0;
    const appearances =
      details.find(isEvent(EventType.APPS))?.value?.total ?? 0;
    return [name, goals, assists, appearances];
  });

  return { data: stats, isLoading, revalidate };
};

export default useFetchPlayerStats;
