import React from 'react';

import { orderBy } from 'lodash';

import 'antd/dist/antd.css';
import { Table, Popconfirm, Checkbox, Icon, Input, Button } from 'antd';

import { todoDelete, updateOldTodo, checkStatus } from '../Actions/todos';
import { connect } from "react-redux";
import EditableCell from './EditableTable';
import { EditableFormRow } from './EditableTable';
import { WrappedHorizontalAddTodoForm } from './Form';

const Search =Input.Search;

class EditableTable extends React.Component {

  state = {
    todos: null,
    dataSource: [],
    displayedData: [],
    checked: true,
    inputValue: '',
    searchText: '',
}

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined, fontSize: 16 }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });

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
    width: '80%',
    editable: true,
    ...this.getColumnSearchProps('title'),
  },{
    title: 'Action',
    dataIndex: 'operation',
    width: '20%',
    render: (text, record) => (
      this.state.dataSource.length >= 1
        ? ( 
            <div>
            <Popconfirm 
              title="Sure to delete?" 
              onConfirm={() => this.handleDelete(record.key)}
              placement="leftBottom"
            >
              <a href="javascrip">Delete</a>
            </Popconfirm>
            </div>
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
          dataSource: todos.map((item, key) => {return{...item, key}}),
          displayedData: this.state.dataSource,
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
        dataSource: todos.map((item, key) => {return{...item, key}}),
      })
    }
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
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
    let { dataSource, displayedData } = this.state; 
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
      <div style={{ height: '100%' }}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
          <WrappedHorizontalAddTodoForm props={this.props}
          />
          {/* <Search
            placeholder="input search text"
            onChange={this.handleSearch}
            //onSearch={(value) => {this.handleSearch(value)}}
            enterButton
            style={{ width: '29%', margin: 0, paddingTop: 3.5 }}
          /> */}
        </div>
        <Table
          style={{ zoom: 0.9 }}
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