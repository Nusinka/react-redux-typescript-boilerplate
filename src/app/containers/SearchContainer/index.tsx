import * as React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { UserTable } from 'app/components/UserTable';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import { SearchActions } from 'app/actions/searchUser';
import { UserModel } from 'app/models';
import * as styles from './style.css';

type userData = {
  text: string;
  value: number;
};

export namespace SearchContainer {
  export interface Props<T> extends RouteComponentProps<T> {
    searchActions: SearchActions;
    usersList: UserModel[];
  }
}

@connect(
  (state: RootState) => ({
    usersList: state.searchUser.usersList
  }),
  (dispatch: Dispatch<Action, RootState>) => ({
    searchActions: bindActionCreators(omit(SearchActions, 'Type'), dispatch)
  })
)
export class SearchContainer extends React.Component<SearchContainer.Props<any>> {
  componentWillMount() {
    this.props.searchActions.getUsersList();
  }

  formatUsersList = (usersList: UserModel[]): userData[] =>
    usersList.map((user: UserModel) => ({
      text: `${user.firstName} ${user.lastName}`,
      value: user.id
    }));

  render() {
    const dataSource = this.formatUsersList(this.props.usersList);
    return (
      <div className={styles.listWrapper}>
        <AutoComplete
          hintText="Type anything"
          dataSource={dataSource}
          dataSourceConfig={{
            text: 'text',
            value: 'text'
          }}
          floatingLabelText="Searching..."
          fullWidth={true}
          onNewRequest={({ value }) => this.props.history.push(`/phoneBook/${value}`)}
        />
        {!!this.props.usersList.length && (
          <UserTable usersList={this.props.usersList} history={this.props.history} />
        )}
      </div>
    );
  }
}
