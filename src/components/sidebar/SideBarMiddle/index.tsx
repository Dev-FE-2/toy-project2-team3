import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import account_circle from '../../../assets/icons/account_circle.png';
import arrow_drop_down from '../../../assets/icons/arrow_drop_down.png';
import calendar_month from '../../../assets/icons/calendar_month.png';
import check_box from '../../../assets/icons/check_box.png';
import home from '../../../assets/icons/home.png';
import paid from '../../../assets/icons/paid.png';
import schedule from '../../../assets/icons/schedule.png';
import supervisor_account from '../../../assets/icons/supervisor_account.png';
import fetchUserInfo, { User } from '../../../firebase/user/fetchUserInfo'; 

// 타입 정의
type BaseContainerProps = {
    isActive?: boolean;
    isHovered?: boolean;
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

    /* 클릭 또는 호버에 대한 설정 */
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
        padding-left: 0.5vw;
        filter: ${props => (props.isActive ? 'brightness(0) invert(1)' : 'none')}; // 활성화 상태일 때 흰색으로 변경
    }

    .arrow {
        margin-left: auto; 
        width: 1vw; 
        height: auto;
        display: ${props => (props.isActive ? 'block' : 'none')}; // 활성화 상태일 때만 표시
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
    border-left: 1.5px solid #63A002; 
    margin-left: 1vh;
    padding-left: 0.5vw; 
    display: flex; // 가로로 정렬
    flex-direction: column; // 세로로 쌓이게 설정
`;

const StyledLink = styled(Link)`
    text-decoration: none; // 링크의 기본 밑줄 제거
`;

const items = [
    { id: 0, src: home, alt: 'home', text: 'Pokemon ERP', link: '/userHome' },
    { id: 1, src: account_circle, alt: 'account_circle', text: '나의 정보', link: '/editProfile' },
    { id: 2, src: calendar_month, alt: 'calendar_month', text: '나의 업무', link: '/schedule' },
    { id: 3, src: schedule, alt: 'schedule', text: '나의 근태', link: '/attendance' },
    { id: 4, src: paid, alt: 'paid', text: '나의 급여', hasSubItems: true },
];

// SideBarMiddle 컴포넌트
const SideBarMiddle = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // 활성화 항목
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // hovered 항목
    const [expandedSalary, setExpandedSalary] = useState(false); // 세부사항
    const [userInfo, setUserInfo] = useState<User | null>(null);  // fetch한 user 정보
    const location = useLocation();

    // 유저 정보 가져오기
    useEffect(() => {
        const unsubscribe = fetchUserInfo((info) => {
            setUserInfo(info); // 사용자 정보 설정
        });
        return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 정리
    }, []); 

    // 활성화 추적
    useEffect(() => {
        const storedIndex = localStorage.getItem('activeIndex');
        const storedExpandedSalary = localStorage.getItem('expandedSalary') === 'true';
        setActiveIndex(Number(storedIndex));

        // 현재 경로에 따라 activeIndex 설정
        if (location.pathname === '/editProfile') {
            setActiveIndex(1); // "나의 정보" 항목 활성화
        }

        setExpandedSalary(storedExpandedSalary); // 저장된 서브 항목 상태 설정
    }, [location.pathname]);

    // 세부항목에 대한 활성화 추적
    useEffect(() => {
        if (activeIndex !== null) {
            localStorage.setItem('activeIndex', String(activeIndex));
        }
        localStorage.setItem('expandedSalary', String(expandedSalary));
    }, [activeIndex, expandedSalary]);

    const handleSalaryClick = () => {
        setExpandedSalary(prev => !prev);
        setActiveIndex(prev => (prev === 4 ? null : 4));
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
            {items.map(item => (
                <React.Fragment key={item.id}>
                    <StyledLink to={item.id === 4 ? item.link : item.link} onClick={item.id === 4 ? handleSalaryClick : () => handleItemClick(item.id)}>
                        <StyledMainContainer
                            isActive={activeIndex === item.id || (item.id === 4 && (activeIndex === 100 || activeIndex === 101))}
                            isHovered={hoveredIndex === item.id}
                            onMouseEnter={() => setHoveredIndex(item.id)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {item.src && (
                                <img 
                                    src={item.src} 
                                    alt={item.alt} 
                                />
                            )}
                            {item.text}
                            {item.id === 4 && expandedSalary && (
                                <img src={arrow_drop_down} alt="arrow" className="arrow" />
                            )}
                        </StyledMainContainer>
                    </StyledLink>
                    {/* "나의 급여" 항목 */}
                    {item.id === 4 && expandedSalary && (
                        <StyledRowContainer>
                            <StyledLink to="/salaryDetails" onClick={() => handleItemClick(100)}>
                                <StyledSubContainer
                                    isActive={activeIndex === 100}
                                    isHovered={hoveredIndex === 100}
                                    onMouseEnter={() => setHoveredIndex(100)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    급여 내역
                                </StyledSubContainer>
                            </StyledLink>
                            <StyledLink to="/salaryCorrection" onClick={() => handleItemClick(101)}>
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
            
            {/* isAdmin이 true일 경우 추가 항목 렌더링 */}
            {userInfo?.isAdmin && (
                <>
                    <StyledLink to="/employeeList" onClick={() => handleItemClick(5)}>
                        <StyledMainContainer
                            isActive={activeIndex === 5}
                            isHovered={hoveredIndex === 5}
                            onMouseEnter={() => setHoveredIndex(5)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img src={supervisor_account} alt="supervisor_account" />
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
                            <img src={check_box} alt="check_box" />
                            급여 정정 신청 관리
                        </StyledMainContainer>
                    </StyledLink>
                </>
            )}
        </>
    );
}

export default SideBarMiddle;