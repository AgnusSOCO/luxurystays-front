import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { PropertyManagement } from './pages/PropertyManagement'
import { About } from './pages/About'
import { PropertyDetail } from './pages/PropertyDetail'
import { BookingPage } from './pages/BookingPage'
import { ConfirmationPage } from './pages/ConfirmationPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="management" element={<PropertyManagement />} />
          <Route path="about" element={<About />} />
          <Route path="property/:id" element={<PropertyDetail />} />
          <Route path="property/:id/book" element={<BookingPage />} />
          <Route path="booking/confirm/:reservationId" element={<ConfirmationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
