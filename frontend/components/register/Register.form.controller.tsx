import { useForm, zodResolver } from '@mantine/form';
import { FormEvent } from 'react';
import RegisterFormView from './Register.form.view';
import { RegisterSchema } from '@/api/auth/schema';

export default function RegisterFormController() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(RegisterSchema),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.isValid()) {
      form.validate();
      return;
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <RegisterFormView form={form} />
    </form>
  );
}


