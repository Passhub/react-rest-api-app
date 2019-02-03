import React from 'react';



class FullInfo extends React.Component {

    state = {
        user: null
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