import React from 'react';

class Posts extends React.Component {
  state = {
    posts: null
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(responce => responce.json())
      .then(data => this.setState({ posts: data }));
  }

  render() {
    return(
      <div>
        {this.state.posts && this.state.posts.map((post) => {
          if(post.userId === this.props.location.state.user_id){
            return (
              <div key={post.id} style ={{ fontSize: 22 }}>
                {post.title} 
              </div>
            )
          }
        })
          
        }
      </div>
    )
  }
}

export default Posts