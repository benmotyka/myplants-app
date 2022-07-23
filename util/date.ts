import dayjs from "dayjs";

import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const formatToHourAndDate = (date: string) =>
  dayjs(date).format("HH:mm DD/MM");

export const formatToHour = (date: string) => dayjs(date).format("HH:mm");

export const calculateDifferenceFromNow = (date: string | Date) => {
  const now = dayjs();
  const givenDate = dayjs(date);

  const diff = dayjs.duration(now.diff(givenDate));

  return diff.format("HH:mm");
};
