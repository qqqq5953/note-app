import { FormEvent, useRef, useState, useMemo, useEffect } from 'react'
import { Row, Col, Form, Stack, Button } from 'react-bootstrap'
import { MultiValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { Note } from '../App'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import useNotes from '../hooks/useNotes'

type NoteInputProps = {
  note?: Note
  submit: (note: Note) => void
}

export default function NoteInput({ note, submit }: NoteInputProps) {
  const navigate = useNavigate()
  const { tags, setTags, tagsObj } = useNotes()

  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  function submitForm(e: FormEvent) {
    e.preventDefault()

    const invalidInput = [null, undefined, '']
    if (
      invalidInput.includes(titleRef.current!.value) ||
      invalidInput.includes(markdownRef.current!.value)
    ) {
      return
    }

    const newNote = {
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
      id: note ? note.id : uuidv4()
    }

    submit(newNote)
    navigate('/')
  }

  function createTag(inputValue: string) {
    const id = uuidv4()
    setTags((prev) => [...prev, { value: id, label: inputValue }])
    setSelectedTags((prev) => [...prev, id])
  }

  const reactSelectTags = useMemo(() => {
    return selectedTags.map((tagId) => {
      return { value: tagId, label: tagsObj[tagId] }
    })
  }, [selectedTags])

  function selectTags(items: MultiValue<{ value: string; label: string }>) {
    setSelectedTags(items.map((item) => item.value))
  }

  useEffect(() => {
    titleRef.current!.value = note?.title || ''
    markdownRef.current!.value = note?.markdown || ''
    setSelectedTags(note?.tags || [])
  }, [note])

  return (
    <>
      <main>
        <Form className="d-flex flex-column gap-4" onSubmit={submitForm}>
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
            <Button type="submit">Save</Button>
            <Button variant="outline-secondary" onClick={() => navigate('..')}>
              Cancel
            </Button>
          </Stack>
        </Form>
      </main>
    </>
  )
}
