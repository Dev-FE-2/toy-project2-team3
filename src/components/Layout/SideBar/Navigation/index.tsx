import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { fetchUserInfo } from '../../../../firebase';
import type { User } from '../../../../types/interface';

// 타입 정의
type BaseContainerProps = {
  isActive?: boolean;
  isHovered?: boolean;
};

const items = [
  { id: 0, icon: 'home', text: 'Pokemon ERP', link: '/userHome' },
  { id: 1, icon: 'account_circle', text: '나의 정보', link: '/editProfile' },
  { id: 2, icon: 'calendar_month', text: '나의 업무', link: '/schedule' },
  { id: 3, icon: 'schedule', text: '나의 근태', link: '/attendance' },
  { id: 4, icon: 'paid', text: '나의 급여', hasSubItems: true },
];

// Navigation 컴포넌트
const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedSalary, setExpandedSalary] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = fetchUserInfo((info) => {
      setUserInfo(info);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedIndex = localStorage.getItem('activeIndex');
    const storedExpandedSalary =
      localStorage.getItem('expandedSalary') === 'true';
    setActiveIndex(Number(storedIndex));

    if (location.pathname === '/editProfile') {
      setActiveIndex(1);
    }

    setExpandedSalary(storedExpandedSalary);
  }, [location.pathname]);

  useEffect(() => {
    if (activeIndex !== null) {
      localStorage.setItem('activeIndex', String(activeIndex));
    }
    localStorage.setItem('expandedSalary', String(expandedSalary));
  }, [activeIndex, expandedSalary]);

  const handleSalaryClick = () => {
    setExpandedSalary((prev) => !prev);
    setActiveIndex((prev) => (prev === 4 ? null : 4));
  };

  const handleItemClick = (id: number) => {
    if (id === 100 || id === 101) {
      setActiveIndex(id);
    } else {
      setActiveIndex(id);
      setExpandedSalary(false);
    }
  };

  return (
    <>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <StyledLink
            to={item.link}
            onClick={
              item.id === 4 ? handleSalaryClick : () => handleItemClick(item.id)
            }
          >
            <StyledMainContainer
              isActive={
                activeIndex === item.id ||
                (item.id === 4 && (activeIndex === 100 || activeIndex === 101))
              }
              isHovered={hoveredIndex === item.id}
              onMouseEnter={() => setHoveredIndex(item.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="material-symbols-outlined">{item.icon}</div>
              {item.text}
              {item.id === 4 && expandedSalary && (
                <div className="material-symbols-outlined arrow">
                  arrow_drop_down
                </div>
              )}
            </StyledMainContainer>
          </StyledLink>
          {item.id === 4 && expandedSalary && (
            <StyledRowContainer>
              <StyledLink
                to="/salaryDetails"
                onClick={() => handleItemClick(100)}
              >
                <StyledSubContainer
                  isActive={activeIndex === 100}
                  isHovered={hoveredIndex === 100}
                  onMouseEnter={() => setHoveredIndex(100)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  급여 내역
                </StyledSubContainer>
              </StyledLink>
              <StyledLink
                to="/salaryCorrection"
                onClick={() => handleItemClick(101)}
              >
                <StyledSubContainer
                  isActive={activeIndex === 101}
                  isHovered={hoveredIndex === 101}
                  onMouseEnter={() => setHoveredIndex(101)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  급여 정정 신청
                </StyledSubContainer>
              </StyledLink>
            </StyledRowContainer>
          )}
        </React.Fragment>
      ))}

      {userInfo?.isAdmin && (
        <>
          <StyledLink to="/employeeList" onClick={() => handleItemClick(5)}>
            <StyledMainContainer
              isActive={activeIndex === 5}
              isHovered={hoveredIndex === 5}
              onMouseEnter={() => setHoveredIndex(5)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="material-symbols-outlined">
                supervisor_account
              </div>
              직원 관리
            </StyledMainContainer>
          </StyledLink>
          <StyledLink to="/salaryRequest" onClick={() => handleItemClick(6)}>
            <StyledMainContainer
              isActive={activeIndex === 6}
              isHovered={hoveredIndex === 6}
              onMouseEnter={() => setHoveredIndex(6)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="material-symbols-outlined">check_box</div>
              급여 정정 신청 관리
            </StyledMainContainer>
          </StyledLink>
        </>
      )}
    </>
  );
};

// 공통 CSS 스타일 정의
const baseContainerStyles = css<BaseContainerProps>`
  display: flex;
  align-items: center;
  font-weight: bold;
  text-align: left;
  height: 6vh;
  margin-bottom: 1.5vh;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 8px;
  color: ${(props) => (props.isActive ? '#fff' : '#4A493F')};
  background-color: ${(props) =>
    props.isActive ? '#63A002' : props.isHovered ? '#E5F4DD' : '#fff'};
`;

const StyledMainContainer = styled.div<BaseContainerProps>`
  ${baseContainerStyles}
  font-size: 20px;

  .material-symbols-outlined {
    margin-right: 1vh;
    font-size: 24px; /* 아이콘 크기 조절 */
    filter: ${(props) => (props.isActive ? 'brightness(0) invert(1)' : 'none')};
  }

  .arrow {
    margin-left: auto;
    display: ${(props) => (props.isActive ? 'block' : 'none')};
  }
`;

const StyledSubContainer = styled.div<BaseContainerProps>`
  ${baseContainerStyles}
  width: 13vw;
  padding-left: 1vw;
  font-size: 14px;
  height: 4vh;
  margin-bottom: 0.5vh;
`;

const StyledRowContainer = styled.div`
  border-left: 1.5px solid #63a002;
  margin-left: 1vh;
  padding-left: 0.5vw;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Navigation;
