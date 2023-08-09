import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { TagsMap, ReactSelectTags } from '../App'
import Card from '../components/Card'
import EditTags from '../components/EditTags'
import useNotes from '../hooks/useNotes'
import { useMemo, useState } from 'react'

export default function Home() {
  const { notes, tags, tagsObj } = useNotes()
  const [isEditTags, setIsEditTags] = useState(false)
  const [filteredTitle, setFilteredTitle] = useState('')
  const [filteredTags, setFilteredTags] = useState<ReactSelectTags[]>([])

  const filteredNotes = useMemo(() => {
    if (!filteredTitle && filteredTags.length === 0) return notes

    const tagObj = filteredTags.reduce((obj: TagsMap, item) => {
      obj[item.value] = item.label
      return obj
    }, {})

    if (filteredTitle && filteredTags.length === 0) {
      return notes.filter((note) => {
        return note.title
          .toLocaleLowerCase()
          .includes(filteredTitle.toLocaleLowerCase())
      })
    }

    if (!filteredTitle && filteredTags.length !== 0) {
      return notes.filter((note) => {
        return note.tags.some((tagId) => tagObj[tagId] != undefined)
      })
    }

    return notes.filter((note) => {
      const noteCondition = note.title
        .toLocaleLowerCase()
        .includes(filteredTitle.toLocaleLowerCase())
      const tagCondition = note.tags.some((tagId) => tagObj[tagId] != undefined)

      return noteCondition && tagCondition
    })
  }, [filteredTitle, filteredTags])

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
              <Form.Control
                type="text"
                value={filteredTitle}
                onChange={(e) => setFilteredTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                isMulti
                options={tags}
                onChange={(items) => setFilteredTags([...items])}
              />
            </Form.Group>
          </Row>
        </Form>

        <Row className="mt-4">
          {filteredNotes.map((note) => {
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
