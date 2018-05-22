import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { EditUserState } from 'app/reducers/editUser';
import { User } from 'app/data/phoneBook';
import { UserModel } from 'app/models';

export namespace UserActions {
  export enum Type {
    GET_USER_DATA = 'GET_USER_DATA',
    SAVE_USER_DATA = 'SAVE_USER_DATA'
  }

  export const getUserData: ActionCreator<ThunkAction<Action, EditUserState, void>> = (
    userId: number
  ) => {
    return (dispatch: Dispatch<Action, EditUserState>): Action => {
      const user = JSON.parse(localStorage.phoneBook).find((user: User) => user.id === userId);
      return dispatch({
        type: Type.GET_USER_DATA,
        user
      });
    };
  };

  export const saveUserData: ActionCreator<ThunkAction<Action, EditUserState, void>> = (
    user: UserModel
  ) => {
    return (dispatch: Dispatch<Action, EditUserState>): Action => {
      const updatedList = JSON.parse(localStorage.phoneBook);
      const userIdx = updatedList.indexOf(
        updatedList.find((userData: UserModel) => userData.id === user.id)
      );
      updatedList[userIdx] = user;
      localStorage.setItem('phoneBook', JSON.stringify(updatedList));
      return dispatch({
        type: Type.SAVE_USER_DATA
      });
    };
  };
}

export type UserActions = Omit<typeof UserActions, 'Type'>;
