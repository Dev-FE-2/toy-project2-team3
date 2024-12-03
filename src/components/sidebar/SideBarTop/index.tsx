import styled from 'styled-components';
import PokemonLogo from '../../../assets/PokemonLogo.png'

const StyledSideBarTop = styled.div`
    display: flex; 
    align-items: center; 
    color: #63A002; 
    font-weight: 700;
    font-size: 24px; 
    text-align: left; 
    height: 10vh;
    margin-bottom: 3vh;
    border-bottom: 1px solid #63A002; 

    img {
        width: 2.08vw; 
        height: auto; /* 비율 유지 */
        margin-right: 2vh;
    }
`;

const SideBarTop = () => {
  return (
    <StyledSideBarTop>
      <img src= { PokemonLogo } alt="Pokemon Logo" />
      Pokemon ERP
    </StyledSideBarTop>
  );
}

export default SideBarTop;
