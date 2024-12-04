import styled from "styled-components";

const MainCalendarDaysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  border: 1px solid black;
  padding-bottom: 0.5rem;
  position: relative;
  overflow: hidden; /* 상위 요소 크기 초과 내용 숨김 */
  cursor: pointer;
`;

const MainCalendarDaysNumber = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
`;

const MainCalendarDaysContentsWrapper = styled.div`
  width: 80%;
  max-height: calc(1.375rem * 4 + 0.25rem * 3); // 5개의 컨텐츠 + 간격
  /* height: 6.25rem; */
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden; /* 초과된 일정 숨김 */
`;

const MainCalendarDaysContents = styled.div`
  width: calc(100% - .5rem - 2px);
  min-height: 1rem;
  font-size: .875rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  padding: .125rem .25rem;
  overflow: hidden; /* 텍스트 넘침 방지 */
  white-space: nowrap; /* 한 줄로 제한 */
  text-overflow: ellipsis; /* 넘치는 텍스트 ... 표시 */
`;

const MainCalendarDays = () => {
  return (
    <MainCalendarDaysWrapper>
      <MainCalendarDaysNumber>22</MainCalendarDaysNumber>
      <MainCalendarDaysContentsWrapper>
        <MainCalendarDaysContents>
          누구의 어떤 일정입니다
        </MainCalendarDaysContents>
        <MainCalendarDaysContents>
          누구의 어떤 일정입니다
        </MainCalendarDaysContents>
        <MainCalendarDaysContents>
          누구의 어떤 일정입니다
        </MainCalendarDaysContents>
        <MainCalendarDaysContents>
          누구의 어떤 일정입니다
        </MainCalendarDaysContents>
        <MainCalendarDaysContents>
          누구의 어떤 일정입니다
        </MainCalendarDaysContents>
        <MainCalendarDaysContents>
          누구의 어떤 일정입니다
        </MainCalendarDaysContents>
        <MainCalendarDaysContents>
          누구의 어떤 일정입니다
        </MainCalendarDaysContents>
        <MainCalendarDaysContents>
          누구의 어떤 일정입니다
        </MainCalendarDaysContents>
      </MainCalendarDaysContentsWrapper>
    </MainCalendarDaysWrapper>
  );
};

export default MainCalendarDays;
