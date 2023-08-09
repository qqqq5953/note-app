import { useContext } from 'react'
import { NotesContext } from '../context/NoteContext'

export default function useNotes() {
  return useContext(NotesContext)
}
