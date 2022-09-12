import kakao from "./kakao";
import naver from "./naver";
import google from "./google";
import local from "./local";

export default () => {
  kakao();
  naver();
  google();
  local();
};
