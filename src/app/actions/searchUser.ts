import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SearchUserState } from 'app/reducers/searchUser';

export namespace SearchActions {
  export enum Type {
    GET_USERS_LIST = 'GET_USERS_LIST'
  }

  export const getUsersList: ActionCreator<ThunkAction<Action, SearchUserState, void>> = () => {
    return (dispatch: Dispatch<Action, SearchUserState>): Action => {
      const usersList = JSON.parse(localStorage.phoneBook);
      return dispatch({
        type: Type.GET_USERS_LIST,
        usersList
      });
    };
  };
}

export type SearchActions = Omit<typeof SearchActions, 'Type'>;
