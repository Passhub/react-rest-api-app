import React from 'react';
import 'antd/dist/antd.css';
import {
  Table, Input, Button, Popconfirm, Form, Checkbox, Icon
} from 'antd';

import { connect } from "react-redux";
import { fetchTodos } from '../Actions/todos';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditableTable extends React.Component {

  state = {
    todos: null,
    dataSource: [],
}

  columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    width: '9vh',
    render: () => (<Checkbox style={{ marginLeft: 15 }}></Checkbox>),
    
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
            <a href="javascript:;">Delete</a>
          </Popconfirm>
        ) : null
    ),
  },
];


  // onChange(e) {
  //   console.log(`checked = ${e.target.checked}`);
  // }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { dataSource } = this.state;
    const newData = {
      operation: 'operation',
      title: `Added Title overhere!`,
      key: this.state.dataSource.length,
    };
    this.setState({
      dataSource: [...dataSource, newData],
    });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  handleDataAdd = (element) => {
    this.setState((prevState, element) => ({
        dataSource: prevState.employers.concat(element)
    }), () => {
        console.log('handleDataAdd AFTER', this.state.dataSource);
    }); 
}

  componentDidMount(){
    // fetch('https://jsonplaceholder.typicode.com/todos')
    //   .then(responce => responce.json())
    //   .then(data => this.setState({ todos: data}));

    this.props.dispatch(fetchTodos());
  }
  componentDidUpdate(prevProps){ 
    let todos = this.props.todos;
    // console.log('location:', this.props)

    if(this.props.todos){
      todos = this.props.todos.filter(item => 
        item.userId === this.props.location.state.user_id);
        // console.log('changed todos:', todos);

    if(this.state.dataSource.length === 0){
      this.setState({
        dataSource: todos.map((item, key) => {return{...item, key}})
      })
    }    
    else if(this.props.location.key !== prevProps.location.key){
      // console.log('location changed')
      this.setState({
        dataSource: todos.map((item, key) => {return{...item, key}})
      })
    }
  }
  }

  render() {

    const { dataSource } = this.state;

    const { error, loading } = this.props;


    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
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

    if(error){
      return <div>error! {error.message}</div>
    }

    if(loading){
      return <div style={{ textAlign: 'center', width: '100%', height: '80vh', lineHeight: '80vh' }}><Icon type="loading" /></div>
    }
    
    return (
      
      <div>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add a todo
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
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