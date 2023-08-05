import { Row, Col, Button, Form } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'

export default function Home() {
  return (
    <>
      <Row className="align-items-center">
        <Col className="h1">Notes</Col>
        <Col xs="auto">
          <div className="d-flex gap-2">
            <Button>Create</Button>
            <Button variant="outline-secondary">Edit Tags</Button>
          </div>
        </Col>
      </Row>

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
      </main>
    </>
  )
}
