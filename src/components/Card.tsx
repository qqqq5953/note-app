import { Card as CardBS, Badge, Stack } from 'react-bootstrap'
import { Note, TagsMap } from '../App'

type CardProps = {
  note: Note
  tagsObj: TagsMap
}

export default function Card({ note, tagsObj }: CardProps) {
  return (
    <CardBS>
      <CardBS.Header>
        <CardBS.Title>{note.title}</CardBS.Title>
      </CardBS.Header>
      <CardBS.Body>
        <Stack direction="horizontal" gap={2}>
          {note.tags.map((tagId) => {
            return <Badge key={tagId}>{tagsObj[tagId]}</Badge>
          })}
        </Stack>
      </CardBS.Body>
    </CardBS>
  )
}
