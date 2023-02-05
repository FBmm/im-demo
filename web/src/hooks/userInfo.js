import { useEffect, useState } from "react";
export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  return {
    userInfo,
    setUserInfo
  }
}