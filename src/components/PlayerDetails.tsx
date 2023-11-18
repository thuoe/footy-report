import { Detail } from "@raycast/api";
import { Player } from "@src/types";

const PlayerDetails = ({
  player,
  team,
}: {
  player: Player;
  team: { name: string; image_path: string };
}) => {
  const markdown = `
  ![](${player.image_path})
  `;
  return (
    <Detail
      markdown={markdown}
      navigationTitle={`${player.name}`}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Name" text={`${player.name}`} />
          <Detail.Metadata.Label
            title="Country"
            text={`${player.country.name}`}
            icon={`${player.country.image_path}`}
          />
          <Detail.Metadata.Label
            title="Date of Birth"
            text={`${player.date_of_birth}`}
          />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label
            title="Club Team"
            icon={`${team.image_path}`}
            text={`${team.name}`}
          />
          <Detail.Metadata.TagList title="Shirt Number">
            <Detail.Metadata.TagList.Item
              text={`${player.jersey_number ?? "N/A"}`}
              color={"#B55ABE"}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.TagList title="Postion">
            <Detail.Metadata.TagList.Item
              text={`${player.position}`}
              color={"#EED535"}
            />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
};

export default PlayerDetails;
