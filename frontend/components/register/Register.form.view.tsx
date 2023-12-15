import { TextInput, PasswordInput, Checkbox, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

interface Props {
  form: typeof useForm;
}
export default function RegisterFormView({ form }: any) {
  return (
    <>
      <TextInput
        label="Email address"
        placeholder="user@gmail.com"
        size="md"
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Retype password"
        mt="md"
        size="md"
        {...form.getInputProps('confirmPassword')}
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button type="submit" fullWidth mt="xl" size="md">
        Sign Up
      </Button>
    </>
  );
}
