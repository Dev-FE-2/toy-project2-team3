import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../../../state/store';
import { URL } from '../../../../constant';
import { ITEMS_DATA } from './constant';
import type { NavigationProps } from './type';
import { S } from './style';

const items = ITEMS_DATA;
const {
  editProfile,
  salaryDetails,
  salaryCorrection,
  // employeeList,
  // salaryRequest,
} = URL;

const Navigation = ({ style }: NavigationProps) => {
  // const { userInfo } = useSelector((state: RootState) => state.user);
  const { padding } = style;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedSalary, setExpandedSalary] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedIndex = localStorage.getItem('activeIndex');
    const storedExpandedSalary =
      localStorage.getItem('expandedSalary') === 'true';
    setActiveIndex(Number(storedIndex));

    if (location.pathname === editProfile.link) {
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
    <S.Navigation padding={padding}>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <S.Link
            to={item.link ?? ''}
            onClick={
              item.id === 4 ? handleSalaryClick : () => handleItemClick(item.id)
            }
          >
            <S.MainNavItem
              isActive={
                activeIndex === item.id ||
                (item.id === 4 && (activeIndex === 100 || activeIndex === 101))
              }
              isHovered={hoveredIndex === item.id}
              onMouseEnter={() => setHoveredIndex(item.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.text}
              {item.id === 4 && expandedSalary && (
                <span className="material-symbols-outlined arrow">
                  arrow_drop_down
                </span>
              )}
            </S.MainNavItem>
          </S.Link>
          {item.id === 4 && expandedSalary && (
            <S.SubNavWrapper>
              <S.Link
                to={salaryDetails.link}
                onClick={() => handleItemClick(100)}
              >
                <S.SubNavItem
                  isActive={activeIndex === 100}
                  isHovered={hoveredIndex === 100}
                  onMouseEnter={() => setHoveredIndex(100)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {salaryDetails.text}
                </S.SubNavItem>
              </S.Link>
              <S.Link
                to={salaryCorrection.link}
                onClick={() => handleItemClick(101)}
              >
                <S.SubNavItem
                  isActive={activeIndex === 101}
                  isHovered={hoveredIndex === 101}
                  onMouseEnter={() => setHoveredIndex(101)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {salaryCorrection.text}
                </S.SubNavItem>
              </S.Link>
            </S.SubNavWrapper>
          )}
        </React.Fragment>
      ))}

      {/**TODO - 어드민 기능 구현 후 사용
       *  
        {userInfo?.isAdmin && (
        <>
          <S.Link to={employeeList.link} onClick={() => handleItemClick(5)}>
            <S.MainNavItem
              isActive={activeIndex === 5}
              isHovered={hoveredIndex === 5}
              onMouseEnter={() => setHoveredIndex(5)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="material-symbols-outlined">
                supervisor_account
              </span>
              {employeeList.text}
            </S.MainNavItem>
          </S.Link>
          <S.Link to={salaryRequest.link} onClick={() => handleItemClick(6)}>
            <S.MainNavItem
              isActive={activeIndex === 6}
              isHovered={hoveredIndex === 6}
              onMouseEnter={() => setHoveredIndex(6)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="material-symbols-outlined">check_box</span>
              {salaryRequest.text}
            </S.MainNavItem>
          </S.Link>
        </>
      )} */}
    </S.Navigation>
  );
};

export default Navigation;
