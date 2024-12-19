import { colors } from '../styles';

export const assignColor = (number: number, type: string) => {
  const typeBase =
    type === 'background' ? colors.semantic.hover : colors.semantic;

  const color = [
    typeBase.primary,
    typeBase.warning,
    typeBase.secondary,
    typeBase.danger,
    typeBase.success,
  ];

  const assingedColor = color[number % 5];

  return assingedColor;
};
