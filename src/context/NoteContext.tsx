import { createContext, ReactNode } from 'react'
import { Note, ReactSelectTags, TagsMap } from '../App'
import useLocalStorage from '../hooks/useLocalStorage'

type NotesContext = {
  notes: Note[]
  setNotes: (value: Note[] | ((prev: Note[]) => Note[])) => void
  tags: ReactSelectTags[]
  setTags: (
    value: ReactSelectTags[] | ((prev: ReactSelectTags[]) => ReactSelectTags[])
  ) => void
  tagsObj: TagsMap
}

type NotesProviderProps = {
  children: ReactNode
}

export const NotesContext = createContext({} as NotesContext)

export default function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useLocalStorage<Note[]>('note', [])
  const [tags, setTags] = useLocalStorage<ReactSelectTags[]>('tags', [])
  const tagsObj = tags.reduce((obj: TagsMap, tag: TagsMap) => {
    obj[tag.value] = tag.label
    return obj
  }, {})

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        tags,
        setTags,
        tagsObj
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}
