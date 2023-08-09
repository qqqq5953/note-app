import NoteInput from '../components/NoteInput'
import { Note } from '../App'
import useNotes from '../hooks/useNotes'

export default function NewNote() {
  const { setNotes } = useNotes()

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
