export const standardFormat = (date: string) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
};
