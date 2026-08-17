import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Gallery from './pages/Gallery'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="galeria" element={<Gallery />} />
          <Route path="nosotros" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
