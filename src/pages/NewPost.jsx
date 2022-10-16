import { redirect, useNavigate } from 'react-router-dom';

import NewPostForm from '../components/NewPostForm';
import { savePost } from '../util/api';

function NewPostPage() {
  const navigate = useNavigate();

  function cancelHandler() {
    navigate('/blog');
  }

  return (
    <>
      <NewPostForm onCancel={cancelHandler} submitting={false} />
    </>
  );
}

export default NewPostPage;

export async function newPostAction({ request }) {
  const formData = await request.formData();
  const post = {
    title: formData.get('title'),
    body: formData.get('post-text')
  };
  try {
    await savePost(post);
  } catch (err) {
    if (err === 422) {
      //thb
      throw err;
    }
    throw err;
  }
  return redirect('/blog');
}
