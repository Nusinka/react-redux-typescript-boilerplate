///<reference path="../../../../node_modules/@types/react-router/index.d.ts"/>
import * as React from 'react';
import * as styles from './style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { LogoutButton } from 'app/components';
import UserCard from 'app/containers/UserCard';
import { userData } from 'app/data/usersBase';
import { phoneBook } from 'app/data/phoneBook';
import { RootState } from 'app/reducers';
import { UserActions, UserAuthorizationActions } from 'app/actions';
import { omit } from 'app/utils';
import { SearchContainer } from 'app/containers/SearchContainer';
import AuthorizationBlock from '../AuthorizationBlock';

export namespace App {
  export interface Props<T> extends RouteComponentProps<T> {
    userActions: UserActions;
    authorizeActions: UserAuthorizationActions;
    isUserAuthorized: boolean;
  }
}

@connect(
  (state: RootState) => ({
    isUserAuthorized: state.userAuthorization.isUserAuthorized
  }),
  (dispatch: Dispatch<Action, RootState>) => ({
    userActions: bindActionCreators(omit(UserActions, 'Type'), dispatch),
    authorizeActions: bindActionCreators(omit(UserAuthorizationActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props<any>> {
  componentWillMount() {
    localStorage.clear();
    localStorage.setItem('users', JSON.stringify(userData));
    localStorage.setItem('phoneBook', JSON.stringify(phoneBook));
  }

  componentWillReceiveProps(newProps: App.Props<any>) {
    if (this.props.isUserAuthorized && !newProps.isUserAuthorized) {
      this.props.history.push('/');
    }
  }

  renderContent = () => {
    const { logoutUser } = this.props.authorizeActions;
    return (
      <div className={styles.appWrapper}>
        <LogoutButton logoutUser={logoutUser} />
        <Route exact path="/phoneBook" component={SearchContainer} />
        <Route exact path="/phoneBook/:id" component={UserCard} />
      </div>
    );
  };

  render() {
    return (
      <MuiThemeProvider>
        <>
          <Route
            exact
            path="/"
            render={() =>
              this.props.isUserAuthorized ? <Redirect to="/phoneBook" /> : <Redirect to="/auth" />
            }
          />
          <Route
            path="/auth"
            render={() =>
              this.props.isUserAuthorized ? (
                <Redirect to="/phoneBook" />
              ) : (
                <AuthorizationBlock authorizeActions={this.props.authorizeActions} />
              )
            }
          />
          <Route
            path="/phoneBook"
            render={() =>
              this.props.isUserAuthorized ? this.renderContent() : <Redirect to="/auth" />
            }
          />
        </>
      </MuiThemeProvider>
    );
  }
}
