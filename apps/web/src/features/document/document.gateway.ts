import 'server-only';

import { ApiResponse } from '@/server/contracts/common';
import { serverFetch } from '@/server/http';
import { IS_MOCK_MODE } from '@/config/env';
import { DocumentResponse } from './document.contracts';
import { getMockDocuments } from '@/server/mock-data';

export async function listDocuments(workspaceId: string): Promise<DocumentResponse[]> {
  if (IS_MOCK_MODE) {
    return getMockDocuments(workspaceId);
  }
  const res = await serverFetch<ApiResponse<DocumentResponse[]>>(
    `/api/workspaces/${workspaceId}/documents`,
  );
  return res.data;
}

export async function deleteDocument(id: string): Promise<void> {
  if (IS_MOCK_MODE) {
    return;
  }
  await serverFetch<void>(`/api/documents/${id}`, { method: 'DELETE' });
}

export async function updateDocumentStatus(
  id: string,
  status: string,
): Promise<DocumentResponse> {
  if (IS_MOCK_MODE) {
    return {
      id,
      name: 'sample_document.txt',
      orderIndex: 0,
      status,
      workspaceId: 'ws_biomed_ner',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  const res = await serverFetch<ApiResponse<DocumentResponse>>(
    `/api/documents/${id}/status?status=${status}`,
    { method: 'PUT' },
  );
  return res.data;
}

export async function uploadDocument(
  workspaceId: string,
  file: File,
): Promise<DocumentResponse> {
  if (IS_MOCK_MODE) {
    return {
      id: `doc_${Date.now()}`,
      name: file.name,
      orderIndex: 99,
      status: 'NEW',
      workspaceId,
      fileSize: file.size,
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  const formData = new FormData();
  formData.append('file', file);
  const res = await serverFetch<ApiResponse<DocumentResponse>>(
    `/api/workspaces/${workspaceId}/documents`,
    { method: 'POST', body: formData },
  );
  return res.data;
}
