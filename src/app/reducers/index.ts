import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { editUserReducer } from './editUser';
import { userAuthorizationReducer } from './userAuthorization';
import { searchUserReducer } from './searchUser';
import { routerReducer, RouterState } from 'react-router-redux';
import { EditUserState } from 'app/reducers/editUser';
import { UserAuthorizationState } from 'app/reducers/userAuthorization';
import { SearchUserState } from 'app/reducers/searchUser';

export type RootState = {
  editUser: EditUserState;
  userAuthorization: UserAuthorizationState;
  searchUser: SearchUserState;
  router: RouterState;
  form: any;
};

export const rootReducer = combineReducers<RootState>({
  editUser: editUserReducer as any,
  userAuthorization: userAuthorizationReducer as any,
  searchUser: searchUserReducer as any,
  router: routerReducer as any,
  form: formReducer as any
});
