export const REG_EXP: {
  [key: string]: { regExp: RegExp; pattern: string; message: string };
} = {
  email: {
    regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    message: '유효한 이메일 양식으로 작성해 주세요.',
  },
  password: {
    regExp: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
    pattern: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{7,}$',
    message: '7자 이상의 영문과 숫자를 함께 사용해주세요.',
  },
  rePassword: {
    regExp: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
    pattern: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{7,}$',
    message: '7자 이상의 영문과 숫자를 함께 사용해주세요.',
  },
  name: {
    regExp: /^[가-힣a-zA-Z]+(?:[\\s-][가-힣a-zA-Z]+)*$/,
    pattern: '^[가-힣a-zA-Z]+(?:[\\s-][가-힣a-zA-Z]+)*$',
    message: '한글 또는 영문만 가능합니다.',
  },
  phoneNumber: {
    regExp:
      /^(010(-)?[2-9]\d{3}|(011|016|017|018|019|070)(-)?\d{3,4})(-)?\d{4}$/,
    pattern:
      '^(010(-)?[2-9]\\d{3}|(011|016|017|018|019|070)(-)?\\d{3,4})(-)?\\d{4}$',
    message: '유효한 휴대폰 번호 양식으로 작성해주세요.',
  },
};
