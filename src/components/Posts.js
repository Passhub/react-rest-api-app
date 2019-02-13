import React from 'react';
import { connect } from "react-redux";
import { Icon, Collapse, Input } from 'antd';
import DropdownMenu from './AddPostForm'

import { updateOldPost, deleteOldPost } from '../Actions/posts';

const Panel = Collapse.Panel;

class Posts extends React.Component {

  state ={
    dataSource: [],
    body: '',
    id: null,
  }
  
  componentDidMount(){
    if(this.props.posts){
      let posts = this.props.posts.filter(item => 
        item.userId === this.props.location.state.user_id);
      if(this.state.dataSource.length === 0){
        this.setState({
          dataSource: posts.map((item, key) => {return{...item, key}})
        })
      }
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.location !== prevProps.location || this.props.posts !== prevProps.posts){
      const posts = this.props.posts.filter(item => 
        item.userId === this.props.location.state.user_id
      )
      this.setState({
        dataSource: this.props.posts.map((item, key) => {return{...item, key}}) 
      })
      console.log('props.location changed')
      this.setState({
        dataSource: posts.map((item, key) => {return{...item, key}})
      }, () => console.log(this.state.dataSource))
    }
  }

  handleChange =(e) => {
    this.setState({
      body: e.target.value 
    })
  }

  handleSave = () => {
    this.props.dispatch(updateOldPost({body: this.state.body, id: this.state.id}))
  }

  handleSearch = (e) => {
    let searchQuery = e.target.value.toLowerCase();
    let displayedPosts = this.props.posts.filter((post) => {
      let searchValue = post.title.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    this.setState({
      dataSource: displayedPosts,
    })
  }

  render() {

    const { error, loading, location} = this.props;

    const { dataSource } = this.state;

    if(error){
      return <div>error! {error.message}</div>
    }

    if(loading){
      return <div style={{ textAlign: 'center', width: '100%', height: '80vh', lineHeight: '80vh' }}><Icon type="loading" /></div>
    }

    return(
        <div style={{ height: '80vh', overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
          <div style={{display: 'inline-flex', position: 'relative'}}>
          <h4>Posts</h4>
            <DropdownMenu props={this.props}/>
            <Input 
              style={{ width: '30%', marginTop: 8, marginLeft: 'auto', marginRight: '3%' }}
              placeholder="Find post..."
              onChange={this.handleSearch}/>
          </div>
          <div style={{ display: 'inline-flex', position: 'relative', width: '95%'  }}>
          <Collapse 
            bordered={false} 
            accordion={true} 
            onChange={(e) => this.setState({id: e})} 
            style={{ width: '98%' }}
          >
            {dataSource.map((post) => {
              if(post.userId === location.state.user_id){
                return(
                  <Panel header={
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      {post.title}
                    </div>} key={post.id}
                  >
                    <Input.TextArea
                      spellCheck={false}
                      wrap='off' 
                      defaultValue={post.body}
                      autosize={true}
                      style={{ width: '100%' }}
                      onChange={this.handleChange}
                      onBlur={this.handleSave}
                      onPressEnter={this.handleSave}
                    />
                  </Panel>
                )
              }})}
            </Collapse>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'absolute', left: '100%', justifyContent: 'space-around' }}>
              {dataSource.map((post, index) => {
                if(post.userId === location.state.user_id)
                return (
                  <Icon onClick={() => {this.props.dispatch(deleteOldPost(post.id))}} 
                    type='delete'
                    style={{ fontSize: 20 }}
                    key={index}
                    />
                )
              })}
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  // loading: state.posts.loading,
  // error: state.posts.error
});

export default connect(mapStateToProps)(Posts);