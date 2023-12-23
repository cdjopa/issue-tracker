'use client';
import { Project } from '@/api/project/fetch-projects';
import { IconClock, IconPencil, IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
  Box,
  rgba,
  ThemeIcon,
} from '@mantine/core';
import classes from './project-card.module.css';
import Link from 'next/link';

export function ProjectCard({ project }: { project: Project }) {
  const linkProps = {
    href: `/projects/${project.id}`,
  };
  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" className={classes.card} style={{ maxWidth: '600px' }}>
      <Card.Section pos="relative">
        <Link {...linkProps}>
          <Image
            src={`https://source.unsplash.com/random/?lighthouse&${Math.floor(Math.random() * 10)}`}
            height={125}
          />
        </Link>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={{ from: 'green', to: 'lime' }}>
        Active
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {project.name}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {project.summary}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          {/* <Avatar src="" size={24} radius="xl" mr="xs" /> */}
          <ThemeIcon mr="xs" className={classes.icon}>
            <IconClock style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[7]} />
          </ThemeIcon>
          <Text fz="xs" inline>
            {new Date(project.start_date).toDateString()} {' - '}
            {new Date(project.target_end_date).toDateString()}
          </Text>
        </Center>

        <ActionIcon className={classes.action}>
          <IconPencil style={{ width: rem(16), height: rem(16) }} color={theme.colors.gray[6]} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
