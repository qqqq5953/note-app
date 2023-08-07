import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { Note } from '../App'
import Card from '../components/Card'

type HomeProps = {
  notes: Note[]
}

export default function Home({ notes }: HomeProps) {
  return (
    <>
      <Row className="align-items-center">
        <Col className="h1">Notes</Col>
        <Col xs="auto">
          <div className="d-flex gap-2">
            <Link to="/new">
              <Button>Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </div>
        </Col>
      </Row>
      notes:{JSON.stringify(notes)}
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
              <Col key={note.id} xs={12} md={6} lg={3} xl={4}>
                <Card note={note} />
              </Col>
            )
          })}
        </Row>
      </main>
    </>
  )
}
