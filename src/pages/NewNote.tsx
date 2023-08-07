import { FormEvent, useRef, useState, useMemo } from 'react'
import { Row, Col, Form, Stack, Button } from 'react-bootstrap'
import { MultiValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { Tag, Note } from '../App'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'

type ReactSelectTags = {
  value: string
  label: string
}

type NewNoteProps = {
  setNotes: (value: Note[] | ((prev: Note[]) => Note[])) => void
}

export default function NewNote({ setNotes }: NewNoteProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [tags, setTags] = useLocalStorage<ReactSelectTags[]>('tags', [])

  const navigate = useNavigate()

  function addNote(e: FormEvent) {
    e.preventDefault()

    const invalidInput = [null, undefined, '']
    if (
      invalidInput.includes(titleRef.current!.value) ||
      invalidInput.includes(markdownRef.current!.value)
    ) {
      return
    }

    const newNote: Note = {
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
      id: uuidv4()
    }

    console.log('newNote', newNote)

    setNotes((prev: Note[]) => [...prev, newNote])
    navigate('/')
  }

  function createTag(inputValue: string) {
    const id = uuidv4()
    setTags((prev: Tag[]) => [...prev, { value: id, label: inputValue }])
    setSelectedTags((prev) => [...prev, { id, label: inputValue }])
  }

  const reactSelectTags = useMemo(() => {
    return selectedTags.map((tag) => {
      return { value: tag.id, label: tag.label }
    })
  }, [selectedTags])

  function selectTags(items: MultiValue<{ value: string; label: string }>) {
    setSelectedTags(
      items.map((item) => {
        return {
          id: item.value,
          label: item.label
        }
      })
    )
  }
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <main>
        <Form className="d-flex flex-column gap-4" onSubmit={addNote}>
          <Row className="gap-4 gap-md-0">
            <Form.Group as={Col} xs={12} md={6} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" ref={titleRef} />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                isMulti
                options={tags}
                onCreateOption={createTag}
                onChange={selectTags}
                value={reactSelectTags}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={15} ref={markdownRef} />
          </Form.Group>
          <Stack gap={4} direction="horizontal" className="justify-content-end">
            <Button onClick={addNote}>Save</Button>
            <Button variant="outline-secondary" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </Stack>
        </Form>
      </main>
    </>
  )
}
