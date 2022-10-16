import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

import Posts from '../components/Posts';
import { getSlowPosts } from '../util/api';

function DeferredBlogPostsPage() {
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p>Loading....</p>}>
        <Await
          resolve={loaderData.posts}
          errorElement={<p>Err loading blog post</p>}
        >
          {(loadedPost) => <Posts blogPosts={loadedPost} />}
        </Await>
      </Suspense>
      {/* <Posts blogPosts={loaderData} /> */}
    </>
  );
}

export default DeferredBlogPostsPage;

export async function defferLoader() {
  return defer({ posts: getSlowPosts() });
}
