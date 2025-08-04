import React, { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import { api } from '../services/api';

    const PostDetailPage = () => {
      const { id } = useParams();
      const [post, setPost] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        // We need a new backend endpoint for a single post
        const fetchPost = async () => {
          try {
            const { data } = await api.get(`/posts/${id}`);
            setPost(data);
          } catch (error) {
            console.error("Failed to fetch post", error);
          } finally {
            setLoading(false);
          }
        };
        fetchPost();
      }, [id]);

      if (loading) return <p>Loading...</p>;
      if (!post) return <p>Post not found.</p>;

      return (
        <div className="container my-5">
          <h1 className="mb-3">{post.title}</h1>
          <p className="text-muted">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
          <img src={post.imageUrl} alt={post.title} className="img-fluid rounded my-4" />
          <div style={{ lineHeight: '1.8' }}>{post.content}</div>
        </div>
      );
    };

    export default PostDetailPage;