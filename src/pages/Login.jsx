import { useState } from 'react'
import PhoneNumberInput from '../components/PhoneNumberInput'
import OTPValidation from '../components/OTPValidation'
import { toast } from '../hooks/use-toast'

export default function LoginPage() {
  const [step, setStep] = useState('phone')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handlePhoneSubmit = (phone) => {
    setPhoneNumber(phone)
    setStep('otp')
    toast({
      title: 'OTP Sent',
      description: 'OTP has been sent to your phone',
      variant: 'default',
    })
    // Here you would typically call your API to generate and send the OTP
  }

  const handleOTPSubmit = (otp) => {
    console.log('OTP submitted:', otp)
    toast({
      title: 'OTP Validated',
      description: 'OTP has been validated successfully',
      variant: 'default',
    })
    // Here you would typically validate the OTP with your backend
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {step === 'phone' ? (
          <PhoneNumberInput onSubmit={handlePhoneSubmit} />
        ) : (
          <OTPValidation phoneNumber={phoneNumber} onSubmit={handleOTPSubmit} />
        )}
      </div>
    </div>
  )
}