import { Color, Icon, List } from "@raycast/api";
import { useFetchStandings } from "@src/hooks";

const Standings = ({ seasonId }: { seasonId: string }) => {
  const { data: standings, isLoading } = useFetchStandings(seasonId);
  return (
    <List isLoading={isLoading}>
      {standings.length === 0 ? (
        <List.EmptyView title="No League Standings Found!" />
      ) : (
        standings.map((standing) => {
          return (
            <List.Item
              title={standing.position.toString()}
              icon={{ source: standing.img_path }}
              key={standing.name}
              subtitle={standing.name}
              keywords={[standing.name]}
              accessories={[
                {
                  text: {
                    value: `PL: ${standing.played}`,
                    color: Color.Orange,
                  },
                },
                {
                  text: { value: `W: ${standing.wins}`, color: Color.Green },
                },
                {
                  text: {
                    value: `D: ${standing.draws}`,
                    color: Color.SecondaryText,
                  },
                },
                {
                  text: { value: `L: ${standing.losses}`, color: Color.Red },
                },
                {
                  text: { value: `PTS: ${standing.points}`, color: Color.Blue },
                },
                ...standing.recentForm.map((form) => {
                  const tintColor =
                    form.result === "W"
                      ? Color.Green
                      : form.result === "D"
                      ? Color.SecondaryText
                      : Color.Red;
                  return {
                    icon: { source: Icon.CircleFilled, tintColor },
                    tooltip: form.name,
                  };
                }),
              ]}
            />
          );
        })
      )}
    </List>
  );
};

export default Standings;
