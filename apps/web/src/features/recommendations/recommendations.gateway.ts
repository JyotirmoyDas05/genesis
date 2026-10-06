import 'server-only';

import { ApiResponse } from '@/server/contracts/common';
import { serverFetch } from '@/server/http';
import { IS_MOCK_MODE } from '@/config/env';
import {
  dismissMockRecommendation,
  getMockRecommendations,
  issueMockShareToken,
} from '@/server/mock-data';
import { Recommendation, ShareTokenResponse } from './recommendations.contracts';

export async function listRecommendations(
  workspaceId: string,
): Promise<Recommendation[]> {
  if (IS_MOCK_MODE) {
    return getMockRecommendations(workspaceId);
  }
  const res = await serverFetch<ApiResponse<Recommendation[]>>(
    `/api/workspaces/${workspaceId}/recommendations`,
  );
  return res.data;
}

export async function dismissRecommendation(
  workspaceId: string,
  hash: string,
  accepted: boolean,
): Promise<void> {
  if (IS_MOCK_MODE) {
    dismissMockRecommendation(workspaceId, hash, accepted);
    return;
  }
  await serverFetch<ApiResponse<void>>(
    `/api/workspaces/${workspaceId}/recommendations/dismissals`,
    { method: 'POST', body: JSON.stringify({ hash, accepted }) },
  );
}

export async function issueShareToken(
  workspaceId: string,
): Promise<ShareTokenResponse> {
  if (IS_MOCK_MODE) {
    return issueMockShareToken(workspaceId);
  }
  const res = await serverFetch<ApiResponse<ShareTokenResponse>>(
    `/api/workspaces/${workspaceId}/export/share`,
    { method: 'POST' },
  );
  return res.data;
}
