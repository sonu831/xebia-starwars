import React from 'react';
import 'antd/dist/antd.css';
import './assets/css/style.css';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import Login from './components/Login'
import SearchPage from './components/SearchPage';
const store = configureStore();

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/searchPage" component={SearchPage} />
      </Switch>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
