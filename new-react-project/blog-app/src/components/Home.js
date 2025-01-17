import Feed from './Feed';

const Home = ({ posts }) => {
 
    return (
      <main className="Home">
        { 
          posts.length ? 
          <Feed posts={posts} /> : 
          <h2>No post to display.</h2>
        }
      </main>
    )
  }
  
  export default Home
  