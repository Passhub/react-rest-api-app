import React from 'react';
import { addNewPost } from '../Actions/posts';

import {
  Form, Input, Button, Dropdown, Icon
} from 'antd';

const moment = require('moment')

class DropdownMenu extends React.Component {
  
  state = {
    visible: false
  }
  
  render(){
    return(
      <Dropdown trigger={['click']} overlay={<AddPostForm props={this.props.props}/>}>
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
    )
  }
}

class PostForm extends React.Component {

  state={
    defaultValue: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values, this.props);
        this.props.props.dispatch(addNewPost({
          userId: this.props.props.location.state.user_id,
          title: values.title,
          body: values.body,
          time: moment().valueOf(),
        }));
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form 
        onSubmit={this.handleSubmit} 
        style={{ backgroundColor: '#fff', padding: 20, border: '1px solid #f1f1f1', width: '80vh' }}>
        <Form.Item style={{ marginBottom: 10 }}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input your Title!',  }],
          })(
            <Input placeholder="Title..."/>
          )}
        </Form.Item>
        <Form.Item style={{ marginBottom: 10 }}>
          {getFieldDecorator('body', {
            rules: [{ required: true, message: 'Please input your Content!' }],
          })(
            <Input.TextArea placeholder="Content..." />
          )}
        </Form.Item>
        <Form.Item style={{ marginBottom: 10 }}>
          <Button type="primary" htmlType="submit">
            Add post
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const AddPostForm = Form.create({ name: 'add_post' })(PostForm);

export default DropdownMenu;
