import 'server-only';

import { ApiResponse } from '@/server/contracts/common';
import { serverFetch } from '@/server/http';
import { IS_MOCK_MODE } from '@/config/env';
import { Notification } from './notifications.contracts';
import {
  deleteMockNotification,
  getMockNotifications,
  markAllMockNotificationsAsRead,
  markMockNotificationAsRead,
} from '@/server/mock-data';

export async function listNotifications(): Promise<Notification[]> {
  if (IS_MOCK_MODE) {
    return getMockNotifications();
  }
  const res = await serverFetch<ApiResponse<Notification[]>>('/api/notifications');
  return res.data;
}

export async function markNotificationAsRead(id: string): Promise<void> {
  if (IS_MOCK_MODE) {
    markMockNotificationAsRead(id);
    return;
  }
  await serverFetch<ApiResponse<void>>(`/api/notifications/${id}/read`, {
    method: 'PUT',
  });
}

export async function markAllNotificationsAsRead(): Promise<void> {
  if (IS_MOCK_MODE) {
    markAllMockNotificationsAsRead();
    return;
  }
  await serverFetch<ApiResponse<void>>('/api/notifications/read-all', {
    method: 'PUT',
  });
}

export async function deleteNotification(id: string): Promise<void> {
  if (IS_MOCK_MODE) {
    deleteMockNotification(id);
    return;
  }
  await serverFetch<ApiResponse<void>>(`/api/notifications/${id}`, {
    method: 'DELETE',
  });
}
