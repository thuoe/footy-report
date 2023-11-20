import PrevFixtures from "@src/components/Fixtures";
import NextMatch from "@src/components/NextMatch";
import Squad from "@src/components/Squad";
import { List } from "@raycast/api";
import { Category, Team } from "@src/types";
import { useState } from "react";
import { useFetchFixtures } from "@src/hooks";

const TeamDetails = ({ team }: { team: Team }) => {
  const [category, setCategory] = useState<Category>(Category.All);
  const { data, isLoading } = useFetchFixtures(team.id, {
    result_info: true,
    starting_at: true,
  });
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
            <NextMatch />
            <PrevFixtures fixtures={data} />
            <Squad team={team} limit={6} />
          </>
        )}
        {category === Category.NextMatch && <NextMatch />}
        {category === Category.Fixtures && <PrevFixtures fixtures={data} />}
        {category === Category.Squad && <Squad team={team} limit={6} />}
      </>
    </List>
  );
};

export default TeamDetails;
