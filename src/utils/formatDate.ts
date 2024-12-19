export const formatDate = (date: number[]) => {
  const [year, month, day] = date;
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedClickedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedClickedDate;
};
