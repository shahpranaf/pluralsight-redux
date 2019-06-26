import initialState from "./initialState";
import * as types from "../actions/actionTypes";

const actionTypeEndsInSuccess = type =>
  type.substring(type.length - 8) === "_SUCCESS";

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    state = state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    state = state - 1;
  }
  return state;
}
