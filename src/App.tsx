import { Container } from 'react-bootstrap'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NewNote from './pages/NewNote'
import Edit from './pages/Edit'
import NoteContent from './pages/NoteContent'
import NotesProvider from './context/NoteContext'

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag['id'][]
}

export type Tag = {
  id: string
  label: string
}

export type ReactSelectTags = {
  value: string
  label: string
}

export type TagsMap = {
  [key in ReactSelectTags['value']]: ReactSelectTags['label']
}

function App() {
  return (
    <NotesProvider>
      <Container className="py-4">
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/new" element={<NewNote />}></Route>
          <Route path="/:id" element={<Layout />}>
            <Route index element={<NoteContent />}></Route>
            <Route path="edit" element={<Edit />}></Route>
          </Route>
        </Routes>
      </Container>
    </NotesProvider>
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
