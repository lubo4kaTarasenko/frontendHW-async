
export default class PostApi{
    
    getList(){
      return (fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      )
    }

}