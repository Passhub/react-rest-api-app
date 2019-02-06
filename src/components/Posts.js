import React from 'react';
import { connect } from "react-redux";
import { fetchPosts } from '../Actions/posts';
import { Icon } from 'antd';

class Posts extends React.Component {
  // state = {
  //   posts: null
  // }

  componentDidMount(){
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(responce => responce.json())
    //   .then(data => this.setState({ posts: data }));

    this.props.dispatch(fetchPosts());

  }

  render() {

    const { error, loading, posts, location } = this.props;

    if(error){
      return <div>error! {error.message}</div>
    }

    if(loading){
      return <div style={{ textAlign: 'center', width: '100%', height: '80vh', lineHeight: '80vh' }}><Icon type="loading" /></div>
    }

    return(
      <div>
        {/* {this.state.posts && this.state.posts.map((post) => {
          if(post.userId === this.props.location.state.user_id){
            return (
              <div key={post.id} style ={{ fontSize: 22 }}>
                {post.title} 
              </div>
            )
          }
        })
          
        } */}

        {
          posts.map((post) => {
            if(post.userId === location.state.user_id){
              return(
                <div key={post.id} style={{fontSize: 22}}>{post.title}</div>
              )
            }
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  loading: state.posts.loading,
  error: state.posts.error
});

export default connect(mapStateToProps)(Posts);