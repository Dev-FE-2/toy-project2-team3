import { colors } from '../styles';

export const assignColor = (number: number, type: string) => {
  const colorSaturation = type === 'background' ? 's95' : 's60';
  const color = [
    colors.scale.secondary[colorSaturation],
    colors.scale.tertiary[colorSaturation],
    colors.scale.neutral[colorSaturation],
    colors.scale.primary[colorSaturation],
    colors.scale.danger[colorSaturation],
  ];

  const assingedColor = color[number % 5];

  return assingedColor;
};
