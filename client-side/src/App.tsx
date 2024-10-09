import React, { useState } from 'react';
import './App.css';
import MyRouter from './routes/MyRouter'
import { router } from './routes/router'
import { store } from "./redux/store";
import { Provider, useSelector } from 'react-redux';
import Layout from './layouts/Layout';
import MyAutocomplete from './components/MyAutoComplete';
import { selectStatus } from './redux/status/status.selector';
function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <MyRouter router={router} />
      </Provider>
    </div>
  );
}

export default App;
