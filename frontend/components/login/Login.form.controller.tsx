import { useForm, zodResolver } from '@mantine/form';
import AuthController from '@/api/auth/auth.controller';
import { FormEvent } from 'react';
import LoginFormView from './Login.form.view';
import { LoginSchema } from '@/api/auth/schema';
export default function LoginFormController({ children }: any) {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(LoginSchema),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await new AuthController().login(form.values);
    if (!res) throw new Error('Server Error');
    if (res.error) alert('Invalid Credentials');
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginFormView form={form} />
    </form>
  );
}
