import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes
} from 'react-router-dom';

import BlogLayout from './pages/BlogLayout';
import BlogPostsPage, { loader as blogPostsLoader } from './pages/BlogPosts';
import NewPostPage, { newPostAction } from './pages/NewPost';
import PostDetailPage, { postDetialsLoader } from './pages/PostDetail';
import RootLayout from './components/RootLayout';
import WelcomePage from './pages/Welcome';
import Error from './pages/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<WelcomePage />} />
      <Route
        path="/blog"
        element={<BlogLayout />}
        // errorElement={<p>An Error occured !</p>}
      >
        <Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
        <Route
          path=":id"
          element={<PostDetailPage />}
          loader={postDetialsLoader}
        />
      </Route>
      <Route
        path="/blog/new"
        element={<NewPostPage />}
        action={newPostAction}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
