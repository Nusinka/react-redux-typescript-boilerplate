import * as React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { AuthorizationForm } from 'app/components';
import { UserAuthorizationActions } from 'app/actions/userAuthorization';

interface TabsProps {
  authorizeActions: UserAuthorizationActions;
}

const AuthorizationBlock = (props: TabsProps) => {
  const renderTab = (tabName: string) => {
    const { loginUser, signupUser } = props.authorizeActions;
    return (
      <Tab label={tabName}>
        <AuthorizationForm
          tabName={tabName}
          handleSubmit={tabName === 'Login' ? loginUser : signupUser}
        />
      </Tab>
    );
  };

  return (
    <Tabs>
      {renderTab('Login')}
      {renderTab('Signup')}
    </Tabs>
  );
};

export default AuthorizationBlock;
