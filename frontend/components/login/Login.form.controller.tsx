import {useForm} from '@mantine/form'

import { FormEvent } from 'react'
import LoginFormView from './Login.form.view'
import { getRandomValues } from 'crypto'
export default function LoginFormController ({children}: any) {
  const form = useForm({
    initialValues:{
      email: '',
      password: '',
    },
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // }
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // if (!form.isValid())  {
    //   form.validate()
    //   return
    // }
  }

  return (
    <form onSubmit={handleSubmit}>
      <LoginFormView form={form}/>
    </form>
  )
}