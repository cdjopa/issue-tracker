import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';

interface Props {
  form: typeof useForm
}
export default function LoginFormView({form}: any) {
  return (
    <>
      <TextInput label="Email address" placeholder="hello@gmail.com" size="md" 
      {...form.getInputProps('email')}
      />
      <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" 
      {...form.getInputProps('password')}
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button type="submit" fullWidth mt="xl" size="md">
        Login
      </Button>
    </>
  )
}