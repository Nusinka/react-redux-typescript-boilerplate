import { handleActions } from 'redux-actions';
import { UserActions } from 'app/actions/editUser';
import { UserModel } from 'app/models';

export type EditUserState = {
  userData: UserModel | {};
  isEditedData: boolean;
};

const initialState: EditUserState = {
  userData: {},
  isEditedData: false
};

export const editUserReducer = handleActions<EditUserState, {}>(
  {
    [UserActions.Type.GET_USER_DATA]: (state, action): EditUserState => {
      return {
        ...state,
        userData: action.user,
        isEditedData: false
      };
    },
    [UserActions.Type.SAVE_USER_DATA]: (state): EditUserState => {
      return {
        ...state,
        userData: initialState.userData,
        isEditedData: true
      };
    }
  },
  initialState
);
