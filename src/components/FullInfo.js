import React from 'react';

const FullInfo = (props) => {

    // console.log('rendered: ',props.location.state.user);
    if(props.location.state.user !== null){
    const { name, username, phone, website, address ,company} = props.location.state.user;

      return(
        <div>
          <ul>
            <li>Full name: {name}</li>
            <li>Username: {username}</li>
            <li>Phone number: {phone}</li>
            <li>Website: {website}</li>
            <li>Address: {address.city}, st.{address.street}, {address.suite}, zip: {address.zipcode}</li>
            <li>Company: {company.name}</li>
          </ul>
        </div>
      )
    }
    else return <div></div>
  }

export default FullInfo