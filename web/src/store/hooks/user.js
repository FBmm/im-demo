import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction, clearUser } from "../action";
import { getStateUser } from "../getter/user";

export const useStateUserInfo = () => useSelector(getStateUser)

export function useDispatchUser() {
  const dispatch = useDispatch()
  const stateSetUser = useCallback((info) => dispatch(setUserInfoAction(info)), [dispatch])
  const stateClearUser = useCallback(() => dispatch(clearUser()), [dispatch])
  return { stateSetUser, stateClearUser }
}