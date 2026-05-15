import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Contact from '../components/Contact'
import OrderModal from '../components/OrderModal'
import { useState } from 'react'

export default function Home() {
  const [orderOpen, setOrderOpen] = useState(false)
  return (
    <>
      <Hero onOrder={() => setOrderOpen(true)} />
      <Services />
      <About />
      <Contact />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  )
}
