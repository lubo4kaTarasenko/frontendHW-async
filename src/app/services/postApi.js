export default class PostApi{
    
    getList(){
      return (fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      )
    }

    deleteItem(id){
      return (fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method: "DELETE"})
      .then(response => response.json())
      )
    }
}