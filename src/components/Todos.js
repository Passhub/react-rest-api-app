import React from 'react';

import { Table } from 'antd';

class Todos extends React.Component {

  columns = [{
    title: 'Todos',
    dataIndex: 'title',
    width: '80%'
  },{
    title: 'Action',
    dataIndex: 'completed',
    width: '20%'
  }
];

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  }

  state = {
    data: [],
    todos: null,
    selectedRowKeys: []
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(responce => responce.json())
      .then(data => this.setState({ todos: data }));
  }

  


  render() {
    if(this.state.todos !== null){
      this.state.todos.map((todo, index) =>{
        if(todo.userId === this.props.location.state.user_id){
          this.state.data.push({ 
            title: todo.title,
            completed: todo.completed,
            key: index
          })
          console.log('todo:', todo)
        }
      })
    }
    console.log('data:', this.state.data)
    return(
       <Table 
          dataSource={this.state.data}
          columns={this.columns} 
          rowSelection={this.rowSelection}
        /> 
      

      // <div>
      //   <ul>
      //   {this.state.todos && this.state.todos.map((todo) => {
      //     if(todo.userId === this.props.location.state.user_id){
      //       return (
      //         <li key={todo.id} style={{fontSize:22}}>{todo.title}</li>
      //       )
      //     }
      //   })
      //   }
      //   </ul>
      // </div>
    )
  }
}

export default Todos