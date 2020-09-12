import React from 'react';

import {Admin, Resource} from 'react-admin';
import {UserList} from './users';
import {PostList, PostCreate, PostEdit} from "./posts";

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import jsonServerProvider from 'ra-data-json-server';
import Dashboard from "./Dashboard";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return (
    <div className="App">
      <Admin
        dashboard={Dashboard}
        dataProvider={dataProvider}
      >
        <Resource
          name="posts"
          list={PostList}
          edit={PostEdit}
          create={PostCreate}
          icon={PostIcon}
        />
        <Resource
          name="users"
          list={UserList}
          icon={UserIcon}
        />
      </Admin>
    </div>
  );
}

export default App;
