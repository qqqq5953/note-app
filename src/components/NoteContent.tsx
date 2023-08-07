import { useEffect } from 'react'
import { Row, Col, Button, Badge, Stack } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Note } from '../App'
import ReactMarkdown from 'react-markdown'

type NoteContentProps = {
  notes: Note[]
}

export default function NoteContent({ notes }: NoteContentProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const note = notes.find((note) => note.id === id)

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
              <Button variant="outline-danger">Delete</Button>
              <Button variant="outline-secondary">Edit Tags</Button>
            </div>
          </Col>
        </Row>

        <section className="mt-4">
          <ReactMarkdown children={note.markdown} />
        </section>
      </>
    )
  )
}
