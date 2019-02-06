import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchUsers } from '../Actions/users'

// import FullInfo from './FullInfo'

import SubMenu from 'antd/lib/menu/SubMenu';

const { Sider, Content, Footer } = Layout;

class Layout1 extends React.Component {
  state = {
    users: null
  } 
                    
  componentDidMount = async () => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(responce => responce.json())
    //   .then(data => this.setState({ users: data }));

    this.props.dispatch(fetchUsers());

  }

  render() {

    const { error, loading, users} = this.props;

    if(error){
      return <div>error! {error.message}</div>
    }

    if(loading){
      return <div style={{ textAlign: 'center', width: '100%', height: '80vh', lineHeight: '80vh' }}><Icon type="loading" /></div>
    }

    console.log('Layout', this.props);
    return (
      <div> 
        { 
          users !== null && 
          <div>
          <Layout style={{ height: '100vh'}}>
            
            <Sider
              width = {300}
              breakpoint="lg"
              collapsedWidth="0"
              //onBreakpoint={(broken) => { console.log(broken); }}
              onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
              style={{
                overflow: 'auto', height: '100vh' , position: 'fixed', left: 0, backgroundColor: 'white'
              }}
            >
              <div className="logo" />
              <Menu theme="light" mode="inline">
                {users.map((user) => {
                  //console.log(user);
                  return(
                    <SubMenu key={user.id} title={<span><Icon type="idcard" />{user.name}</span>}>
                      <Menu.Item key={user.name+1}>
                        <Link style={{ display:'inline-block' }} to={{ pathname: `/user/info/${user.id}`, state: { user: user }, }}>
                          <Icon type="info-circle" />
                          <span>Full info</span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key={user.name+2}>
                        <Link style={{ display:'inline-block' }} to={{ pathname: `/user/todos/${user.id}`, state: { user_id: user.id }, }}>
                          <Icon type="check" />
                          <span>To Do list</span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key={user.name+3}>
                        <Link style={{ display:'inline-block' }} to={{ pathname: `/user/post/${user.id}`, state: { user_id: user.id }, }}>
                          <Icon type="project" />
                          <span>Posts</span>
                        </Link>
                      </Menu.Item>
                    </SubMenu>
                  )
                })}
              </Menu>
            </Sider>

            <Layout style={{  marginLeft: '300px' }}>
              {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
              <Content style={{ margin: '24px 16px 0'}} height={400}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360, height: '90vh', fontSize: 26 }}>
                  {this.props.children}
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
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.items,
  loading: state.users.loading,
  error: state.users.error
});


export default connect (mapStateToProps)(Layout1);