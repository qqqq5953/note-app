import NoteInput from '../components/NoteInput'
import { Note } from '../App'

type NewNoteProps = {
  setNotes: (value: Note[] | ((prev: Note[]) => Note[])) => void
}

export default function NewNote({ setNotes }: NewNoteProps) {
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
