export const calculateAdjustedDate = (
  day: number,
  isCurrentMonth: boolean,
  currentMonth: number,
  currentYear: number
) => {
  let adjustedYear = currentYear;
  let adjustedMonth = currentMonth;

  if (!isCurrentMonth && day > 20) {
    adjustedMonth -= 1;
    if (adjustedMonth < 1) {
      adjustedMonth = 12;
      adjustedYear -= 1;
    }
  } else if (!isCurrentMonth && day <= 20) {
    adjustedMonth += 1;
    if (adjustedMonth > 12) {
      adjustedMonth = 1;
      adjustedYear += 1;
    }
  }

  return { adjustedYear, adjustedMonth };
};
