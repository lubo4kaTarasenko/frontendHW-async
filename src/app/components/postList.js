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
        this.loadListOfPosts()
      }

    loadListOfPosts(){
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
                <div className='post_cont'>
                  <div className='post_title left'><b> {post.title}</b></div> 
                  <div className='post_title right'>
                    <button className='delete'>&#10060;</button></div> 
                </div>
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
          <div className="inl left">
            <input type="text" className='beauty' onChange={(event)=>{this.filterPosts(event.target.value)}}/>
          </div>
          <div className='inl right'>
            <select id='sort' className='beauty' onChange={(event)=>{this.sortPosts(event.target.value)}}>
              <option>Default sort</option>
              <option>Sort A-Z</option>
              <option>Sort Z-A</option>
            </select>
          </div>
        </div>
        <div>
            {this.renderPostsList()}
        </div>
      </div>  
  )}  

  sortPosts(val){   
    if(val === "Sort A-Z"){
      const newSort = this.state.posts.sort((a,b)=>{ return a.title < b.title  ? -1 : 1 })
      this.setState({posts: newSort })
    }
    else if (val === 'Sort Z-A' ){
      const newSort = this.state.posts.sort((a,b)=>{ return a.title > b.title  ? -1 : 1 })
      this.setState({posts: newSort })
    }
    else{
      this.loadListOfPosts()
    }  
  }
  
  filterPosts(val){
    const value = val.toLowerCase()
    const filteredList = this.state.posts.filter( p => p.title.includes(value));
    this.setState({posts: filteredList })
  }
}
