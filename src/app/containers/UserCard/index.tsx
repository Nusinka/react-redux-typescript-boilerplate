import * as React from 'react';
import * as styles from './style.css';
import TextField from 'material-ui/TextField';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { reduxForm, InjectedFormProps, Field, WrappedFieldProps } from 'redux-form';
import { isEmpty } from 'lodash';
import { RootState } from 'app/reducers';
import RaisedButton from 'material-ui/RaisedButton';
import { fieldLabels } from 'app/data/fieldLabels';
import { UserActions } from 'app/actions/editUser';
import { omit } from 'app/utils';
import { UserModel } from 'app/models';

interface FormProps {
  isEditedData: boolean;
  userData: UserModel;
  saveData: (data: UserModel) => void;
  getUserData: (data: UserModel) => void;
  userActions: UserActions;
}

type AllFormProps = FormProps & InjectedFormProps<{}> & RouteComponentProps<any>;

export class UserCard extends React.Component<AllFormProps> {
  constructor(props: AllFormProps) {
    super(props);
    this.props.userActions.getUserData(+props.match.params.id);
  }

  componentWillReceiveProps(newProps: AllFormProps) {
    if (isEmpty(this.props.userData) && !isEmpty(newProps.userData)) {
      this.props.initialize(newProps.userData);
    }
    if (!this.props.isEditedData && newProps.isEditedData) {
      this.props.history.push('/phoneBook');
    }
  }

  handleSubmit = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();
    this.props.userActions.saveUserData(this.props.userData);
  };

  getTextFieldType = (fieldName: string): string => {
    switch (fieldName) {
      case 'dateOfBirth':
        return 'date';

      case 'phoneNumber':
        return 'tel';

      default:
        return 'string';
    }
  };

  renderTextField = (props: WrappedFieldProps) => {
    const { name } = props.input;
    const label = fieldLabels[name];
    const type = this.getTextFieldType(name);

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        name={name}
        type={type}
        {...props.input}
      />
    );
  };

  render() {
    return (
      <form className={styles.formFields} onSubmit={this.handleSubmit}>
        <Field name="firstName" component={this.renderTextField} />
        <Field name="lastName" component={this.renderTextField} />
        <Field name="dateOfBirth" component={this.renderTextField} />
        <Field name="phoneNumber" component={this.renderTextField} />
        <RaisedButton label="Submit" type="submit" primary={true} onClick={this.handleSubmit} />
      </form>
    );
  }
}

const Form = reduxForm({
  form: 'UserForm'
})(UserCard as any);

export default withRouter<FormProps & RouteComponentProps<any>>(connect(
  (state: RootState) => ({
    userData: state.editUser.userData,
    isEditedData: state.editUser.isEditedData
  }),
  (dispatch: Dispatch<Action, RootState>) => ({
    userActions: bindActionCreators(omit(UserActions, 'Type'), dispatch)
  })
)(Form) as any);
