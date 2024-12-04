import styled from 'styled-components';
import PokemonLogo from '../../../../../public/PokemonLogo.png';

const BrandLogo = () => {
  return (
    <StyledSideBarTop>
      <img src={PokemonLogo} alt="Pokemon Logo" />
      Pokemon ERP
    </StyledSideBarTop>
  );
};

const StyledSideBarTop = styled.div`
  display: flex;
  align-items: center;
  color: #63a002;
  font-weight: 700;
  font-size: 24px;
  text-align: left;
  height: 10vh;
  margin-bottom: 3vh;
  border-bottom: 1px solid #63a002;

  img {
    width: 2.08vw;
    height: auto; /* 비율 유지 */
    margin-right: 2vh;
  }
`;

export default BrandLogo;
