import { Container } from 'react-bootstrap'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NewNote from './pages/NewNote'
import Edit from './pages/Edit'
import useLocalStorage from './hooks/useLocalStorage'
import NoteContent from './components/NoteContent'

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>('note', [])

  return (
    <Container className="py-4">
      <Routes>
        <Route index element={<Home notes={notes} />}></Route>
        <Route path="/new" element={<NewNote setNotes={setNotes} />}></Route>
        <Route path="/:id" element={<Layout />}>
          <Route index element={<NoteContent notes={notes} />}></Route>
          <Route
            path="edit"
            element={<Edit setNotes={setNotes} notes={notes} />}
          ></Route>
        </Route>
      </Routes>
    </Container>
  )
}

export default App

function Layout() {
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}
