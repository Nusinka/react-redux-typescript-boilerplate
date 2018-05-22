import { handleActions } from 'redux-actions';
import { SearchActions } from 'app/actions/searchUser';
import { UserModel } from 'app/models';

export type SearchUserState = {
  usersList: UserModel[];
};

const initialState: SearchUserState = {
  usersList: []
};

export const searchUserReducer = handleActions<SearchUserState, {}>(
  {
    [SearchActions.Type.GET_USERS_LIST]: (state, action): SearchUserState => {
      return {
        ...state,
        usersList: action.usersList
      };
    }
  },
  initialState
);
