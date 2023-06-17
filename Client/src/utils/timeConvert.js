export default function timeConvert(date) {
  const dateArr = date.split("-");
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const newDate = new Date(year, month, day);
  return newDate.getTime() / 1000;
}
