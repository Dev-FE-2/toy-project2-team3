export const REG_EXP: {
  [key: string]: { regExp: RegExp; pattern: string; message: string };
} = {
  email: {
    regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    message: '유효한 이메일 양식으로 작성해 주세요.',
  },
  password: {
    regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{7,}$/,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{7,}$',
    message: '7자 이상의 영문과 숫자를 함께 사용해주세요.',
  },
  name: {
    regExp: /^[가-힣a-zA-Z]+(?:[\\s-][가-힣a-zA-Z]+)*$/,
    pattern: '^[가-힣a-zA-Z]+(?:[\\s-][가-힣a-zA-Z]+)*$',
    message: '한글 또는 영문만 가능합니다.',
  },
};
