import { OrganizationRole, Prisma } from '@devflow/database';
import { prisma } from '@devflow/database/src/db';

export interface HasPermissionOptions {
  userId: string;
  organizationId: string;
  requiredRole: OrganizationRole;
}

/**
 * Check if a user has at least the required role in an organization.
 * Roles are hierarchical: OWNER > ADMIN > MANAGER > MEMBER > VIEWER
 */
export async function hasPermission({
  userId,
  organizationId,
  requiredRole,
}: HasPermissionOptions): Promise<boolean> {
  const membership = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  if (!membership) {
    return false;
  }

  return isRoleAtLeast(membership.role, requiredRole);
}

const roleHierarchy: Record<OrganizationRole, number> = {
  [OrganizationRole.OWNER]: 5,
  [OrganizationRole.ADMIN]: 4,
  [OrganizationRole.MANAGER]: 3,
  [OrganizationRole.MEMBER]: 2,
  [OrganizationRole.VIEWER]: 1,
};

export function isRoleAtLeast(
  actualRole: OrganizationRole,
  requiredRole: OrganizationRole
): boolean {
  return roleHierarchy[actualRole] >= roleHierarchy[requiredRole];
}

export async function getOrganizationRole(
  userId: string,
  organizationId: string
): Promise<OrganizationRole | null> {
  const membership = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  return membership?.role ?? null;
}

export async function getUserOrganizations(userId: string) {
  return prisma.organizationMember.findMany({
    where: { userId },
    include: {
      organization: true,
    },
  });
}
