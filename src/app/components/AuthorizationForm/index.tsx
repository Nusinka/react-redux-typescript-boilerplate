import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { userDataInterface } from 'app/data/usersBase';
import { UserAuthorizationActions } from 'app/actions/userAuthorization';
import * as styles from './style.css';

export namespace Form {
  export interface Props {
    tabName: string;
    handleSubmit: typeof UserAuthorizationActions.loginUser;
  }

  export interface State {
    userName: string;
    password: string;
    error: string;
  }
}

export class AuthorizationForm extends React.Component<Form.Props, Form.State> {
  constructor(props: Form.Props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      error: ''
    };
  }

  handleSubmit = () => {
    const { userName, password } = this.state;
    if (userName.length && password.length) {
      const token = userName + password;
      const { tabName } = this.props;
      const user = JSON.parse(localStorage.users).find(
        (element: userDataInterface) => element.token === token
      );
      if (typeof user === 'object') {
        if (tabName === 'Login') {
          this.props.handleSubmit(token);
        } else {
          this.setState({ error: 'User has already exist' });
        }
      } else if (tabName === 'Login') {
        this.setState({ error: "Couldn't find user" });
      } else {
        const user = {
          token: userName + password,
          userName,
          password
        };
        this.props.handleSubmit(user);
      }
    } else {
      this.setState({ error: 'Should fill all fields' });
    }
  };

  changeValue = (event: any, newValue: string) => {
    this.setState((state: Form.State) => ({
      userName: newValue,
      error: ''
    }));
  };

  render() {
    return (
      <form className={styles.formFields}>
        <br />
        <br />
        <TextField hintText="User name" floatingLabelText="User name" onChange={this.changeValue} />

        <br />
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          onChange={(event, newValue) =>
            this.setState({
              password: newValue,
              error: ''
            })
          }
        />
        <br />
        <span className={styles.errorField}>{this.state.error}</span>
        <br />
        <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit} />
      </form>
    );
  }
}
