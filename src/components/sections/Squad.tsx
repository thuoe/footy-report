import { List, Color, Image } from "@raycast/api";
import { Category } from "@src/components/section";

const Squad = () => {
  return (
    <List.Section title={Category.Squad}>
      <List.Item
        icon={{
          source:
            "https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/Headshot_White_1510x850_0.jpg?auto=webp&itok=iUyWTT7l",
          mask: Image.Mask.Circle,
        }}
        title="Ben White"
        accessories={[
          { tag: { value: `4`, color: Color.Orange } },
          { text: { value: `Defender`, color: Color.SecondaryText } },
        ]}
      />
      <List.Item
        icon={{
          source:
            "https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/Headshot_Ramsdale_1510x850_0.jpg?auto=webp&itok=w6EQqPOI",
          mask: Image.Mask.Circle,
        }}
        title="Aaron Ramsdale"
        accessories={[
          { tag: { value: `1`, color: Color.Orange } },
          { text: { value: `Goalkeeper`, color: Color.SecondaryText } },
        ]}
      />
      <List.Item
        icon={{
          source:
            "https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/MicrosoftTeams-image%20%2826%29.png?auto=webp&itok=K8hmFn_d",
          mask: Image.Mask.Circle,
        }}
        title="Declan Rice"
        accessories={[
          { tag: { value: `41`, color: Color.Orange } },
          { text: { value: `Midfielder`, color: Color.SecondaryText } },
        ]}
      />
    </List.Section>
  );
};

export default Squad;
