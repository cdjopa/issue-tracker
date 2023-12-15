import { Paper, Title, Text, Anchor } from '@mantine/core';
import classes from './index.module.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        {children}
      </Paper>
    </div>
  );
}
