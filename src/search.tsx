import { Action, Icon, ActionPanel, List, LocalStorage, Color } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useEffect, useState } from "react";

export default function Command() {
  const { data, isLoading, revalidate } = useCachedPromise(async () => {
    return LocalStorage.getItem<string>("team-searches");
  });
  const [searchText, setSearchText] = useState("");
  const [team, selectTeam] = useState("");

  const previousSearches: string[] = data ? JSON.parse(data) : [];

  useEffect(() => {
    const setList = async (list: string[]) => {
      LocalStorage.setItem("team-searches", JSON.stringify(list));
      revalidate()
    };
    const updateList = async () => {
      const finalList = [...previousSearches, searchText];
      await setList(finalList);
    };
    if (searchText.length > 3 && !isLoading && previousSearches.includes(searchText.trim()) === false) {
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
                            console.debug("Action triggered!!");
                            const newList = previousSearches.filter((search) => search !== item);
                            LocalStorage.setItem("team-searches", JSON.stringify(newList));
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
    <List>
      <List.Section title="Current Match"></List.Section>
      <List.Section title="Upcoming Fixtures"></List.Section>
      <List.Section title="Squad"></List.Section>
    </List>
  );
}
