import 'server-only';

import { ApiResponse } from '@/server/contracts/common';
import { serverFetch } from '@/server/http';
import { IS_MOCK_MODE } from '@/config/env';
import {
  getMockDocumentContent,
  getMockEditorDocuments,
  getMockEditorSession,
  saveMockEditorSession,
} from '@/server/mock-data';
import {
  DocumentContentResponse,
  EditorDocumentInfo,
  EditorSessionResponse,
  SaveSessionRequest,
} from './editor.contracts';

export async function getWorkspaceDocuments(
  workspaceId: string,
): Promise<EditorDocumentInfo[]> {
  if (IS_MOCK_MODE) {
    return getMockEditorDocuments(workspaceId);
  }
  const res = await serverFetch<ApiResponse<EditorDocumentInfo[]>>(
    `/api/editor/workspaces/${workspaceId}/documents`,
  );
  return res.data;
}

export async function getDocumentContent(
  workspaceId: string,
  documentId: string,
  page: number = 0,
  size: number = 50,
): Promise<DocumentContentResponse> {
  if (IS_MOCK_MODE) {
    return getMockDocumentContent(workspaceId, documentId, page, size);
  }
  const res = await serverFetch<ApiResponse<DocumentContentResponse>>(
    `/api/editor/workspaces/${workspaceId}/documents/${documentId}/content?page=${page}&size=${size}`,
  );
  return res.data;
}

export async function getSession(
  workspaceId: string,
): Promise<EditorSessionResponse | null> {
  if (IS_MOCK_MODE) {
    return getMockEditorSession(workspaceId);
  }
  const res = await serverFetch<ApiResponse<EditorSessionResponse>>(
    `/api/editor/workspaces/${workspaceId}/session`,
  );
  return res.data;
}

export async function saveSession(
  request: SaveSessionRequest,
): Promise<EditorSessionResponse> {
  if (IS_MOCK_MODE) {
    return saveMockEditorSession(request);
  }
  const res = await serverFetch<ApiResponse<EditorSessionResponse>>(
    `/api/editor/session`,
    { method: 'POST', body: JSON.stringify(request) },
  );
  return res.data;
}
