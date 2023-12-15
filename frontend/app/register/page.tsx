'use client';
import { Title, Text, Anchor } from '@mantine/core';
import classes from '../layouts/auth/index.module.css';
import Register from '@/components/register/Register.component';
import AuthLayout from '../layouts/auth/layout';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Harbor Sign Up
      </Title>
      <Register />
      <Text ta="center" mt="md">
        Already have an account?{' '}
        <Anchor<'a'> href="/login" fw={700}>
          Login
        </Anchor>
      </Text>
    </AuthLayout>
  );
}
