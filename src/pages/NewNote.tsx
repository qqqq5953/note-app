import NoteInput from '../components/NoteInput'
import { Note } from '../App'
import { NotesContext } from '../context/NoteContext'
import { useContext } from 'react'

export default function NewNote() {
  const { setNotes } = useContext(NotesContext)

  function createNote(note: Note) {
    setNotes((prev) => [...prev, note])
  }

  return (
    <>
      <h1>New Note</h1>
      <NoteInput submit={createNote} />
    </>
  )
}
