import { List, Color, Image, ActionPanel, Action } from "@raycast/api";
import { Category, Team } from "@src/types";
import PlayerDetails from "@src/components/PlayerDetails";

const Squad = ({ team, limit }: { team: Team; limit?: number }) => {
  const limitedPlayers = team.players.slice(0, limit || team.players.length);
  return (
    <List.Section title={Category.Squad} subtitle={`${limitedPlayers.length}`}>
      {limitedPlayers.map((player) => {
        return (
          <List.Item
            icon={{
              source: player?.image_path,
              mask: Image.Mask.Circle,
            }}
            title={player.name}
            key={player.id}
            subtitle={team.name}
            accessories={[
              {
                icon: {
                  mask: Image.Mask.RoundedRectangle,
                  source: player.country.image_path,
                },
              },
              {
                tag: {
                  value: player?.jersey_number?.toString() ?? "N/A",
                  color: Color.Orange,
                },
              },
              { text: { value: player.position, color: Color.SecondaryText } },
            ]}
            actions={
              <ActionPanel title="Player Actions">
                <Action.Push
                  title="View Player Details"
                  target={
                    <PlayerDetails
                      team={{ name: team.name, image_path: team.image_path }}
                      player={player}
                    />
                  }
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List.Section>
  );
};

export default Squad;
