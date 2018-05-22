import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { UserAuthorizationActions } from 'app/actions';
import * as styles from './style.css';

interface ButtonProps {
  logoutUser: typeof UserAuthorizationActions.logoutUser;
}

export const LogoutButton: React.SFC<ButtonProps> = (props) => {
  return (
    <div className={styles.buttonPosition}>
      <RaisedButton label="Log Out" primary={true} onClick={props.logoutUser} />
    </div>
  );
};
