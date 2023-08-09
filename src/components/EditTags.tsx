import { ChangeEvent } from 'react'
import { Modal, Stack, Form, Button } from 'react-bootstrap'
import useNotes from '../hooks/useNotes'

type EditTags = {
  show: boolean
  handleCancel: () => void
}

export default function EditTags({ show, handleCancel }: EditTags) {
  const { tags, setTags } = useNotes()

  function editTag(e: ChangeEvent<HTMLInputElement>, id: string) {
    setTags((prev) => {
      return prev.map((tag) => {
        if (tag.value === id) {
          return {
            value: tag.value,
            label: e.target.value
          }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags((prev) => prev.filter((tag) => tag.value !== id))
  }

  return (
    <>
      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3}>
            {tags.map((tag) => {
              return (
                <Stack direction="horizontal" gap={3} key={tag.value}>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      editTag(e, tag.value)
                    }
                  />
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteTag(tag.value)}
                  >
                    x
                  </Button>
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
