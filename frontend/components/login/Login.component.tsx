import { Paper, Title, Text, Anchor } from '@mantine/core';
import classes from './index.module.css';
import LoginFormController from './Login.form.controller';

export default function Login() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Issue Tracker Login
        </Title>
        <LoginFormController />
        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="/register" fw={700}>
            Sign Up
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
