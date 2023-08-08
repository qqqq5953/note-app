import { FormEvent, useContext } from 'react'
import { Modal, Stack, Form, Button } from 'react-bootstrap'
import { NotesContext } from '../context/NoteContext'

type EditTags = {
  show: boolean
  handleCancel: () => void
}

export default function EditTags({ show, handleCancel }: EditTags) {
  const { tags, setTags } = useContext(NotesContext)

  function editTag(e: FormEvent, id: string) {
    setTags((prev) => {
      return prev.map((tag) => {
        if (tag.value === id) {
          return {
            value: tag.value,
            label: (e.target as HTMLInputElement).value
          }
        } else {
          return tag
        }
      })
    })
  }

  return (
    <>
      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3}>
            {tags.map((tag, i) => {
              return (
                <Stack direction="horizontal" gap={3} key={tag.value}>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => editTag(e, tag.value)}
                  />
                  <Button variant="outline-danger">x</Button>
                </Stack>
              )
            })}
          </Stack>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}
