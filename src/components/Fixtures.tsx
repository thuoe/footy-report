import { List, Icon, Color, Image } from "@raycast/api";
import { Category, Fixture, Location, Result } from "@src/types";

const NextFixtures = ({ fixtures }: { fixtures?: Fixture[] }) => {
  return (
    <List.Section
      title={`Upcoming ${Category.Fixtures}`}
      subtitle={`${fixtures?.length}`}
    >
      {fixtures?.map((fixture) => {
        const resultIcon =
          fixture.result === Result.Win
            ? { tintColor: Color.Green, source: Icon.CheckCircle }
            : fixture.result === Result.Draw
            ? { tintColor: Color.SecondaryText, source: Icon.MinusCircle }
            : fixture.result === Result.Loss
            ? { tintColor: Color.Red, source: Icon.XMarkCircle }
            : Icon.Calendar;
        const resultPrefix = fixture.score
          ? `${fixture.score.host_goals} - ${fixture.score.away_goals} |`
          : "";
        return (
          <List.Item
            icon={resultIcon}
            title={`${resultPrefix} ${fixture.name}`}
            key={fixture.name}
            subtitle={`${fixture.venue}`}
            accessories={[
              {
                tag: {
                  value: fixture.league.name,
                  color: Color.SecondaryText,
                },
                icon: {
                  mask: Image.Mask.Circle,
                  source: fixture.league.image_path,
                },
              },
              {
                tag: {
                  value: fixture.location === Location.Home ? "Home" : "Away",
                  color: Color.Orange,
                },
              },
              {
                text: {
                  value: fixture.starting_at,
                  color: Color.SecondaryText,
                },
              },
            ]}
          />
        );
      })}
    </List.Section>
  );
};

export default NextFixtures;
