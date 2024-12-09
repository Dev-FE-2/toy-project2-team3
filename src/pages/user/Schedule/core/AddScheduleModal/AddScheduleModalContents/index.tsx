const AddScheduleModalContents = () => {
  return (
    <>
      <div>제목</div>
      <input type="text" placeholder="일정 제목" />
      <div>시작 시간</div>
      <input type="datetime-local" />
      <div>종료 시작</div>
      <input type="datetime-local" />
      <div>담당자</div>
      <select name="assignee" id="">
        <option value="">담당자 선택</option>
        <option value="">김둘둘</option>
        <option value="">김셋셋</option>
        <option value="">김넷넷</option>
      </select>
      <div>첨부파일</div>
      <input type="file" />
      <div>내용</div>
      <textarea name="content" id="" placeholder="일정 내용"></textarea>
      <button>등록하기</button>
    </>
  );
};

export default AddScheduleModalContents;
