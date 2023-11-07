import { Action, Icon, ActionPanel, List, LocalStorage } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useEffect, useState } from "react";
import TeamSections, { Category } from "@src/components/section";

type TeamListDropdownProps = {
  categories: `${Category}`[];
  onChange: (newValue: string) => void;
};

const TeamListDropdown = ({ categories, onChange }: TeamListDropdownProps) => {
  return (
    <List.Dropdown
      storeValue
      tooltip="Select Team Category"
      onChange={onChange}
      defaultValue="all"
    >
      {categories.map((category) => {
        return (
          <List.Dropdown.Item
            title={category}
            key={category}
            value={category}
          />
        );
      })}
    </List.Dropdown>
  );
};

export default () => {
  const { data, isLoading, revalidate } = useCachedPromise(async () => {
    return LocalStorage.getItem<string>("team-searches");
  });
  const [searchText, setSearchText] = useState("");
  const [team, selectTeam] = useState("");
  const [category, setCategory] = useState<Category>(Category.All);

  const previousSearches: string[] = data ? JSON.parse(data) : [];

  useEffect(() => {
    const setList = async (list: string[]) => {
      LocalStorage.setItem("team-searches", JSON.stringify(list));
      revalidate();
    };
    const updateList = async () => {
      const finalList = [...previousSearches, searchText];
      await setList(finalList);
    };
    if (
      searchText.length > 3 &&
      !isLoading &&
      previousSearches.includes(searchText.trim()) === false
    ) {
      updateList().catch(console.error);
    }
  }, [searchText, isLoading]);

  if (!team) {
    return (
      <>
        <List
          throttle
          isLoading={isLoading}
          navigationTitle="Search"
          searchBarPlaceholder="Enter Team"
          onSearchTextChange={setSearchText}
        >
          {previousSearches.length === 0 ? (
            <List.EmptyView title="What team would you like to search for?" />
          ) : (
            <List.Section title="Recent team searches">
              {previousSearches.map((item) => {
                return (
                  <List.Item
                    title={item}
                    key={item}
                    actions={
                      <ActionPanel title="Team actions">
                        <Action
                          title="Select Team"
                          icon={Icon.ArrowRight}
                          onAction={() => {
                            selectTeam(item);
                          }}
                        />
                        <Action
                          title="Clear Search"
                          icon={Icon.Trash}
                          onAction={async () => {
                            const newList = previousSearches.filter(
                              (search) => search !== item,
                            );
                            LocalStorage.setItem(
                              "team-searches",
                              JSON.stringify(newList),
                            );
                            revalidate();
                          }}
                        />
                      </ActionPanel>
                    }
                  />
                );
              })}
            </List.Section>
          )}
        </List>
      </>
    );
  }

  return (
    <List
      searchBarAccessory={
        <TeamListDropdown
          categories={Object.values(Category)}
          onChange={(newValue) => {
            setCategory(newValue as Category);
          }}
        />
      }
    >
      <TeamSections category={category} />
    </List>
  );
};
