import 'server-only';

import { ApiResponse } from '@/server/contracts/common';
import { serverFetch } from '@/server/http';
import { IS_MOCK_MODE } from '@/config/env';
import {
  createMockPosTag,
  getMockPosAnnotations,
  getMockPosTags,
  updateMockTokenPos,
} from '@/server/mock-data';
import {
  CreatePosTagRequest,
  PosAnnotation,
  PosTagDefinition,
} from './pos.contracts';

export async function listTags(workspaceId?: string): Promise<PosTagDefinition[]> {
  if (IS_MOCK_MODE) {
    return getMockPosTags(workspaceId);
  }
  const qs = workspaceId ? `?workspaceId=${encodeURIComponent(workspaceId)}` : '';
  const res = await serverFetch<ApiResponse<PosTagDefinition[]>>(`/api/pos-tags${qs}`);
  return res.data;
}

export async function createTag(
  request: CreatePosTagRequest,
): Promise<PosTagDefinition> {
  if (IS_MOCK_MODE) {
    return createMockPosTag(request);
  }
  const res = await serverFetch<ApiResponse<PosTagDefinition>>('/api/pos-tags', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return res.data;
}

export async function getAnnotationsForDocument(
  documentId: string,
): Promise<PosAnnotation[]> {
  if (IS_MOCK_MODE) {
    return getMockPosAnnotations(documentId);
  }
  const res = await serverFetch<ApiResponse<PosAnnotation[]>>(
    `/api/documents/${documentId}/pos`,
  );
  return res.data;
}

export async function updateTokenPos(
  tokenId: string,
  pos: string | null,
): Promise<PosAnnotation | null> {
  if (IS_MOCK_MODE) {
    return updateMockTokenPos(tokenId, pos);
  }
  const res = await serverFetch<ApiResponse<PosAnnotation | null>>(
    `/api/tokens/${tokenId}/pos`,
    { method: 'PUT', body: JSON.stringify({ pos }) },
  );
  return res.data;
}
