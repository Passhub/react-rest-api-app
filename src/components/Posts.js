import React from 'react';
import { connect } from "react-redux";
import { Icon, Collapse, Input, Button, Dropdown, Form, Menu} from 'antd';

import { updateOldPost, deleteOldPost } from '../Actions/posts'

const Panel = Collapse.Panel;

class Posts extends React.Component {

  state ={
    dataSource: [],
    body: '',
    id: null,
    visible: false
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
      );
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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

    const newPost = (
      <div style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
      <Form style={{ width: '80vh', margin: 20 }}>
        <Form.Item>
          <Input placeholder="Title"/>
        </Form.Item>
        <Form.Item>
          <Input.TextArea placeholder="Your content"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Add Post
          </Button>
        </Form.Item>
      </Form>
      </div>
    )

    return(
        <div style={{ height: '80vh', overflow: 'auto' }} >
          <div style={{display: 'inline-flex'}}>
          <h4>Posts</h4>
            <Dropdown trigger={['click']} overlay={newPost} visible={this.state.visible}>
              <Button
                style={{ height: 25, width: 25, padding: 0, margin: '8px 0 0 10px' }}
                onClick={() => {
                  if(this.state.visible === false)
                    this.setState({visible: true})
                  else 
                    this.setState({visible: false})
                }}
              >
                <Icon type='plus' style={{ fontSize: 12 }}/>
              </Button>
            </Dropdown>
          </div>
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
                      <Icon onClick={() => {this.props.dispatch(deleteOldPost(this.state.id))}} type='delete'/>
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