import useSportMonksClient from "./useSportMonksClient";

type Participant = {
  name: string;
  img_path: string;
};

type Form = {
  fixture: {
    name: string;
    result_info: string;
  };
  form: "W" | "D" | "L";
};

type SportMonksStandingResponse = {
  position: number;
  points: number;
  form: Form[];
  participant: Participant;
};

const useFetchStandings = (seasonId: string) => {
  const { data, isLoading, revalidate } = useSportMonksClient({
    method: "get",
    path: `/standings/seasons/${seasonId}?include=form.fixture;participant`,
  });

  const response: SportMonksStandingResponse[] = data?.data;

  const finalData =
    response?.map(({ participant, ...rest }) => {
      return {
        name: participant.name,
        img_path: participant.img_path,
        position: rest.position,
        points: rest.points,
        played: rest.form.length,
        wins: rest.form.filter(({ form }) => form === "W").length,
        losses: rest.form.filter(({ form }) => form === "L").length,
        draws: rest.form.filter(({ form }) => form === "D").length,
      };
    }) ?? [];

  return { data: finalData, isLoading, revalidate };
};

export default useFetchStandings;
