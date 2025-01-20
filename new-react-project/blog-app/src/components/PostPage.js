import { useParams, Link, useNavigate } from "react-router";
import api from "../apiRequest/apiRequest";
import { useContext, useState } from "react";
import DataContext from "../contex/DataContext";
import { catchErr, clearSetData } from "../utils/helpers";

const PostPage = () => {
  const [deleteErrors, setDeleteErrors] = useState(null);

  const { posts, setPosts, postOkMessage, setDeleteMsg } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();
 
  const post = posts.find((post) => post?.id?.toString() === id?.toString());

  if (!post) {
    return <>
    <h3 className='errorMsg'>No post found.</h3>
    <h3><Link to={ '/' }>Visit Our Homepage</Link></h3>
    </>
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const deletedPost = posts.find((p)=>p.id.toString()===id.toString());
      setPosts((prevPosts) => prevPosts.filter((post) => post.id.toString() !== id.toString()));
      setDeleteMsg(`Post with title: ${ deletedPost.title } has been successfully deleted.`);
      navigate('/');
      clearSetData(setDeleteMsg, 3000);
    } catch (err) {
      catchErr(err, setDeleteErrors);
    }
  };

   return (
      <main className='PostPage'>
       <article className='post'>
      <>
       <h2>{ post.title }</h2>
       { postOkMessage && <h5 className='successMsg'>{postOkMessage}</h5> }

       <p className='postDate'>{ post.datetime }</p>
        <p className='postBody'>{ post.body }</p>

        { deleteErrors && <h5 className='errorMsg'>{deleteErrors}</h5> }
        <Link to={`/edit/${post.id}`}>
        <button className='editButton' type='button'>
          Edit Post
        </button>
        </Link>
        <button className='deleteButton' type='button' onClick={ () => handleDelete(post.id.toString()) }>
          Delete Post
        </button>
      </>
       </article>
      </main>
    )
  }
  
  export default PostPage
  