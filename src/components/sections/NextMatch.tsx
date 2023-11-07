import { List } from "@raycast/api";
import { Category } from "@src/components/section";

const NextMatch = () => {
  return (
    <List.Section title={Category.NextMatch}>
      <List.Item title="Arsenal vs Sevilla" />
    </List.Section>
  );
};

export default NextMatch;
