import React from 'react';
import { Layout, Menu, Icon, Input } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchUsers } from '../Actions/users';
import { fetchTodos } from '../Actions/todos';
import { fetchPosts } from '../Actions/posts';

import SubMenu from 'antd/lib/menu/SubMenu';

const { Sider, Content, Footer } = Layout;

class MainLayout extends React.Component {
  
  state = {
    Users: []
  } 
                    
  componentDidMount = () => {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchTodos());
    this.props.dispatch(fetchPosts());
    if(this.props.users){
      let users = this.props.users.filter(item => 
        item.userId === this.props.location.state.user_id);
      if(this.state.Users.length === 0){
        this.setState({
          Users: users.map((item, key) => {return{...item, key}})
        })
      }
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.users !== prevProps.users){
      this.setState({
        Users: this.props.users.map((item, key) => {return{...item, key}})
      });
  }}
  
  handleSearch = (e) => {
    let searchQuery = e.target.value.toLowerCase();
    let displayedUsers = this.props.users.filter((user) => {
      let searchValue = user.name.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    this.setState({
      Users: displayedUsers,
    })
  }

  render() {
    const { error, loading } = this.props;

    if(error){
      return <div>error! {error.message}</div>
    }

    if(loading){
      return <div style={{ textAlign: 'center', width: '100%', height: '80vh', lineHeight: '80vh' }}><Icon type="loading" /></div>
    }

    return (
      <div> 
        {
          <div>
          <Layout style={{ height: '100vh'}}>
            <Sider
              width = {300}
              breakpoint="lg"
              collapsedWidth="0"
              // onBreakpoint={(broken) => { console.log(broken); }}
              onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
              style={{
                overflow: 'auto', height: '100vh' , position: 'fixed', left: 0, backgroundColor: 'white'
              }}
            >
              <Input 
                style={{ width: 280, margin: 10 }} 
                placeholder="Find person..."
                onChange={this.handleSearch}
               
              />
              <div className="logo" />
              <Menu theme="light" mode="inline">
                {this.state.Users.map((user) => {
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
  todos: state.todos.items,
  posts: state.posts.items,
  users: state.users.items,
  loading: state.users.loading,
  error: state.users.error
});


export default connect (mapStateToProps)(MainLayout);