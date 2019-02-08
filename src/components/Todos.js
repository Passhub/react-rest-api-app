import React from 'react';

import { orderBy } from 'lodash';

import 'antd/dist/antd.css';
import { Table, Popconfirm, Checkbox, Icon } from 'antd';

import { todoDelete, updateOldTodo, checkStatus } from '../Actions/todos';
import { connect } from "react-redux";
import EditableCell from './EditableTable';
import { EditableFormRow } from './EditableTable';
import { WrappedHorizontalAddTodoForm } from './Form';

class EditableTable extends React.Component {

  state = {
    todos: null,
    dataSource: [],
    checked: true,
    inputValue: '',
}

  columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    width: '9vh',
    render: (text, record) => (
      <div>{
       <Checkbox 
          checked={record.completed} 
          onChange={(e) => this.props.dispatch(checkStatus({...record, completed: e.target.checked}))}
        style={{ marginLeft: 15 }}>
      </Checkbox>
      }
        
      </div>
    ),
    
  },{
    title: 'Todos',
    dataIndex: 'title',
    width: '100vh',
    editable: true,
  },{
    title: 'Action',
    dataIndex: 'operation',
    render: (text, record) => (
      this.state.dataSource.length >= 1
        ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            <a href="javascrip">Delete</a>
          </Popconfirm>
        ) : null
    ),
  },
];

  componentDidMount(){
    if(this.props.todos){
      let todos = this.props.todos.filter(item => 
        item.userId === this.props.location.state.user_id);
      if(this.state.dataSource.length === 0){
        this.setState({
          dataSource: todos.map((item, key) => {return{...item, key}})
        })
      }
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.location !== prevProps.location || this.props.todos !== prevProps.todos){
      const todos = this.props.todos.filter(item => 
        item.userId === this.props.location.state.user_id
      );
      console.log('props.location changed')
      this.setState({
        dataSource: todos.map((item, key) => {return{...item, key}})
      })
    }
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    this.props.dispatch(todoDelete(dataSource[key].title))
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData },
      () => {this.props.dispatch(updateOldTodo(row))}, 
      () => console.log('item:', row));
  }

  render() {
    let { dataSource } = this.state; 
    const { error, loading } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    let columns = []
    if (dataSource.length !== 0) {
      columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
  }

    if(error){
      return <div>error! {error.message}</div>
    }

    if(loading){
      return <div style={{ textAlign: 'center', width: '100%', height: '80vh', lineHeight: '80vh' }}><Icon type="loading" /></div>
    }
    
    return (
      <div>
        <WrappedHorizontalAddTodoForm props={this.props}/>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={orderBy(dataSource, ['time'], ['desc'])}
          columns={columns}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos.items,
  loading: state.todos.loading,
  error: state.todos.error
});

export default connect(mapStateToProps)(EditableTable);