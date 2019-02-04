import React from 'react';



class FullInfo extends React.Component {

state = {
  user: null
}

static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.location.state.user !== prevState.user) {
    return {
      user: nextProps.location.state.user
    }
  }
  return null;         
}

componentDidUpdate = (prevProps, prevState) => {
    // if (prevState.user !== this.state.user) {
    //     this.setState({
    //         user: this.props.location.state.user},
    //         () => {console.log('Menu Item:',this.state.user)}
    //     )
    // }
    console.log(23232, this.props.location.state.user)
}
  

componentDidMount = async () =>{
  this.setState({
    user: this.props.location.state.user},
    () => {console.log('Menu Item:',this.state.user)}
  )
}

render() {
    if(this.state.user !== null){
      return(
        <div>
          <ul>
            <li>Full name: {this.state.user.name}</li>
            <li>Username: {this.state.user.username}</li>
            <li>Phone number: {this.state.user.phone}</li>
            <li>Website: {this.state.user.website}</li>
            <li>Address: {this.state.user.address.city}, st.{this.state.user.address.street}, {this.state.user.address.suite}, zip: {this.state.user.address.zipcode}</li>
            <li>Company: {this.state.user.company.name}</li>
          </ul>
        </div>
      )
    }
    else return <div>Hello!</div>
  }
}

export default FullInfo