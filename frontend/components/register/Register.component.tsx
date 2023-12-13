import {
  Paper,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import classes from './index.module.css';
import RegisterFormController from './Register.form.controller';

export default function Register() {
  return (
    <div className={classes.wrapper} >
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>
        <RegisterFormController/>
        <Text ta="center" mt="md">
          Already have an account?{' '}
          <Anchor<'a'> href="/login" fw={700} >
           Login 
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}