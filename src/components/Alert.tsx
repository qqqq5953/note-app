import { ReactNode } from 'react'
import { Modal } from 'react-bootstrap'

type AlertProps = {
  children: ReactNode
  message: string
  show: boolean
  handleCancel: () => void
}

export default function Alert({
  children,
  message,
  show,
  handleCancel
}: AlertProps) {
  return (
    <>
      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>{children}</Modal.Footer>
      </Modal>
    </>
  )
}
