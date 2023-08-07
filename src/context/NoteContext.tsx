import { createContext, ReactNode } from 'react'
import { Note, ReactSelectTags } from '../App'
import useLocalStorage from '../hooks/useLocalStorage'

type NotesContext = {
  notes: Note[]
  setNotes: (value: Note[] | ((prev: Note[]) => Note[])) => void
  tags: ReactSelectTags[]
  setTags: (
    value: ReactSelectTags[] | ((prev: ReactSelectTags[]) => ReactSelectTags[])
  ) => void
}

export const NotesContext = createContext({} as NotesContext)

type NotesProviderProps = {
  children: ReactNode
}

export default function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useLocalStorage<Note[]>('note', [])
  const [tags, setTags] = useLocalStorage<ReactSelectTags[]>('tags', [])

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        tags,
        setTags
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}
