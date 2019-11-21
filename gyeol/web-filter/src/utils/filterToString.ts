import { IFilter } from "../components/FilterSection/FilterSection";

// filter data 생성
const filterToString = (filter: IFilter) => {
  // 현재 세팅된 filter object에 따라 새로운 Filter String 생성
  let newFilter = "";
  Object.keys(filter).forEach(f => {
    if (f === "hueRotate") newFilter += `hue-rotate(${filter[f]}deg)`;
    else if (f === "blur") newFilter += `blur(${filter[f]}px)`;
    else {
      newFilter += `${f}(${filter[f]}%)`;
    }
  });

  return newFilter;
};

export default filterToString;
