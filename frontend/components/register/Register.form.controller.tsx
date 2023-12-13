import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'
import { FormEvent } from 'react'
import RegisterFormView from './Register.form.view'


const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password cannot be shorter than 6 characters' }).max(32, { message: 'Password cannot be longer than 32 characters' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

export default function RegisterFormController() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: zodResolver(schema)

  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.isValid()) {
      form.validate()
      return
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <RegisterFormView form={form} />
    </form>
  )
}