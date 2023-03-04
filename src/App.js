import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import MainLayout from './app/components/MainLayout'
import { Suspense } from 'react'
import { wait } from './ultis'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = lazy(() => wait(1000).then(() => import('./app/pages/Home')))
const Blog = lazy(() => wait(1000).then(() => import('./app/pages/Blog')))
const CreateBlog = lazy(() =>
  wait(1000).then(() => import('./app/pages/CreateBlog'))
)
const NotFound = lazy(() =>
  wait(1000).then(() => import('./app/pages/NotFound'))
)

function App() {
  const elements = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/create',
      element: <CreateBlog />
    },
    {
      path: '/:blogId',
      element: <Blog />
    },
    {
      path: '/edit/:blogId',
      element: <CreateBlog />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return (
    <>
      <MainLayout>
        <Suspense>{elements}</Suspense>
      </MainLayout>
    </>
  )
}

export default App
