import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { Note, TagsMap } from '../App'
import Card from '../components/Card'
import { NotesContext } from '../context/NoteContext'
import { useContext, useState } from 'react'
import EditTags from '../components/EditTags'

export default function Home() {
  const { notes, tags } = useContext(NotesContext)
  const [isEditTags, setIsEditTags] = useState<boolean>(false)

  const tagsObj = tags.reduce((obj: TagsMap, tag) => {
    obj[tag.value] = tag.label
    return obj
  }, {})

  return (
    <>
      <Row className="align-items-center">
        <Col className="h1">Notes</Col>
        <Col xs="auto">
          <div className="d-flex gap-2">
            <Link to="/new">
              <Button>Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setIsEditTags(true)}
            >
              Edit Tags
            </Button>
          </div>
        </Col>
      </Row>

      <EditTags show={isEditTags} handleCancel={() => setIsEditTags(false)} />

      <main>
        <Form>
          <Row>
            <Form.Group as={Col} xs={12} md={6} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect isMulti />
            </Form.Group>
          </Row>
        </Form>

        <Row className="mt-4">
          {notes.map((note: Note) => {
            return (
              <Col key={note.id} xs={12} md={6} lg={3} xl={4} className="mb-4">
                <Link to={`${note.id}`} className="text-decoration-none">
                  <Card note={note} tagsObj={tagsObj} />
                </Link>
              </Col>
            )
          })}
        </Row>
      </main>
    </>
  )
}
