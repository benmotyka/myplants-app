import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const standardFormat = (date: string) =>  dayjs(date).format("HH:mm DD/MM");

export const calculateDifferenceFromNow = (date: string | Date) => {
  const now = dayjs();
  const givenDate = dayjs(date);

  const diff = dayjs.duration(now.diff(givenDate));

  return diff.format("HH:mm");
};
