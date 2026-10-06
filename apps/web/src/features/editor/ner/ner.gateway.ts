import 'server-only';

import { ApiResponse } from '@/server/contracts/common';
import { serverFetch } from '@/server/http';
import { IS_MOCK_MODE } from '@/config/env';
import {
  createMockNerAnnotation,
  createMockNerTag,
  deleteMockNerAnnotation,
  getMockNerAnnotations,
  getMockNerTags,
} from '@/server/mock-data';
import {
  CreateNerAnnotationRequest,
  CreateNerTagRequest,
  NerAnnotation,
  NerTagDefinition,
} from './ner.contracts';

export async function listTags(workspaceId?: string): Promise<NerTagDefinition[]> {
  if (IS_MOCK_MODE) {
    return getMockNerTags(workspaceId);
  }
  const qs = workspaceId ? `?workspaceId=${encodeURIComponent(workspaceId)}` : '';
  const res = await serverFetch<ApiResponse<NerTagDefinition[]>>(`/api/ner-tags${qs}`);
  return res.data;
}

export async function createTag(
  request: CreateNerTagRequest,
): Promise<NerTagDefinition> {
  if (IS_MOCK_MODE) {
    return createMockNerTag(request);
  }
  const res = await serverFetch<ApiResponse<NerTagDefinition>>('/api/ner-tags', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return res.data;
}

export async function listAnnotations(
  documentId: string,
  annotatorId?: string,
): Promise<NerAnnotation[]> {
  if (IS_MOCK_MODE) {
    return getMockNerAnnotations(documentId, annotatorId);
  }
  const params = new URLSearchParams({ documentId });
  if (annotatorId) params.set('annotatorId', annotatorId);
  const res = await serverFetch<ApiResponse<NerAnnotation[]>>(
    `/api/ner-annotations?${params.toString()}`,
  );
  return res.data;
}

export async function createAnnotation(
  request: CreateNerAnnotationRequest,
): Promise<NerAnnotation> {
  if (IS_MOCK_MODE) {
    return createMockNerAnnotation(request);
  }
  const res = await serverFetch<ApiResponse<NerAnnotation>>('/api/ner-annotations', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return res.data;
}

export async function deleteAnnotation(annotationId: string): Promise<void> {
  if (IS_MOCK_MODE) {
    deleteMockNerAnnotation(annotationId);
    return;
  }
  await serverFetch<ApiResponse<void>>(`/api/ner-annotations/${annotationId}`, {
    method: 'DELETE',
  });
}
