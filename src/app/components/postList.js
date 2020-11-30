import React from 'react'
import PostApi from '../services/postApi';

export default class PostList extends React.Component {    
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: true,
        posts: []
      }
    }
    componentDidMount() {
        this.listOfPosts()
      }

    listOfPosts(){
        new PostApi().getList().then(
            (result) => {
              this.setState({
                isLoaded: true,
                posts: result
              });
            },
        )
    }

    renderPostsList(){
        const {error,  isLoaded, posts } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
          } else if (!isLoaded) {
            return <div>Loading...</div>
          } else {
            return(
                <div id='posts'>
                    { posts.map(post =>                
                        <div key={post.id} className="post">
                            <p><b> {post.title}</b> </p>
                            <p>{post.body}</p>
                        </div>           
                )}
            </div>
            )}
    }



    render() {
        return (
          <div> 
                <div className='header'>
                    <div className="inl left">Filter</div>
                    <div className='inl right'>Sort</div>
                </div>
                <div>
                    {this.renderPostsList()}
                </div>
          </div>  
        )}  
}
