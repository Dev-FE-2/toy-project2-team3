const scale = {
  primary: {
    s100: '#f1f8e9',
    s99: '#e5f4dd',
    s95: '#c8e6a6',
    s90: '#a6cc82',
    s80: '#8ebf5f',
    s70: '#75b443',
    s60: '#5e9e34',
    s50: '#4a8328',
    s40: '#3d621a',
    s30: '#324e11',
    s20: '#28390c',
    s10: '#202709',
  },
  secondary: {
    s100: '#f6f8f0',
    s99: '#e9ece4',
    s95: '#d5dec8',
    s90: '#bfc5b2',
    s80: '#a4aa94',
    s70: '#8a9279',
    s60: '#737a63',
    s50: '#5e6450',
    s40: '#4b503e',
    s30: '#393e2e',
    s20: '#2a2f21',
    s10: '#1d2115',
  },
  tertiary: {
    s100: '#e7f9f5',
    s99: '#dff4f0',
    s95: '#bfe7e1',
    s90: '#a4d7cc',
    s80: '#8cc9ba',
    s70: '#6ab6a7',
    s60: '#4e9e91',
    s50: '#367f74',
    s40: '#265c53',
    s30: '#1b483f',
    s20: '#12342e',
    s10: '#0b241e',
  },
  neutral: {
    s100: '#ffffff',
    s99: '#fafafa',
    s95: '#eaeaea',
    s90: '#dadada',
    s80: '#c7c7c3',
    s70: '#b0b0ac',
    s60: '#989792',
    s50: '#7d7c76',
    s40: '#626158',
    s30: '#4a493f',
    s20: '#35342a',
    s10: '#211f14',
  },
  neutralVariant: {
    s100: '#f7f8f5',
    s99: '#eff0ed',
    s95: '#d6d7d3',
    s90: '#c2c3be',
    s80: '#a6a6a1',
    s70: '#8c8c87',
    s60: '#70706b',
    s50: '#54564f',
    s40: '#3d3f38',
    s30: '#2a2b24',
    s20: '#1a1a14',
    s10: '#0e0e09',
  },
  danger: {
    s100: '#fff8f8',
    s99: '#ffedea',
    s95: '#ffcfcb',
    s90: '#ffb3ae',
    s80: '#ff8581',
    s70: '#ff5449',
    s60: '#e53935',
    s50: '#b71c1c',
    s40: '#931515',
    s30: '#6d1010',
    s20: '#4a0b0b',
    s10: '#2e0606',
  },
};

const semantic = {
  primary: scale.primary.s60,
  secondary: scale.secondary.s60,
  tertiary: scale.tertiary.s60,
  success: scale.tertiary.s60,
  danger: scale.danger.s70,
  neutral: scale.neutral.s60, // 배경, 보조 텍스트, 구분선
  nuetralVariant: scale.neutralVariant.s60, // 보조적인 배경, 비활성 상태 UI
  dark: scale.neutral.s30,
  light: scale.neutral.s100,
  hover: {
    primary: scale.primary.s95,
    secondary: scale.secondary.s95,
    tertiary: scale.tertiary.s95,
    success: scale.tertiary.s95,
    danger: scale.danger.s95,
  },
  background: {
    default: scale.neutral.s60,
    light: scale.neutral.s95,
    dark: scale.neutralVariant.s60,
  },
  text: {
    dark: scale.neutral.s30,
    light: scale.neutral.s100,
    gray: scale.neutral.s60,
  },
  border: scale.neutral.s60,
  disabled: scale.neutralVariant.s60,
};

export const colors = { scale, semantic };
