import { Container } from 'react-bootstrap'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Container className="py-4">
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/new" element={<h1>New Note</h1>}></Route>
        <Route path="/:id" element={<Layout />}>
          <Route path="edit" element={<Edit />}></Route>
        </Route>
      </Routes>
    </Container>
  )
}

export default App

function Layout() {
  return (
    <>
      <h1>Layout</h1>
      <Outlet></Outlet>
    </>
  )
}
function Edit() {
  return (
    <>
      <h1>Edit</h1>
    </>
  )
}
