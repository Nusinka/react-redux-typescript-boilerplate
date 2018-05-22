import * as React from 'react';
import * as styles from './style.css';
import TextField from 'material-ui/TextField';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { RootState } from 'app/reducers';
import RaisedButton from 'material-ui/RaisedButton';
import { fieldLabels } from 'app/data/fieldLabels';
import { UserActions } from 'app/actions/editUser';
import { omit } from 'app/utils';
import { UserModel } from 'app/models';

type fieldNameType = 'firstName' | 'lastName' | 'dateOfBirth' | 'phoneNumber';

namespace UserCard {
  export interface Props extends RouteComponentProps<any> {
    userActions: UserActions;
    userData: UserModel;
    isEditedData: boolean;
  }
}

@withRouter
@connect(
  (state: RootState) => ({
    userData: state.editUser.userData,
    isEditedData: state.editUser.isEditedData
  }),
  (dispatch: Dispatch<Action, RootState>) => ({
    userActions: bindActionCreators(omit(UserActions, 'Type'), dispatch)
  })
)
export class UserCard extends React.Component<UserCard.Props, UserModel> {
  constructor(props: UserCard.Props) {
    super(props);
    this.props.userActions.getUserData(+props.match.params.id);
    this.state = {
      ...this.props.userData
    };
  }

  componentWillReceiveProps(newProps: UserCard.Props) {
    this.setState(() => ({ ...newProps.userData }));
    // if (isEmpty(this.props.userData) && !isEmpty(newProps.userData)) {
    // }
    if (!this.props.isEditedData && newProps.isEditedData) {
      this.props.history.push('/phoneBook');
    }
  }

  handleSubmit = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();
    this.props.userActions.saveUserData(this.state);
  };

  getTextFieldType = (fieldName: fieldNameType) => {
    switch (fieldName) {
      case 'dateOfBirth':
        return 'date';

      case 'phoneNumber':
        return 'tel';

      default:
        return 'string';
    }
  };

  renderTextField = (fieldName: fieldNameType) => {
    const label = fieldLabels[fieldName];
    const type = this.getTextFieldType(fieldName);
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        name={fieldName}
        type={type}
        value={this.state[fieldName]}
        onChange={(event, value) => this.setState({ [fieldName as any]: value })}
      />
    );
  };

  render() {
    return (
      <form className={styles.formFields} onSubmit={this.handleSubmit}>
        {this.renderTextField('firstName')}
        {this.renderTextField('lastName')}
        {this.renderTextField('dateOfBirth')}
        {this.renderTextField('phoneNumber')}

        <RaisedButton label="Submit" type="submit" primary={true} onClick={this.handleSubmit} />
      </form>
    );
  }
}
