import { raw } from './colorRawValue';

const scale = {
  primary: {
    s50: raw.teal.r50,
    s100: raw.teal.r100,
    s200: raw.teal.r200,
    s300: raw.teal.r300,
    s400: raw.teal.r400,
    s500: raw.teal.r500,
    s600: raw.teal.r600,
    s700: raw.teal.r700,
    s800: raw.teal.r800,
    s900: raw.teal.r900,
    s950: raw.teal.r950,
  },
  secondary: {
    s50: raw.cyan.r50,
    s100: raw.cyan.r100,
    s200: raw.cyan.r200,
    s300: raw.cyan.r300,
    s400: raw.cyan.r400,
    s500: raw.cyan.r500,
    s600: raw.cyan.r600,
    s700: raw.cyan.r700,
    s800: raw.cyan.r800,
    s900: raw.cyan.r900,
    s950: raw.cyan.r950,
  },
  neutral: {
    s0: raw.neutral.r0,
    s50: raw.neutral.r50,
    s100: raw.neutral.r100,
    s200: raw.neutral.r200,
    s300: raw.neutral.r300,
    s400: raw.neutral.r400,
    s500: raw.neutral.r500,
    s600: raw.neutral.r600,
    s700: raw.neutral.r700,
    s800: raw.neutral.r800,
    s900: raw.neutral.r900,
    s950: raw.neutral.r950,
    s1000: raw.neutral.r1000,
  },
  neutralVariant: {
    s50: raw.stone.r50,
    s100: raw.stone.r100,
    s200: raw.stone.r200,
    s300: raw.stone.r300,
    s400: raw.stone.r400,
    s500: raw.stone.r500,
    s600: raw.stone.r600,
    s700: raw.stone.r700,
    s800: raw.stone.r800,
    s900: raw.stone.r900,
    s950: raw.stone.r950,
  },
  success: {
    s50: raw.green.r50,
    s100: raw.green.r100,
    s200: raw.green.r200,
    s300: raw.green.r300,
    s400: raw.green.r400,
    s500: raw.green.r500,
    s600: raw.green.r600,
    s700: raw.green.r700,
    s800: raw.green.r800,
    s900: raw.green.r900,
    s950: raw.green.r950,
  },
  danger: {
    s50: raw.red.r50,
    s100: raw.red.r100,
    s200: raw.red.r200,
    s300: raw.red.r300,
    s400: raw.red.r400,
    s500: raw.red.r500,
    s600: raw.red.r600,
    s700: raw.red.r700,
    s800: raw.red.r800,
    s900: raw.red.r900,
    s950: raw.red.r950,
  },
  warning: {
    s50: raw.orange.r50,
    s100: raw.orange.r100,
    s200: raw.orange.r200,
    s300: raw.orange.r300,
    s400: raw.orange.r400,
    s500: raw.orange.r500,
    s600: raw.orange.r600,
    s700: raw.orange.r700,
    s800: raw.orange.r800,
    s900: raw.orange.r900,
    s950: raw.orange.r950,
  },
  info: {
    s50: raw.neutral.r50,
    s100: raw.neutral.r100,
    s200: raw.neutral.r200,
    s300: raw.neutral.r300,
    s400: raw.neutral.r400,
    s500: raw.neutral.r500,
    s600: raw.neutral.r600,
    s700: raw.neutral.r700,
    s800: raw.neutral.r800,
    s900: raw.neutral.r900,
    s950: raw.neutral.r950,
  },
};

const semantic = {
  primary: scale.primary.s600,
  secondary: scale.secondary.s600,
  success: scale.success.s600,
  danger: scale.danger.s600,
  warning: scale.warning.s600,
  neutral: scale.neutral.s600, // 배경, 보조 텍스트, 구분선
  nuetralVariant: scale.neutralVariant.s600, // 보조적인 배경, 비활성 상태 UI
  light: scale.neutral.s50,
  dark: scale.neutral.s800,
  info: scale.neutral.s600,
  disabled: scale.neutralVariant.s600,
  hover: {
    primary: scale.primary.s400,
    secondary: scale.secondary.s400,
    neutral: scale.neutral.s400,
    neutralVariant: scale.neutralVariant.s400,
    success: scale.success.s400,
    danger: scale.danger.s400,
    warning: scale.warning.s400,
    info: scale.info.s400,
  },
  background: {
    light: scale.neutral.s0,
    dark: scale.neutralVariant.s300,
  },
  text: {
    light: scale.neutral.s50,
    dark: scale.neutral.s800,
    info: scale.neutral.s600,
  },
  border: {
    light: scale.neutral.s300,
    focus: scale.primary.s500,
  },
};

export const colors = { scale, semantic };
