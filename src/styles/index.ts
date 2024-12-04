import { colors } from './token/colors';

export const styles = {
  padding: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '36px',
    xl: '48px',
    values: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 36,
      xl: 48,
    },
  },
  font: {
    size: {
      heading: '36px',
      subHeading: '24px',
      paragraph: '16px',
      values: {
        heading: 36,
        subHeading: 24,
        paragraph: 16,
      },
    },
    family: "'Noto Sans KR', sans-serif",
    weight: {
      heading: 300,
    },
  },
  border: {
    widthValue: 1,
    width: '1px',
    style: 'solid',
    color: colors.semantic.border,
    default: colors.semantic.border,
    radius: {
      xs: '4px',
      lg: '32px',
      values: {
        xs: 4,
        lg: 32,
      },
    },
  },
  media: {
    widthScreen: 1024,
  },
};
