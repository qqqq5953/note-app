import { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, Stack } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Note } from '../App'
import ReactMarkdown from 'react-markdown'
import Alert from '../components/Alert'

type NoteContentProps = {
  notes: Note[]
  setNotes: (value: Note[] | ((prev: Note[]) => Note[])) => void
}

export default function NoteContent({ notes, setNotes }: NoteContentProps) {
  const navigate = useNavigate()
  const { id } = useParams()
  const note = notes.find((note) => note.id === id)
  const [show, setShow] = useState<boolean>(false)

  function deleteNote(id: string) {
    if (!id) return

    setNotes((prev) => prev.filter((note) => note.id !== id))
    navigate('/', { replace: true })
  }

  useEffect(() => {
    if (note == null) navigate('/', { replace: true })
  }, [note])

  if (note == null) return null

  return (
    note && (
      <>
        <Row className="align-items-center">
          <Col>
            <h1>{note.title}</h1>
            <div>
              <Stack direction="horizontal" gap={2}>
                {note.tags.map((tag) => {
                  return <Badge key={tag.id}>{tag.label}</Badge>
                })}
              </Stack>
            </div>
          </Col>
          <Col xs="auto">
            <div className="d-flex gap-2">
              <Link to={`/${id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <Button variant="outline-danger" onClick={() => setShow(true)}>
                Delete
              </Button>
              <Button variant="outline-secondary">Edit Tags</Button>
            </div>
          </Col>

          <Alert
            message={note.title}
            show={show}
            handleCancel={() => setShow(false)}
          >
            <Button variant="outline-secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={() => deleteNote(id as string)}>
              Delete
            </Button>
          </Alert>
        </Row>

        <section className="mt-4">
          <ReactMarkdown children={note.markdown} />
        </section>
      </>
    )
  )
}
