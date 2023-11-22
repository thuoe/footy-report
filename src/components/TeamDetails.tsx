import Fixtures from "@src/components/Fixtures";
import Squad from "@src/components/Squad";
import { List } from "@raycast/api";
import { Category, Team } from "@src/types";
import { useState, ComponentProps } from "react";
import { useFetchFixtures } from "@src/hooks";

const TeamDetails = ({ team }: { team: Team }) => {
  const [category, setCategory] = useState<Category>(Category.All);
  const { data, isLoading } = useFetchFixtures(team.id, {
    result_info: true,
    starting_at: true,
  });

  const playedFixtureIndex = data?.findIndex((fixture) => fixture.result);
  const upcomingFixtures = data?.slice(0, playedFixtureIndex);
  const prevFixtures = data?.slice(playedFixtureIndex + 1);
  const upcomingProps: ComponentProps<typeof Fixtures> = {
    title: "Upcoming Matches",
    fixtures: upcomingFixtures,
  };
  const prevProps: ComponentProps<typeof Fixtures> = {
    title: "Previous Fixtures",
    fixtures: prevFixtures,
  };

  return (
    <List
      throttle
      isLoading={isLoading}
      navigationTitle={`${team.name}`}
      searchBarPlaceholder={`Search within ${team.name}`}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Category"
          onChange={(newValue) => {
            setCategory(newValue as Category);
          }}
          defaultValue={Category.All}
        >
          {Object.values(Category).map((category) => {
            return (
              <List.Dropdown.Item
                title={category}
                key={category}
                value={category}
              />
            );
          })}
        </List.Dropdown>
      }
    >
      <>
        {category === Category.All && (
          <>
            <Fixtures {...upcomingProps} limit={6} />
            <Fixtures {...prevProps} limit={6} />
            <Squad team={team} limit={6} />
          </>
        )}
        {category === Category.UpcomingMatches && (
          <Fixtures {...upcomingProps} limit={6} />
        )}
        {category === Category.PrevFixtures && (
          <Fixtures {...prevProps} limit={6} />
        )}
        {category === Category.Squad && <Squad team={team} limit={6} />}
      </>
    </List>
  );
};

export default TeamDetails;
