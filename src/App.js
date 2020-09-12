import React from 'react';

import {Admin, Resource} from 'react-admin';
import {UserList, UserCreate, UserEdit} from './users';
// import {PostList, PostCreate, PostEdit} from "./posts";
//
// import jsonServerProvider from 'ra-data-json-server';
//
// import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";


function App() {
  return (
    <div className="App">
      <Admin
        authProvider={authProvider}
        dashboard={Dashboard}
        dataProvider={dataProvider}
      >
        {/*<Resource*/}
        {/*  name="posts"*/}
        {/*  list={PostList}*/}
        {/*  edit={PostEdit}*/}
        {/*  create={PostCreate}*/}
        {/*  icon={PostIcon}*/}
        {/*/>*/}
        <Resource
          name="users"
          list={UserList}
          icon={UserIcon}
          create={UserCreate}
          edit={UserEdit}
        />
      </Admin>
    </div>
  );
}

export default App;
