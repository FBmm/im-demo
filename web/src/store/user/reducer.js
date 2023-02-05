import * as actionTypes from "./actionTypes";

const initialState = {
  userInfo: []
};

export default function reducer(state = initialState, action) {
  const { type, info } = action
  switch (type) {
    case actionTypes.SET_USERINFO:
      return info
    case actionTypes.CLEAR_USERINFO: {
      return null
    }
    default:
      return state
  }
}