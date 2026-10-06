import 'server-only';

import { ApiResponse } from '@/server/contracts/common';
import { serverFetch } from '@/server/http';
import { IS_MOCK_MODE } from '@/config/env';
import {
  createMockWsdSense,
  deleteMockWsdAnnotation,
  deleteMockWsdSense,
  getMockWsdAnnotationsForDocument,
  getMockWsdAnnotationsForToken,
  getMockWsdSenses,
  updateMockWsdSense,
  upsertMockWsdAnnotation,
} from '@/server/mock-data';
import {
  CreateWsdSenseRequest,
  WsdAnnotation,
  WsdSense,
} from './wsd.contracts';

export async function listSenses(
  workspaceId: string,
  word?: string,
): Promise<WsdSense[]> {
  if (IS_MOCK_MODE) {
    return getMockWsdSenses(workspaceId, word);
  }
  const qs = word ? `?word=${encodeURIComponent(word)}` : '';
  const res = await serverFetch<ApiResponse<WsdSense[]>>(
    `/api/workspaces/${workspaceId}/wsd/senses${qs}`,
  );
  return res.data;
}

export async function getAnnotationsForToken(
  workspaceId: string,
  tokenId: string,
): Promise<WsdAnnotation[]> {
  if (IS_MOCK_MODE) {
    return getMockWsdAnnotationsForToken(workspaceId, tokenId);
  }
  const res = await serverFetch<ApiResponse<WsdAnnotation[]>>(
    `/api/workspaces/${workspaceId}/wsd/tokens/${tokenId}/annotations`,
  );
  return res.data;
}

export async function getAnnotationsForDocument(
  workspaceId: string,
  documentId: string,
): Promise<WsdAnnotation[]> {
  if (IS_MOCK_MODE) {
    return getMockWsdAnnotationsForDocument(workspaceId, documentId);
  }
  const res = await serverFetch<ApiResponse<WsdAnnotation[]>>(
    `/api/workspaces/${workspaceId}/wsd/documents/${documentId}/annotations`,
  );
  return res.data;
}

export async function deleteAnnotation(
  workspaceId: string,
  annotationId: string,
): Promise<void> {
  if (IS_MOCK_MODE) {
    deleteMockWsdAnnotation(workspaceId, annotationId);
    return;
  }
  await serverFetch<ApiResponse<void>>(
    `/api/workspaces/${workspaceId}/wsd/annotations/${annotationId}`,
    { method: 'DELETE' },
  );
}

export async function upsertAnnotation(
  workspaceId: string,
  tokenId: string,
  senseId: string,
): Promise<WsdAnnotation> {
  if (IS_MOCK_MODE) {
    return upsertMockWsdAnnotation(workspaceId, tokenId, senseId);
  }
  const res = await serverFetch<ApiResponse<WsdAnnotation>>(
    `/api/workspaces/${workspaceId}/wsd/annotations`,
    { method: 'POST', body: JSON.stringify({ tokenId, senseId }) },
  );
  return res.data;
}

export async function createSense(
  workspaceId: string,
  request: CreateWsdSenseRequest,
): Promise<WsdSense> {
  if (IS_MOCK_MODE) {
    return createMockWsdSense(workspaceId, request);
  }
  const res = await serverFetch<ApiResponse<WsdSense>>(
    `/api/workspaces/${workspaceId}/wsd/senses`,
    { method: 'POST', body: JSON.stringify(request) },
  );
  return res.data;
}

export async function updateSense(
  workspaceId: string,
  senseId: string,
  request: CreateWsdSenseRequest,
): Promise<WsdSense> {
  if (IS_MOCK_MODE) {
    return updateMockWsdSense(workspaceId, senseId, request);
  }
  const res = await serverFetch<ApiResponse<WsdSense>>(
    `/api/workspaces/${workspaceId}/wsd/senses/${senseId}`,
    { method: 'PUT', body: JSON.stringify(request) },
  );
  return res.data;
}

export async function deleteSense(
  workspaceId: string,
  senseId: string,
): Promise<void> {
  if (IS_MOCK_MODE) {
    deleteMockWsdSense(workspaceId, senseId);
    return;
  }
  await serverFetch<ApiResponse<void>>(
    `/api/workspaces/${workspaceId}/wsd/senses/${senseId}`,
    { method: 'DELETE' },
  );
}
