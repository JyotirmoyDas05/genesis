import 'server-only';

import { ApiResponse } from '@/server/contracts/common';
import { serverFetch } from '@/server/http';
import { IS_MOCK_MODE } from '@/config/env';
import {
  AddMemberRequest,
  CreateWorkspaceRequest,
  MemberResponse,
  MemberRole,
  UpdateWorkspaceRequest,
  WorkspaceResponse,
} from './workspace.contracts';
import {
  addMockWorkspace,
  deleteMockWorkspace,
  getMockMembers,
  getMockWorkspaceById,
  getMockWorkspaces,
  updateMockWorkspace,
} from '@/server/mock-data';

/**
 * Server-side wrappers around the workspace endpoints. They read auth from
 * cookies via `serverFetch` and are safe to call from Server Components / Actions.
 */

export async function listWorkspaces(): Promise<WorkspaceResponse[]> {
  if (IS_MOCK_MODE) {
    return getMockWorkspaces();
  }
  const res = await serverFetch<ApiResponse<WorkspaceResponse[]>>('/api/workspaces');
  return res.data;
}

export async function createWorkspace(
  request: CreateWorkspaceRequest,
): Promise<WorkspaceResponse> {
  if (IS_MOCK_MODE) {
    return addMockWorkspace(request);
  }
  const res = await serverFetch<ApiResponse<WorkspaceResponse>>('/api/workspaces', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return res.data;
}

export async function getWorkspaceById(id: string): Promise<WorkspaceResponse> {
  if (IS_MOCK_MODE) {
    return getMockWorkspaceById(id);
  }
  const res = await serverFetch<ApiResponse<WorkspaceResponse>>(`/api/workspaces/${id}`);
  return res.data;
}

export async function updateWorkspace(
  id: string,
  request: UpdateWorkspaceRequest,
): Promise<WorkspaceResponse> {
  if (IS_MOCK_MODE) {
    return updateMockWorkspace(id, request.name, request.description);
  }
  const res = await serverFetch<ApiResponse<WorkspaceResponse>>(`/api/workspaces/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
  return res.data;
}

export async function deleteWorkspace(id: string): Promise<void> {
  if (IS_MOCK_MODE) {
    deleteMockWorkspace(id);
    return;
  }
  await serverFetch<void>(`/api/workspaces/${id}`, { method: 'DELETE' });
}

export async function listMembers(id: string): Promise<MemberResponse[]> {
  if (IS_MOCK_MODE) {
    return getMockMembers(id);
  }
  const res = await serverFetch<ApiResponse<MemberResponse[]>>(`/api/workspaces/${id}/members`);
  return res.data;
}

export async function addMember(
  id: string,
  request: AddMemberRequest,
): Promise<void> {
  if (IS_MOCK_MODE) {
    return;
  }
  await serverFetch<void>(`/api/workspaces/${id}/members`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export async function removeMember(id: string, userId: string): Promise<void> {
  if (IS_MOCK_MODE) {
    return;
  }
  await serverFetch<void>(`/api/workspaces/${id}/members/${userId}`, {
    method: 'DELETE',
  });
}

export async function updateMemberRole(
  id: string,
  userId: string,
  role: MemberRole,
): Promise<void> {
  if (IS_MOCK_MODE) {
    return;
  }
  await serverFetch<void>(`/api/workspaces/${id}/members/${userId}?role=${role}`, {
    method: 'PUT',
  });
}
