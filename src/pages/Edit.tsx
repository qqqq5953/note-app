import NoteInput from '../components/NoteInput'
import { Note } from '../App'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { NotesContext } from '../context/NoteContext'
import { useContext } from 'react'

export default function Edit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { notes, setNotes } = useContext(NotesContext)
  const note = notes.find((note) => note.id === id)

  function editNote(note: Note) {
    setNotes((prevNotes: Note[]) => {
      return prevNotes.map((prevNote) => {
        if (prevNote.id === note.id) {
          return note
        } else {
          return prevNote
        }
      })
    })
  }

  useEffect(() => {
    if (note == null) navigate('/', { replace: true })
  }, [note])

  return (
    <>
      <h1>Edit</h1>
      <NoteInput note={note} submit={editNote} />
    </>
  )
}
