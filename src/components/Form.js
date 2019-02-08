import React from 'react';
import { addNewTodo } from '../Actions/todos';
import {
  Form, Icon, Input, Button,
} from 'antd';

const moment = require('moment');
const v4 = require('uuid/v4')
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalAddTodoForm extends React.Component {

  state = {
    id: null
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    this.setState({
      id: this.props.props.location.state.user_id
    })
  }
  
  addTodo = (value) => {
    console.log('addTodo:', this.props);
    this.props.props.dispatch(addNewTodo({
      userId: this.props.props.location.state.user_id,
      id: v4(),
      title: JSON.stringify(value).slice(9, -2),
      time: moment().valueOf() 
    }));
    
  }

  handleSubmit = (e) => {
    console.log(this.props.props)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.addTodo(values);
        
      }
    });
    this.props.form.resetFields();
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('todo') && getFieldError('todo');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{ marginBottom: 10 }}>
        <Form.Item
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('todo', {
            rules: [{ required: true, message: 'Please write your todo!' }],
          })(
            <Input  prefix={<Icon type="check" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Write a todo..." />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Add todo
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedHorizontalAddTodoForm = Form.create({ name: 'horizontal_addtodo' })(HorizontalAddTodoForm);
