import { Card as CardBS, Badge, Stack } from 'react-bootstrap'
import { Note, Tag } from '../App'

type CardProps = {
  note: Note
}

export default function Card({ note }: CardProps) {
  return (
    <CardBS>
      <CardBS.Header>
        <CardBS.Title>{note.title}</CardBS.Title>
      </CardBS.Header>
      <CardBS.Body>
        <Stack direction="horizontal" gap={2}>
          {note.tags.map((tag: Tag) => {
            return <Badge key={tag.id}>{tag.label}</Badge>
          })}
        </Stack>
      </CardBS.Body>
    </CardBS>
  )
}
