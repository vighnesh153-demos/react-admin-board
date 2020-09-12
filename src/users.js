import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField, Create, SimpleForm, TextInput, ReferenceInput, SelectInput, Edit
} from 'react-admin';
import MyUrlField from "./MyUrlField";

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="password" />
      {/*<EmailField source="email" />*/}
      {/*<TextField source="phone" />*/}
      {/*<MyUrlField source="website" />*/}
      {/*<TextField source="company.name" />*/}
    </Datagrid>
  </List>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);

const UserTitle = ({ user }) => {
  return <span>User {
    user ? `"${user.name}"` : ''
  }</span>;
};

export const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="password" />
    </SimpleForm>
  </Edit>
);
