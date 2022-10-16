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
import DeferredBlogPostsPage, { defferLoader } from './pages/DeferredBlogPosts';

// Route Defination: Create Routes By Elements
const ElementRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<WelcomePage />} />
      <Route
        path="/blog"
        element={<BlogLayout />}
        // errorElement={<p>An Error occured !</p>}
      >
        {/* <Route index element={<BlogPostsPage />} loader={blogPostsLoader} /> */}
        <Route
          index
          element={<DeferredBlogPostsPage />}
          loader={defferLoader}
        />
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

// Route Defination: Create Routes Bt Elements

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <WelcomePage />
      },
      {
        path: '/blog',
        element: <BlogLayout />,
        children: [
          {
            index: true,
            element: <DeferredBlogPostsPage />,
            loader: defferLoader
          },
          {
            path: ':id',
            element: <PostDetailPage />,
            loader: postDetialsLoader
          }
        ]
      },
      {
        path: '/blog/new',
        element: <NewPostPage />,
        loader: newPostAction
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
