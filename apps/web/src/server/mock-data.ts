import { UserResponse } from '@/features/auth/auth.contracts';
import {
  WorkspaceResponse,
  CreateWorkspaceRequest,
  MemberResponse,
} from '@/features/workspace/workspace.contracts';
import { DocumentResponse } from '@/features/document/document.contracts';
import { Notification, NotificationType } from '@/features/notifications/notifications.contracts';

export const MOCK_USER: UserResponse = {
  id: 'usr_mock_01',
  username: 'alex_nlp',
  email: 'alex.rivera@genesis.ai',
  firstName: 'Alex',
  lastName: 'Rivera',
  organizationName: 'Genesis NLP Research Lab',
  role: 'ADMIN',
};

export const MOCK_MEMBERS: MemberResponse[] = [
  {
    userId: 'usr_mock_01',
    username: 'alex_nlp',
    email: 'alex.rivera@genesis.ai',
    firstName: 'Alex',
    lastName: 'Rivera',
    role: 'ADMIN',
  },
  {
    userId: 'usr_mock_02',
    username: 'sarah_annotator',
    email: 'sarah.c@genesis.ai',
    firstName: 'Sarah',
    lastName: 'Chen',
    role: 'ANNOTATOR',
  },
  {
    userId: 'usr_mock_03',
    username: 'marcus_curator',
    email: 'marcus.v@genesis.ai',
    firstName: 'Marcus',
    lastName: 'Vance',
    role: 'CURATOR',
  },
];

let mockWorkspaces: WorkspaceResponse[] = [
  {
    id: 'ws_biomed_ner',
    name: 'Biomedical Entity Extraction (PubMed)',
    description: 'Clinical trial summaries annotated for disease, chemical, gene, and species entities.',
    annotationType: 'NER',
    status: 'ACTIVE',
    ownerId: 'usr_mock_01',
    ownerUsername: 'alex_nlp',
    documentCount: 40,
    annotatedDocumentCount: 32,
    progressPercentage: 80,
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'ws_fin_coref',
    name: 'Financial Disclosures Coreference',
    description: 'Resolving pronoun and nominal mentions across quarterly corporate disclosures and 10-K filings.',
    annotationType: 'COREF',
    status: 'ACTIVE',
    ownerId: 'usr_mock_01',
    ownerUsername: 'alex_nlp',
    documentCount: 25,
    annotatedDocumentCount: 15,
    progressPercentage: 60,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'ws_legal_pos',
    name: 'Legal Contracts Syntax & POS',
    description: 'Part-of-speech tagging and syntactic validation for commercial agreements and NDAs.',
    annotationType: 'POS',
    status: 'COMPLETED',
    ownerId: 'usr_mock_01',
    ownerUsername: 'alex_nlp',
    documentCount: 50,
    annotatedDocumentCount: 50,
    progressPercentage: 100,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'ws_wsd_pilot',
    name: 'Word Sense Disambiguation Pilot',
    description: 'Polysemous verb and noun disambiguation using OntoNotes and WordNet sense inventories.',
    annotationType: 'WSD',
    status: 'ACTIVE',
    ownerId: 'usr_mock_01',
    ownerUsername: 'alex_nlp',
    documentCount: 30,
    annotatedDocumentCount: 6,
    progressPercentage: 20,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

const mockDocuments: Record<string, DocumentResponse[]> = {
  ws_biomed_ner: [
    {
      id: 'doc_ner_01',
      name: 'clinical_trial_study_301.txt',
      orderIndex: 0,
      status: 'ANNOTATED',
      workspaceId: 'ws_biomed_ner',
      fileSize: 14200,
      progress: 100,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'doc_ner_02',
      name: 'oncology_patient_cohort_b.txt',
      orderIndex: 1,
      status: 'IN_PROGRESS',
      workspaceId: 'ws_biomed_ner',
      fileSize: 22100,
      progress: 65,
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'doc_ner_03',
      name: 'pharmacology_adverse_events.txt',
      orderIndex: 2,
      status: 'NEW',
      workspaceId: 'ws_biomed_ner',
      fileSize: 9800,
      progress: 0,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
};

let mockNotifications: Notification[] = [
  {
    id: 'notif_01',
    type: NotificationType.INFO,
    title: 'Frontend Mock Mode Active',
    message: 'Authentication is bypassed and sample workspaces are loaded for rapid UI development.',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif_02',
    type: NotificationType.SUCCESS,
    title: 'Batch Review Completed',
    message: 'All 50 documents in "Legal Contracts Syntax & POS" have been validated.',
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'notif_03',
    type: NotificationType.INFO,
    title: 'Assigned to New Workspace',
    message: 'You have been added to "Biomedical Entity Extraction (PubMed)" as an administrator.',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function getMockWorkspaces(): WorkspaceResponse[] {
  return [...mockWorkspaces];
}

export function addMockWorkspace(request: CreateWorkspaceRequest): WorkspaceResponse {
  const newWs: WorkspaceResponse = {
    id: `ws_${Date.now()}`,
    name: request.name,
    description: request.description || '',
    annotationType: request.annotationType,
    status: 'ACTIVE',
    ownerId: MOCK_USER.id,
    ownerUsername: MOCK_USER.username,
    documentCount: 0,
    annotatedDocumentCount: 0,
    progressPercentage: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockWorkspaces = [newWs, ...mockWorkspaces];
  return newWs;
}

export function getMockWorkspaceById(id: string): WorkspaceResponse {
  const found = mockWorkspaces.find((w) => w.id === id);
  if (found) return found;
  return {
    id,
    name: 'Sample Workspace',
    description: 'Mock workspace fallback',
    annotationType: 'NER',
    status: 'ACTIVE',
    ownerId: MOCK_USER.id,
    ownerUsername: MOCK_USER.username,
    documentCount: 5,
    annotatedDocumentCount: 3,
    progressPercentage: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function updateMockWorkspace(id: string, name?: string, description?: string): WorkspaceResponse {
  const ws = getMockWorkspaceById(id);
  if (name) ws.name = name;
  if (description !== undefined) ws.description = description;
  ws.updatedAt = new Date().toISOString();
  return ws;
}

export function deleteMockWorkspace(id: string): void {
  mockWorkspaces = mockWorkspaces.filter((w) => w.id !== id);
}

export function getMockDocuments(workspaceId: string): DocumentResponse[] {
  return (
    mockDocuments[workspaceId] || [
      {
        id: `doc_${workspaceId}_1`,
        name: 'sample_document_01.txt',
        orderIndex: 0,
        status: 'NEW',
        workspaceId,
        fileSize: 12400,
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  );
}

export function getMockMembers(workspaceId?: string): MemberResponse[] {
  void workspaceId;
  return [...MOCK_MEMBERS];
}

export function getMockNotifications(): Notification[] {
  return [...mockNotifications];
}

export function markMockNotificationAsRead(id: string): void {
  mockNotifications = mockNotifications.map((n) => (n.id === id ? { ...n, read: true } : n));
}

export function markAllMockNotificationsAsRead(): void {
  mockNotifications = mockNotifications.map((n) => ({ ...n, read: true }));
}

export function deleteMockNotification(id: string): void {
  mockNotifications = mockNotifications.filter((n) => n.id !== id);
}
