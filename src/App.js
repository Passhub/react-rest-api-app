import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FullInfo from './components/FullInfo'
import Layout from './components/Layout'
import Posts from './components/Posts'
import Todos from './components/Todos';

const App = () => (
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

)


export default App;
