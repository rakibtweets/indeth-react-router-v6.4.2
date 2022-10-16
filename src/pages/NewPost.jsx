import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation
} from 'react-router-dom';

import NewPostForm from '../components/NewPostForm';
import { savePost } from '../util/api';

function NewPostPage() {
  const data = useActionData();
  console.log('NewPostPage ~ data', data);
  const navigate = useNavigate();
  const navigation = useNavigation();

  function cancelHandler() {
    navigate('/blog');
  }

  return (
    <>
      {data && data.status && <p>{data.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === 'submitting'}
      />
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
      return err;
    }
    throw err;
  }
  return redirect('/blog');
}
