import Feed from './Feed';
import { useContext } from 'react';
import DataContext from '../contex/DataContext';

const Home = () => {
  const { posts, deleteMsg, isPostLoading, searchResults } = useContext(DataContext);

  return (
    <main className="Home">
      {deleteMsg && <h5 className="errorMsg">{deleteMsg}</h5>}
      { isPostLoading && <h5 className="successMsg">Loading posts...</h5>}
      <>
      { !isPostLoading && posts.length ? (
        <Feed posts={searchResults} />
      ) : (
        <h5 className="errorMsg">No post to display.</h5> 
      )}
      </>
    </main>
  );
};

export default Home;
