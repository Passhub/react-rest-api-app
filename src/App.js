import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import FullInfo from './components/FullInfo';

const {Sider, Header, Content, Footer} = Layout;

class App extends Component {

  state = {
    users: null
  }

  componentDidMount = async () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(responce => responce.json())
      .then(data => this.setState({ users: data }));
  }

  render() {
    return (
      <Router>
      <div>
        {
          this.state.users !== null && 
          <div>
          <Layout style={{ height: '100vh'}}>
            
            <Sider
              width = {300}
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => { console.log(broken); }}
              onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
              style={{
                overflow: 'auto', height: '100vh' , position: 'fixed', left: 0, backgroundColor: 'white'
              }}
            >
              <div className="logo" />
              <Menu theme="light" mode="inline">
                {this.state.users.map((user) => {
                  console.log(user);
                  return(
                    <Menu.Item key={user.id}>
                      <Link style={{ display:'inline-block' }} to={{ pathname: `/user/${user.id}`, state: { user: user }, }}>
                        <Icon type="user" />
                        <span>{user.name}</span>
                      </Link>
                    </Menu.Item>
                  )
                })}
              </Menu>
            </Sider>

            <Layout style={{  marginLeft: '300px' }}>
              {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
              <Content style={{ margin: '24px 16px 0'}} height={400}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360, height: '90vh', fontSize: 26 }}>

                  {this.state.users.map((user, index) =>(
                    <Route key={index} path={`/user/${user.id}`} component={FullInfo} />
                  ))}

                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2019 Created by Pavel Liubimov
              </Footer>
            </Layout>
          </Layout>    
          </div>
        }
      </div>
      </Router>
    );
  }
}

export default App;
