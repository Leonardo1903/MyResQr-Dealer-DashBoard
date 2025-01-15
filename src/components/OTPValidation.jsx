import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"

function OTPValidation({ phoneNumber, onSubmit }) {
  const [otp, setOtp] = useState(['', '', '', ''])

  const handleChange = (element, index) => {
    if (isNaN(parseInt(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(otp.join(''))
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-black/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black text-center">Enter OTP</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-black text-center block">
              Enter the OTP sent to {phoneNumber}
            </Label>
            <div className="flex justify-evenly max-w-xs mx-auto">
              {otp.map((data, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  className="w-10 h-10 text-center bg-white/20 text-black border-gray-300"
                />
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white">
            Validate OTP
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default OTPValidation