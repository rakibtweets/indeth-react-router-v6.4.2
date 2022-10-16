import { useLoaderData } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import { getPost } from '../util/api';

function PostDetailPage() {
  const postData = useLoaderData();
  return (
    <>
      <BlogPost title={postData.title} text={postData.body} />
    </>
  );
}

export default PostDetailPage;

export function postDetialsLoader({ request, params }) {
  // request: Data ,params: url parameter
  const postId = params.id; // get this from router loader props
  return getPost(postId);
}
