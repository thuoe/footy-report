import NextFixtures from "@src/components/sections/Fixtures";
import NextMatch from "@src/components/sections/NextMatch";
import Squad from "@src/components/sections/Squad";

export enum Category {
  All = "All",
  NextMatch = "Next Match",
  Fixtures = "Fixtures",
  Squad = "Squad",
}

type TeamSectionProps = {
  category: Category;
};

const TeamSections = ({ category }: TeamSectionProps) => {
  return (
    <>
      {category === Category.All && (
        <>
          <NextMatch />
          <NextFixtures />
          <Squad />
        </>
      )}
      {category == Category.NextMatch && <NextMatch />}
      {category === Category.Fixtures && <NextFixtures />}
      {category === Category.Squad && <Squad />}
    </>
  );
};

export default TeamSections;
