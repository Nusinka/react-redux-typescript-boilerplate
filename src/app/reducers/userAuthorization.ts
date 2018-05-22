import { handleActions } from 'redux-actions';
import { UserAuthorizationActions as UserAuthorization } from 'app/actions';

export type UserAuthorizationState = {
  isUserAuthorized: boolean;
  token: string;
};

const initialState: UserAuthorizationState = {
  isUserAuthorized: false,
  token: ''
};

export const userAuthorizationReducer = handleActions<UserAuthorizationState, {}>(
  {
    [UserAuthorization.Type.LOGIN]: (state: UserAuthorizationState, action: any) => {
      return {
        ...state,
        isUserAuthorized: true,
        token: action.token
      };
    },
    [UserAuthorization.Type.LOGOUT]: (state: UserAuthorizationState) => {
      return {
        ...state,
        isUserAuthorized: false,
        token: ''
      };
    }
  },
  initialState
);
