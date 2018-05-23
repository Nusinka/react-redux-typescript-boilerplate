export interface FieldLabels {
  [key: string]: string;
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

export const fieldLabels: FieldLabels = {
  id: 'ID',
  firstName: 'First name',
  lastName: 'Last name',
  dateOfBirth: 'Date of birth',
  phoneNumber: 'Phone number'
};
