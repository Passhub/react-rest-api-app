import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FullInfo from './components/FullInfo'
import Layout from './components/Layout'
import Posts from './components/Posts'
import Todos from './components/Todos';
import reducer from './reducers/combineReducers'

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => (
  <Provider store={store}>
    <Router>
        <Switch>
          <Layout>
            <Route path="/" component={null}/>
            <Route path="/user/info/:id" component={FullInfo}/>
            <Route path="/user/post/:id" component={Posts}/>
            <Route path="/user/todos/:id" component={Todos}/>
          </Layout>
        </Switch>
    </Router>
  </Provider>
)


export default App;
