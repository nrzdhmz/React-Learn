import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [activePostId, setActive] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setPosts(response.data.slice(0, 10));
      } catch (error) {
        console.error('Error');
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsPromises = posts.map(async (post) => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
          return { postId: post.id, comments: response.data };
        } catch (error) {
          return { postId: post.id, comments: [] };
        }
      });

        const commentsArray = await Promise.all(commentsPromises);
        const commentsObject = commentsArray.reduce((acc, { postId, comments }) => {
        
        acc[postId] = comments;
        return acc;
      }, {});

      setComments(commentsObject);
    };

    if (posts.length > 0) {
      fetchComments();
    }
  }, [posts]);

  const toggleComments = (postId) => {
    setActive(activePostId === postId ? "" : postId);
  };

  return (
    <div className="container">
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <img src={post.thumbnailUrl} alt={post.title} />
            <p>{post.title}</p>
            <button onClick={() => toggleComments(post.id)}>
              {activePostId === post.id ? 'Hide Comments' : 'Show Comments'}
            </button>
            {activePostId === post.id && (
              <div className="comments">
                {comments[post.id] && comments[post.id].map((comment) => (
                  <div key={comment.id} className="comment">
                    <p><b>{comment.name}:</b> {comment.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
