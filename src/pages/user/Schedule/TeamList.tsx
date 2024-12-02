import styled from "styled-components";

const StyledUl = styled.ul`
  list-style-type: none;
  font-size: 1.25rem;
  font-weight: 700;
  padding-left: 1rem;
  cursor: pointer;

  li {
    font-size: 1rem;
    font-weight: 400;
    padding-left: 1rem;
    margin: 0.5rem 0;
  }
`;

interface Team {
  name: string;
  members: string[];
}

const TeamList = ({ name, members }: Team) => {
  return (
    <StyledUl>
      {name}
      {members.map((member) => (
        <li key={member}>{member}</li>
      ))}
    </StyledUl>
  );
};

export default TeamList;
