import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

interface BaseContainerProps {
    isActive?: boolean;
    isHovered?: boolean;
}

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

    color: ${props => props.isActive ? '#fff' : '#4A493F'};
    background-color: ${props => props.isActive ? '#63A002' : props.isHovered ? '#E5F4DD' : '#fff'};
`;

const StyledMainContainer = styled.div<BaseContainerProps>`
    ${baseContainerStyles}
    font-size: 20px;
    
    img {
        width: 24px;
        height: auto;
        margin-right: 1vh;
    }
`;

const TempContainer = styled.div`
    border-left: 1.5px solid #63A002; 
    margin-left: 1vh;
    padding-left: 10px; // 왼쪽 선과 내용 사이의 간격
    display: flex; // 가로로 정렬
    flex-direction: column; // 세로로 쌓이게 설정
`;

const StyledSubContainer = styled.div<BaseContainerProps>`
    ${baseContainerStyles}
    padding-left: 1vw;
    font-size: 14px;
    height: 4vh;
    margin-bottom: 0.5vh;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const items = [
    { id: 0, src: '/assets/icons/home.png', alt: 'home', text: 'Pokemon ERP', link: '/userHome' },
    { id: 1, src: '/assets/icons/account_circle.png', alt: 'account_circle', text: '나의 정보', link: '/userInfo' },
    { id: 2, src: '/assets/icons/calendar_month.png', alt: 'calendar_month', text: '나의 업무', link: '/work' },
    { id: 3, src: '/assets/icons/schedule.png', alt: 'schedule', text: '나의 근태', link: '/attendance' },
    { id: 4, src: '/assets/icons/paid.png', alt: 'paid', text: '나의 급여', link: '/salary', hasSubItems: true },
    { id: 5, src: '', alt: 'admin', text: '관리자 페이지 사이드바', link: '/admin' },
    { id: 6, src: '/assets/icons/supervisor_account.png', alt: 'supervisor_account', text: '직원 관리', link: '/employeeList' },
    { id: 7, src: '/assets/icons/check_box.png', alt: 'check_box', text: '급여 정정 신청 관리', link: '/salaryRequest' },
];

const SideBarMiddle = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expandedSalary, setExpandedSalary] = useState(false);
    const location = useLocation();

    const handleSalaryClick = () => {
        setExpandedSalary(!expandedSalary);
        setActiveIndex(4);
    };

    return (
        <>
            {items.map(item => (
                <React.Fragment key={item.id}>
                    {item.hasSubItems && item.id === 4 ? (
                        <>
                            <StyledLink to={item.link} onClick={handleSalaryClick}>
                                <StyledMainContainer
                                    isActive={activeIndex === item.id}
                                    isHovered={hoveredIndex === item.id}
                                    onMouseEnter={() => setHoveredIndex(item.id)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {item.src && <img src={item.src} alt={item.alt} />}
                                    {item.text}
                                </StyledMainContainer>
                            </StyledLink>
                            {expandedSalary && (
                                <TempContainer>
                                    <StyledLink to="/salaryDetails" onClick={() => {
                                        setActiveIndex(100);
                                        setHoveredIndex(null);
                                    }}>
                                        <StyledSubContainer
                                            isActive={location.pathname === '/salaryDetails'}
                                            isHovered={hoveredIndex === 100}
                                            onMouseEnter={() => setHoveredIndex(100)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            급여 내역
                                        </StyledSubContainer>
                                    </StyledLink>
                                    <StyledLink to="/salaryCorrection" onClick={() => {
                                        setActiveIndex(101);
                                        setHoveredIndex(null);
                                    }}>
                                        <StyledSubContainer
                                            isActive={location.pathname === '/salaryCorrection'}
                                            isHovered={hoveredIndex === 101}
                                            onMouseEnter={() => setHoveredIndex(101)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            급여 정정 신청
                                        </StyledSubContainer>
                                    </StyledLink>
                                </TempContainer>
                            )}
                        </>
                    ) : (
                        <StyledLink to={item.link} onClick={() => setActiveIndex(item.id)}>
                            <StyledMainContainer
                                isActive={location.pathname === item.link}
                                isHovered={hoveredIndex === item.id}
                                onMouseEnter={() => setHoveredIndex(item.id)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {item.src && <img src={item.src} alt={item.alt} />}
                                {item.text}
                            </StyledMainContainer>
                        </StyledLink>
                    )}
                </React.Fragment>
            ))}
        </>
    );
}

export default SideBarMiddle;
