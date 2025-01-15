import { useState } from 'react'
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import logo from "../assets/Logo-Light.png"
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="border rounded-2xl bg-sky-100 my-2 text-black backdrop-blur-md sticky top-0 max-w-7xl mx-auto">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            className="rounded"
          />
        </div>
        <div className="hidden md:flex gap-2">
          <Button variant="ghost" asChild>
            <Link to="">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/new-vehicle">New Policy</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/dashboard">View Policy</Link>
          </Button>
          <Button variant="ghost" asChild>
            Logout
          </Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-2 px-4 pb-4">
          <Button variant="ghost" asChild>
            <Link to="" onClick={toggleMenu}>Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/new-vehicle" onClick={toggleMenu}>New Policy</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/dashboard" onClick={toggleMenu}>View Policy</Link>
          </Button>
          <Button variant="ghost" asChild>
            Logout
          </Button>
        </div>
      )}
    </nav>
  )
}