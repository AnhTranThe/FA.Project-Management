import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

export const formatDateTime = (dateTimeOffet: string) => {
  const currentDate = dayjs(dateTimeOffet); // Get current date with dayjs
  const formattedDate = currentDate.format("DD-MM-YYYY");
  return formattedDate;
};

export const generateRandomImageAvt = () => {
  const imagePaths = [
    "/imgs/Avatars/andy-davis-min.webp",
    "/imgs/Avatars/buzz-lightyear-min.webp",
    "/imgs/Avatars/emperor-zurg-min.webp",
    "/imgs/Avatars/jessie-min.webp",
    "/imgs/Avatars/little-green-men-min.webp",
    "/imgs/Avatars/mr-potato-min.webp",
    "/imgs/Avatars/ms-potato-min.webp",
    "/imgs/Avatars/woody-min.webp",
  ];
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];

  // const randomNumber = Math.floor(Math.random() * 1000);
  // return `https://picsum.photos/id/${randomNumber}/200/200.jpg`;
};

export const generateRandomImageProject = () => {
  const imagePaths = [
    "/imgs/Projects/1.svg",
    "/imgs/Projects/2.svg",
    "/imgs/Projects/3.svg",
    "/imgs/Projects/4.svg",
    "/imgs/Projects/5.svg",
    "/imgs/Projects/6.svg",
    "/imgs/Projects/7.svg",
    "/imgs/Projects/8.svg",
    "/imgs/Projects/9.svg",
    "/imgs/Projects/10.svg",
    "/imgs/Projects/11.svg",
    "/imgs/Projects/12.svg",
    "/imgs/Projects/13.svg",
    "/imgs/Projects/14.svg",
    "/imgs/Projects/15.svg",
    "/imgs/Projects/16.svg",
    "/imgs/Projects/17.svg",
    "/imgs/Projects/18.svg",
    "/imgs/Projects/19.svg",
    "/imgs/Projects/20.svg",
    "/imgs/Projects/21.svg",
    "/imgs/Projects/22.svg",
    "/imgs/Projects/23.svg",
    "/imgs/Projects/24.svg",
    "/imgs/Projects/25.svg",
  ];
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];

  // const randomNumber = Math.floor(Math.random() * 1000);
  // return `https://picsum.photos/id/${randomNumber}/200/200.jpg`;
};

export const decodeJwtToken = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded;
};
