import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Chats from './pages/Chats'
import ChatBox from './pages/ChatBox'
import Friends from './pages/Friends'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Layout from './pages/Layout'
import {useUser} from '@clerk/clerk-react'
import {Toaster} from 'react-hot-toast'

const App = () => {
  const {user} = useUser();
  return (
    <>
    <Toaster />
      <Routes>
        <Route path='/' element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path='chats' element={<Chats />} />
          <Route path='chats/:userId' element={<ChatBox />} />
          <Route path='friends' element={<Friends />} />
          <Route path='explore' element={<Explore />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/:profileId' element={<Profile />} />
          <Route path='create-post' element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App