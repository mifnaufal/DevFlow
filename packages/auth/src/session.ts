import { v4 as uuidv4 } from 'uuid';
import { prisma, Session, User } from '@devflow/database';

const SESSION_DURATION_DAYS = 30;

export interface CreateSessionOptions {
  userId: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function createSession({
  userId,
  ipAddress,
  userAgent,
}: CreateSessionOptions): Promise<Session> {
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  return prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
      ipAddress,
      userAgent,
    },
  });
}

export async function getSession(token: string): Promise<Session & { user: User } | null> {
  return prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { token },
  });
}

export async function deleteAllUserSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { userId },
  });
}

export async function extendSession(token: string): Promise<Session | null> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  return prisma.session.update({
    where: { token },
    data: { expiresAt },
  });
}
