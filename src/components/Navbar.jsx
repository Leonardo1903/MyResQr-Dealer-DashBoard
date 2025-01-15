import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-20F9zY0bCunjBxL13MGDoQIEiEbDUG.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/new-vehicle">New Policy</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/view-">View Policy</Link>
            </Button>
            <Button variant="ghost" asChild>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
