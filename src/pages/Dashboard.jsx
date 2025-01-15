import { NavBar } from "../components/Navbar"
import { SearchForm } from "../components/SearchForm"
import { PolicyTable } from "../components/Table"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto py-6 space-y-6">
        <SearchForm />
        <PolicyTable />
      </main>
    </div>
  )
}

