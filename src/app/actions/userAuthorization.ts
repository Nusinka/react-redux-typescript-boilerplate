import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserAuthorizationState } from 'app/reducers/userAuthorization';
import { userDataInterface } from 'app/data/usersBase';

export namespace UserAuthorizationActions {
  export enum Type {
    LOGIN = 'LOGIN',
    SIGNUP = 'SIGNUP',
    LOGOUT = 'LOGOUT'
  }

  export const loginUser: ActionCreator<ThunkAction<Action, UserAuthorizationState, void>> = (
    token: string
  ) => {
    return (dispatch: Dispatch<Action, UserAuthorizationState>): Action => {
      localStorage.setItem('user', token);
      return dispatch({
        type: Type.LOGIN,
        token
      });
    };
  };

  export const signupUser: ActionCreator<ThunkAction<Action, UserAuthorizationState, void>> = (
    user: userDataInterface
  ) => {
    return (dispatch: Dispatch<Action, UserAuthorizationState>): Action => {
      const { userName, password, token } = user;
      const updatedList = JSON.parse(localStorage.users);
      updatedList.push({
        token: userName + password,
        userName,
        password
      });
      localStorage.setItem('users', JSON.stringify(updatedList));
      localStorage.setItem('user', user.token);

      return dispatch({
        type: Type.LOGIN,
        token
      });
    };
  };

  export const logoutUser: ActionCreator<
    ThunkAction<Action, UserAuthorizationState, void>
  > = () => {
    return (dispatch: Dispatch<Action, UserAuthorizationState>): Action => {
      localStorage.setItem('user', '');
      return dispatch({
        type: Type.LOGOUT
      });
    };
  };
}

export type UserAuthorizationActions = Omit<typeof UserAuthorizationActions, 'Type'>;
