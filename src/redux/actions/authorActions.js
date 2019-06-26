import * as authorApi from "../../api/authorApi";
import * as actionTypes from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusAction";

export const loadAuthorsSuccess = authors => {
  return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
};

export const loadAuthors = () => {
  return dispatch => {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
};
