'use client';

import { Title, Text, Anchor } from '@mantine/core';

import classes from '../layouts/auth/index.module.css';
import AuthLayout from '../layouts/auth/layout';
import Login from '@/components/login/Login.component';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Harbor Login
      </Title>
      <Login />
      <Text ta="center" mt="md">
        Don&apos;t have an account?{' '}
        <Anchor<'a'> href="/register" fw={700}>
          Sign Up
        </Anchor>
      </Text>
    </AuthLayout>
  );
}
