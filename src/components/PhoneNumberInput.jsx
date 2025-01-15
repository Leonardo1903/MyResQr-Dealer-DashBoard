import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"

function PhoneNumberInput({ onSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(phoneNumber)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-black/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black text-center">Dealer Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-black">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-white/20 text-black placeholder-gray-300 border-gray-300"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 hover:scale-105 transition-all ease-in-out duration-200 text-white">
            Generate OTP
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default PhoneNumberInput