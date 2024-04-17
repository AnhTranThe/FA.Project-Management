import dayjs from "dayjs";

export const formatDateTime = (dateTimeOffet: string) => {
  const currentDate = dayjs(dateTimeOffet); // Get current date with dayjs
  const formattedDate = currentDate.format("DD-MM-YYYY");
  //   console.log(formatDateTime)
  return formattedDate;
};
