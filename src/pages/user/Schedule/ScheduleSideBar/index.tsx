import styled from "styled-components";
import TeamList from "../core/TeamList";

const StyledWrapper = styled.div`
  border: 1px solid black;
  border-radius: .5rem 0 0 .5rem;
  width: 10rem;
  height: 80dvh;
  padding: 1rem 0;
  box-sizing: border-box;
`;

const StyledContent = styled.div`
  padding-left: .5rem;
  width: 9rem;
  overflow-y: auto;
  max-height: calc(80dvh - 2rem);
`;

const teams = [
  {
    name: "응급 1팀",
    members: ["김하나", "김둘둘", "김셋셋", "김넷넷", "김다섯", "김여섯"],
  },
  {
    name: "응급 2팀",
    members: ["김하나", "김둘둘", "김셋셋", "김넷넷", "김다섯", "김여섯"],
  },
  {
    name: "응급 3팀",
    members: ["김하나", "김둘둘", "김셋셋", "김넷넷", "김다섯", "김여섯"],
  },
  {
    name: "응급 4팀",
    members: ["김하나", "김둘둘", "김셋셋", "김넷넷", "김다섯", "김여섯"],
  },
  {
    name: "응급 5팀",
    members: ["김하나", "김둘둘", "김셋셋", "김넷넷", "김다섯", "김여섯"],
  },
  {
    name: "응급 6팀",
    members: ["김하나", "김둘둘", "김셋셋", "김넷넷", "김다섯", "김여섯"],
  },
  {
    name: "응급 7팀",
    members: ["김하나", "김둘둘", "김셋셋", "김넷넷", "김다섯", "김여섯"],
  },
];

const ScheduleSideBar = () => {
  return (
    <StyledWrapper>
      <StyledContent>
        {teams.map((team) => (
          <TeamList key={team.name} name={team.name} members={team.members} />
        ))}
      </StyledContent>
    </StyledWrapper>
  );
};

export default ScheduleSideBar;
