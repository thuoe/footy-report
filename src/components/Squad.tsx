import { List, Color, Image } from "@raycast/api";
import { Category } from "@src/types";

const Squad = () => {
  return (
    <List.Section title={Category.Squad} subtitle="3">
      <List.Item
        icon={{
          source:
            "https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/Headshot_White_1510x850_0.jpg",
          mask: Image.Mask.Circle,
        }}
        title="Ben White"
        key="Ben White"
        subtitle="Arsenal"
        accessories={[
          {
            icon: {
              mask: Image.Mask.Circle,
              source:
                "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1600px-Flag_of_England.svg.png?20111003040319",
            },
          },
          {
            tag: {
              value: "4",
              color: Color.Orange,
            },
          },
          { text: { value: "Defender", color: Color.SecondaryText } },
        ]}
      />
      <List.Item
        icon={{
          source:
            "https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/MicrosoftTeams-image%20%2831%29_0.png?auto=webp&itok=zY0rjgVn",
          mask: Image.Mask.Circle,
        }}
        title="William Saliba"
        key="William Saliba"
        subtitle="Arsenal"
        accessories={[
          {
            icon: {
              mask: Image.Mask.RoundedRectangle,
              source:
                "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/2880px-Flag_of_France.svg.png",
            },
          },
          {
            tag: {
              value: "2",
              color: Color.Orange,
            },
          },
          { text: { value: "Defender", color: Color.SecondaryText } },
        ]}
      />
      <List.Item
        icon={{
          source:
            "https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/MicrosoftTeams-image%20%2827%29_0.png?auto=webp&itok=9GPY-bZ8",
          mask: Image.Mask.Circle,
        }}
        title="Jurrien Timber"
        key="Jurrien Timber"
        subtitle="Arsenal"
        accessories={[
          {
            icon: {
              mask: Image.Mask.Circle,
              source:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/2880px-Flag_of_the_Netherlands.svg.png",
            },
          },
          {
            tag: {
              value: "12",
              color: Color.Orange,
            },
          },
          { text: { value: "Defender", color: Color.SecondaryText } },
        ]}
      />
    </List.Section>
  );
};

export default Squad;
