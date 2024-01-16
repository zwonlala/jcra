import axios from 'axios';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import About from '../component/About/About';
import Error from '../component/Error';
import Main from '../component/Main/Main';
import Todo from '../component/Todo/Todo';

/** mock api url */
const URL = 'https://yts.mx/api/v2/list_movies.json';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios(URL);
      console.log('SJW', data);
      console.log('SJW2', data.data.data);
    };
    fetchData();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <Error />,
    },
    {
      path: 'about',
      element: <About />,
      errorElement: <Error />,
    },
    {
      path: 'todo',
      element: <Todo />,
      errorElement: <Error />,
    },
    {
      path: '*',
      element: (
        <div>
          <h1>404</h1>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
