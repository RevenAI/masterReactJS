import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';
import DataContext from "../contex/DataContext";
import { catchErr, clearSetData } from "../utils/helpers";
import api from "../apiRequest/apiRequest";

const EditPost = () => {
    const [editBody, setEditBody] = useState("");
    const [editOkMessage, setEditOkMessage] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editErrors, setEditErrors] = useState(null);
   
    const navigate = useNavigate();
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id.toString());
    const errStyling = { color: 'red', textAlign: 'center' };

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    const handleEdit = async (id) => {
        const editedPost = { id, title: editTitle, body: editBody, datetime: new Date().toISOString() };
    
        try {
          const response = await api.put(`/posts/${id}`, editedPost);
          setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id.toString() === id.toString() ? { ...post, ...response.data } : post))
          );
          setEditOkMessage(response.data.message);
          setEditTitle("");
          setEditBody("");
          navigate(`/post/${id}`);
          clearSetData(setEditOkMessage, 3000);
        } catch (err) {
          catchErr(err, setEditErrors);
        }
      };



    if (!post) {
        return <>
        <h3 style={errStyling}>No post found.</h3>
      
        <h3><Link to={ '/' }>Visit Our Homepage</Link></h3>
        </>
      }

  return (
    //Note: I left the the css Ids and classes with newPost are left because I want to apply the same styling for newPost on them.
    <main className='NewPost'>
    <h2 style={{color: 'green', textAlign: 'center'}}>Edit Post</h2>
    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='newPostTitle'>Post Title</label>
        <input
        id='newPostTitle'
        type='text'
        required
        value={ editTitle }
        onChange={ (e) => setEditTitle(e.target.value) }
        />

        <label htmlFor='newPostBody'>New Post</label>
        <textarea
        id='newPostBody'
        required
        value={ editBody }
        onChange={ (e) => setEditBody(e.target.value) }
        />

        { editOkMessage && <h5 className='successMsg'>{editOkMessage}</h5> }
        { editErrors && <h5 className='errorMsg'>{editErrors}</h5> }
        <button type='submit' onClick={ () => handleEdit(post.id) }>
            Edit Post
        </button>
    </form>
   </main>
  )
}

export default EditPost