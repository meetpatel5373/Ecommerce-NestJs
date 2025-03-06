import { Roles } from 'src/shared/enum/roles';

export const propsFirstName = {
  description: 'First Name',
  example: 'David',
};

export const propsLastName = {
  description: 'Last Name',
  example: 'Paul',
};

export const propsUserName = {
  description: 'User Name',
  example: 'David002',
};

export const propsUserEmail = {
  description: 'User Email',
  example: 'your-email@gmail.com',
};

export const propsDisplayName = {
  description: 'User Full Display Name',
  example: 'David John',
};

export const propsRole = {
  description: 'User Role',
  example: '1',
};

export const propsUserPassword = {
  description: 'User Password',
  example: 'Abcd@1234',
};

export const propsUserConfirmPassword = {
  description: 'User Confirm Password',
  example: 'Abcd@1234',
};

export const propsUserId = {
  description: 'User Id',
  example: '1',
};

export const propsUserRole = {
  enum: Roles,
  description: 'The role of the user',
  example: Roles.customer,
};
