import * as React from 'react';
import Table, {
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableBody,
  TableRowColumn
} from 'material-ui/Table';
import { fieldLabels } from 'app/data/fieldLabels';
import { RouteComponentProps } from 'react-router-dom';
import { UserModel } from 'app/models';
import * as styles from './style.css';

export namespace UserTable {
  export interface Props<T> extends RouteComponentProps<T> {
    usersList: UserModel[];
  }
}

export class UserTable extends React.Component<UserTable.Props<any> & RouteComponentProps<any>> {
  state = { editing: false };

  handleClick = (ids: number[]) => {
    const selectedUser = this.props.usersList.find((user) => user.id === ids[0] + 1);
    if (selectedUser) {
      const userId = selectedUser.id;
      this.props.history.push(`/phoneBook/${userId}`);
    }
  };

  render() {
    return (
      <>
        <Table onRowSelection={this.handleClick}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>{fieldLabels.firstName}</TableHeaderColumn>
              <TableHeaderColumn>{fieldLabels.lastName}</TableHeaderColumn>
              <TableHeaderColumn>{fieldLabels.dateOfBirth}</TableHeaderColumn>
              <TableHeaderColumn>{fieldLabels.phoneNumber}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} onCellClick={() => console.log('onCellClick')}>
            {this.props.usersList.map((element: UserModel) => (
              <TableRow key={element.id} className={styles.clickableField}>
                <TableRowColumn>{element.firstName}</TableRowColumn>
                <TableRowColumn>{element.lastName}</TableRowColumn>
                <TableRowColumn>{element.dateOfBirth}</TableRowColumn>
                <TableRowColumn>{element.phoneNumber}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}
