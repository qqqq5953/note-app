import NoteInput from '../components/NoteInput'
import { Note } from '../App'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

type EditProps = {
  notes: Note[]
  setNotes: (value: Note[] | ((prev: Note[]) => Note[])) => void
}

export default function Edit({ setNotes, notes }: EditProps) {
  const { id } = useParams()
  const navigate = useNavigate()
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
