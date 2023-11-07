import { List, Icon, Color } from "@raycast/api";
import { Category } from "@src/components/section";

const NextFixtures = () => {
  return (
    <List.Section title={Category.Fixtures}>
      <List.Item
        icon={Icon.Goal}
        title="West Ham United vs Arsenal"
        accessories={[
          { tag: { value: "Away", color: Color.Magenta } },
          { tag: { value: `EFL Cup`, color: Color.PrimaryText } },
          { text: { value: `Today 7:30pm`, color: Color.SecondaryText } },
        ]}
      />
      <List.Item
        icon={Icon.Goal}
        title="Newcastle vs Arsenal"
        accessories={[
          { tag: { value: "Away", color: Color.Magenta } },
          { tag: { value: `Premier League`, color: Color.PrimaryText } },
          { text: { value: `Today 7:30pm`, color: Color.SecondaryText } },
        ]}
      />
      <List.Item
        icon={Icon.Goal}
        title="Arsenal vs Sevilla"
        accessories={[
          { tag: { value: "Home", color: Color.Yellow } },
          { tag: { value: `Champions League`, color: Color.PrimaryText } },
          { text: { value: `Today 7:30pm`, color: Color.SecondaryText } },
        ]}
      />
    </List.Section>
  );
};

export default NextFixtures;
