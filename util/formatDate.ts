const formatToTwoDigits = (number: number) =>
  number > 9 ? number : "0" + number;

export const standardFormat = (date: string) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()} ${newDate.getHours()}:${formatToTwoDigits(
    newDate.getMinutes()
  )}`;
};
