import { UserResponse } from '@/features/auth/auth.contracts';
import {
  WorkspaceResponse,
  CreateWorkspaceRequest,
  MemberResponse,
} from '@/features/workspace/workspace.contracts';
import { DocumentResponse } from '@/features/document/document.contracts';
import { Notification, NotificationType } from '@/features/notifications/notifications.contracts';
import {
  DocumentContentResponse,
  EditorDocumentInfo,
  EditorSessionResponse,
  SaveSessionRequest,
  SentenceDto,
  TokenDto,
} from '@/features/editor/core/editor.contracts';
import {
  ClusterDto,
  CreateClusterRequest,
  CreateMentionRequest,
  MentionDto,
} from '@/features/editor/coref/coref.contracts';
import {
  CreateNerAnnotationRequest,
  CreateNerTagRequest,
  NerAnnotation,
  NerTagDefinition,
  UNIVERSAL_NER_TAGS,
} from '@/features/editor/ner/ner.contracts';
import {
  CreatePosTagRequest,
  PosAnnotation,
  PosTagDefinition,
  UNIVERSAL_POS_TAGS,
} from '@/features/editor/pos/pos.contracts';
import {
  CreateWsdSenseRequest,
  WsdAnnotation,
  WsdSense,
} from '@/features/editor/wsd/wsd.contracts';
import {
  Recommendation,
  ShareTokenResponse,
} from '@/features/recommendations/recommendations.contracts';

// ==================== User & Members ====================

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

// ==================== Workspaces ====================

let mockWorkspaces: WorkspaceResponse[] = [
  {
    id: 'ws_fin_coref',
    name: 'Financial Disclosures Coreference',
    description: 'Resolving pronoun and nominal mentions across quarterly corporate disclosures and 10-K filings.',
    annotationType: 'COREF',
    status: 'ACTIVE',
    ownerId: 'usr_mock_01',
    ownerUsername: 'alex_nlp',
    documentCount: 3,
    annotatedDocumentCount: 1,
    progressPercentage: 65,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'ws_biomed_ner',
    name: 'Biomedical Entity Extraction (PubMed)',
    description: 'Clinical trial summaries annotated for disease, chemical, gene, and species entities.',
    annotationType: 'NER',
    status: 'ACTIVE',
    ownerId: 'usr_mock_01',
    ownerUsername: 'alex_nlp',
    documentCount: 3,
    annotatedDocumentCount: 2,
    progressPercentage: 70,
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'ws_legal_pos',
    name: 'Legal Contracts Syntax & POS',
    description: 'Part-of-speech tagging and syntactic validation for commercial agreements and NDAs.',
    annotationType: 'POS',
    status: 'ACTIVE',
    ownerId: 'usr_mock_01',
    ownerUsername: 'alex_nlp',
    documentCount: 2,
    annotatedDocumentCount: 1,
    progressPercentage: 50,
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
    documentCount: 2,
    annotatedDocumentCount: 1,
    progressPercentage: 35,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

// ==================== Documents ====================

const mockDocuments: Record<string, DocumentResponse[]> = {
  ws_fin_coref: [
    {
      id: 'doc_fin_01',
      name: 'apple_q4_2024_earnings.txt',
      orderIndex: 0,
      status: 'ANNOTATED',
      workspaceId: 'ws_fin_coref',
      fileSize: 15420,
      progress: 80,
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'doc_fin_02',
      name: 'microsoft_cloud_growth_10k.txt',
      orderIndex: 1,
      status: 'IN_PROGRESS',
      workspaceId: 'ws_fin_coref',
      fileSize: 18900,
      progress: 45,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    },
    {
      id: 'doc_fin_03',
      name: 'alphabet_sec_disclosure.txt',
      orderIndex: 2,
      status: 'NEW',
      workspaceId: 'ws_fin_coref',
      fileSize: 12100,
      progress: 0,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
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
  ws_legal_pos: [
    {
      id: 'doc_pos_01',
      name: 'master_services_agreement.txt',
      orderIndex: 0,
      status: 'ANNOTATED',
      workspaceId: 'ws_legal_pos',
      fileSize: 16500,
      progress: 90,
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'doc_pos_02',
      name: 'mutual_nda_confidentiality.txt',
      orderIndex: 1,
      status: 'IN_PROGRESS',
      workspaceId: 'ws_legal_pos',
      fileSize: 11200,
      progress: 30,
      createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
  ],
  ws_wsd_pilot: [
    {
      id: 'doc_wsd_01',
      name: 'polysemy_corpus_financial_nature.txt',
      orderIndex: 0,
      status: 'IN_PROGRESS',
      workspaceId: 'ws_wsd_pilot',
      fileSize: 13400,
      progress: 40,
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'doc_wsd_02',
      name: 'ambiguous_verbs_and_nouns.txt',
      orderIndex: 1,
      status: 'NEW',
      workspaceId: 'ws_wsd_pilot',
      fileSize: 10800,
      progress: 0,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
};

// ==================== Universal Text Tokenizer ====================

const COMMON_POS_MAP: Record<string, string> = {
  the: 'DET', a: 'DET', an: 'DET', this: 'DET', that: 'DET', these: 'DET', those: 'DET',
  in: 'ADP', on: 'ADP', at: 'ADP', of: 'ADP', for: 'ADP', with: 'ADP', by: 'ADP', to: 'ADP', from: 'ADP',
  and: 'CONJ', but: 'CONJ', or: 'CONJ', so: 'CONJ', yet: 'CONJ',
  is: 'VERB', are: 'VERB', was: 'VERB', were: 'VERB', be: 'VERB', been: 'VERB', being: 'VERB',
  has: 'VERB', have: 'VERB', had: 'VERB', do: 'VERB', does: 'VERB', did: 'VERB',
  announced: 'VERB', posted: 'VERB', stated: 'VERB', reported: 'VERB', highlighted: 'VERB', noted: 'VERB',
  it: 'PRON', its: 'PRON', he: 'PRON', his: 'PRON', she: 'PRON', her: 'PRON', they: 'PRON', their: 'PRON',
  we: 'PRON', our: 'PRON', you: 'PRON', your: 'PRON',
  not: 'ADV', very: 'ADV', exceptionally: 'ADV', significantly: 'ADV', nearly: 'ADV',
  apple: 'PROPN', inc: 'PROPN', tim: 'PROPN', cook: 'PROPN', luca: 'PROPN', maestri: 'PROPN',
  microsoft: 'PROPN', alphabet: 'PROPN', pubmed: 'PROPN', johns: 'PROPN', hopkins: 'PROPN',
  baltimore: 'PROPN', sarah: 'PROPN', jenkins: 'PROPN',
};

export function tokenizeText(
  text: string,
  documentId: string,
  initialGlobalIndex = 0,
): { sentences: SentenceDto[]; tokens: TokenDto[] } {
  const sentences: SentenceDto[] = [];
  const tokens: TokenDto[] = [];

  const rawSentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  let currentGlobalIndex = initialGlobalIndex;
  let charCursor = 0;

  rawSentences.forEach((sentText, sentIdx) => {
    const sentStartOffset = text.indexOf(sentText, charCursor);
    if (sentStartOffset !== -1) {
      charCursor = sentStartOffset + sentText.length;
    }
    const safeStartOffset = sentStartOffset !== -1 ? sentStartOffset : charCursor;

    const tokenRegex = /[\w'-]+|[^\w\s]/g;
    let match: RegExpExecArray | null;
    const sentTokens: TokenDto[] = [];
    let tokenIdxInSent = 0;

    while ((match = tokenRegex.exec(sentText)) !== null) {
      const form = match[0];
      const startInSent = match.index;
      const endInSent = startInSent + form.length;
      const startOffset = safeStartOffset + startInSent;
      const endOffset = safeStartOffset + endInSent;
      const lower = form.toLowerCase();

      let pos: string | null = COMMON_POS_MAP[lower] || null;
      if (!pos) {
        if (/^[0-9]+(\.[0-9]+)?$/.test(form)) pos = 'NUM';
        else if (/^[A-Z][a-z]+$/.test(form)) pos = 'PROPN';
        else if (/^[.,;:!?'"()-]$/.test(form)) pos = 'PUNCT';
        else pos = 'NOUN';
      }

      const token: TokenDto = {
        id: `tok_${documentId}_${sentIdx}_${tokenIdxInSent}`,
        documentId,
        tokenIndex: tokenIdxInSent,
        sentenceIndex: sentIdx,
        globalIndex: currentGlobalIndex++,
        form,
        text: form,
        pos,
        lemma: lower,
        nerTag: null,
        startOffset,
        endOffset,
      };

      sentTokens.push(token);
      tokens.push(token);
      tokenIdxInSent++;
    }

    if (sentTokens.length > 0) {
      sentences.push({
        sentenceIndex: sentIdx,
        startTokenIndex: sentTokens[0].tokenIndex,
        endTokenIndex: sentTokens[sentTokens.length - 1].tokenIndex,
        tokens: sentTokens,
      });
    }
  });

  return { sentences, tokens };
}

// ==================== Document Content Store ====================

const SAMPLE_TEXTS: Record<string, string> = {
  doc_fin_01: `Apple Inc. announced its fiscal 2024 fourth quarter financial results today. The company posted quarterly revenue of $94.9 billion, up 6 percent year over year. CEO Tim Cook stated that Apple is proud to report a new September quarter revenue record. He highlighted that customer satisfaction remains exceptionally high across all product categories. Luca Maestri, the chief financial officer, noted that active devices reached an all-time high. He added that our record business performance generated nearly $27 billion in operating cash flow.`,
  doc_fin_02: `Microsoft Corporation reported strong commercial cloud growth driven by enterprise demand. Satya Nadella, chairman and chief executive officer, emphasized ongoing advancements in artificial intelligence. He affirmed that Microsoft Cloud revenue surpassed $38 billion for the quarter. The organization continues to expand datacenter infrastructure globally to serve its expanding customer base.`,
  doc_fin_03: `Alphabet Inc. detailed financial growth in Google Services and Google Cloud segments. Chief Executive Officer Sundar Pichai delivered opening remarks regarding technological progress. He reiterated Alphabet's long-term commitment to responsible innovation and shareholder returns.`,
  doc_ner_01: `The clinical trial evaluated pembrolizumab in patients with metastatic non-small cell lung cancer. Patients received 200 mg intravenously every three weeks at Johns Hopkins Hospital in Baltimore. Dr. Sarah Jenkins reported significant tumor regression in over 65 percent of the cohort. Expression of PD-L1 was measured using immunohistochemistry assays before initiating therapy.`,
  doc_ner_02: `A multicenter study analyzed the efficacy of osimertinib in EGFR-mutated adenocarcinoma. Researchers at Memorial Sloan Kettering observed durable responses across diverse demographics. Dr. Robert Patel noted mild adverse reactions, primarily cutaneous rash and diarrhea.`,
  doc_ner_03: `Investigators evaluated cardiac biomarkers following treatment with trastuzumab in HER2-positive breast cancer. Serum troponin concentrations remained baseline in 92 percent of participants.`,
  doc_pos_01: `This Master Services Agreement is entered into by and between the parties hereto. The Consultant agrees to provide technical consulting services in accordance with Schedule A. The Client shall pay all undisputed invoices within thirty calendar days of receipt.`,
  doc_pos_02: `Each receiving party agrees to hold all confidential information in strict confidence. Neither party shall disclose proprietary trade secrets without prior written approval.`,
  doc_wsd_01: `The central bank decided to raise the benchmark interest rate to curb runaway inflation. Meanwhile, the fisherman sat on the grassy bank of the river while waiting for salmon. Researchers showed great interest in the novel mathematical algorithm presented yesterday.`,
  doc_wsd_02: `The industrial chemical plant operates under stringent safety regulations. Botanists discovered a rare perennial plant growing along the mountain ridge. The defendant faced a criminal charge in federal district court.`,
};

const mockDocumentContent: Map<string, { sentences: SentenceDto[]; tokens: TokenDto[] }> = new Map();

function ensureDocumentContent(docId: string) {
  if (mockDocumentContent.has(docId)) return;
  const rawText =
    SAMPLE_TEXTS[docId] ||
    `This is a sample document for testing the annotation editor. It contains multiple sentences with standard tokens and terminology. Annotators can highlight mentions, assign tags, and verify syntactic components efficiently.`;
  mockDocumentContent.set(docId, tokenizeText(rawText, docId));
}

// Pre-tokenize default documents
Object.keys(SAMPLE_TEXTS).forEach((docId) => {
  ensureDocumentContent(docId);
});

export function getMockEditorDocuments(workspaceId: string): EditorDocumentInfo[] {
  const docs = getMockDocuments(workspaceId);
  return docs.map((d) => {
    ensureDocumentContent(d.id);
    const content = mockDocumentContent.get(d.id);
    const tokenCount = content?.tokens.length || 100;
    const sentenceCount = content?.sentences.length || 5;
    return {
      id: d.id,
      name: d.name,
      orderIndex: d.orderIndex,
      tokenCount,
      sentenceCount,
      status: d.status || 'ANNOTATED',
      isTokenized: true,
    };
  });
}

export function getMockDocumentContent(
  workspaceId: string,
  documentId: string,
  page = 0,
  size = 50,
): DocumentContentResponse {
  ensureDocumentContent(documentId);
  const data = mockDocumentContent.get(documentId)!;
  const docs = getMockDocuments(workspaceId);
  const docInfo = docs.find((d) => d.id === documentId) || {
    id: documentId,
    name: 'document.txt',
    orderIndex: 0,
  };

  const totalSentences = data.sentences.length;
  const totalTokens = data.tokens.length;
  const totalPages = Math.max(1, Math.ceil(totalSentences / size));

  const startSent = page * size;
  const endSent = startSent + size;
  const pageSentences = data.sentences.slice(startSent, endSent);

  let pageTokens: TokenDto[] = [];
  if (pageSentences.length > 0) {
    const firstSentIdx = pageSentences[0].sentenceIndex;
    const lastSentIdx = pageSentences[pageSentences.length - 1].sentenceIndex;
    pageTokens = data.tokens.filter(
      (t) => t.sentenceIndex >= firstSentIdx && t.sentenceIndex <= lastSentIdx,
    );
  }

  return {
    documentId,
    documentName: docInfo.name,
    orderIndex: docInfo.orderIndex,
    sentences: pageSentences,
    tokens: pageTokens,
    totalSentences,
    totalTokens,
    globalTokenOffset: pageTokens[0]?.globalIndex || 0,
    currentPage: page,
    totalPages,
    pageSize: size,
  };
}

// ==================== Editor Session Store ====================

const mockSessions: Record<string, EditorSessionResponse> = {
  ws_fin_coref: {
    workspaceId: 'ws_fin_coref',
    userId: MOCK_USER.id,
    lastDocumentIndex: 0,
    scrollPosition: 0,
  },
  ws_biomed_ner: {
    workspaceId: 'ws_biomed_ner',
    userId: MOCK_USER.id,
    lastDocumentIndex: 0,
    scrollPosition: 0,
  },
  ws_legal_pos: {
    workspaceId: 'ws_legal_pos',
    userId: MOCK_USER.id,
    lastDocumentIndex: 0,
    scrollPosition: 0,
  },
  ws_wsd_pilot: {
    workspaceId: 'ws_wsd_pilot',
    userId: MOCK_USER.id,
    lastDocumentIndex: 0,
    scrollPosition: 0,
  },
};

export function getMockEditorSession(workspaceId: string): EditorSessionResponse | null {
  return mockSessions[workspaceId] || {
    workspaceId,
    userId: MOCK_USER.id,
    lastDocumentIndex: 0,
    scrollPosition: 0,
  };
}

export function saveMockEditorSession(request: SaveSessionRequest): EditorSessionResponse {
  const session: EditorSessionResponse = {
    workspaceId: request.workspaceId,
    userId: MOCK_USER.id,
    lastDocumentIndex: request.lastDocumentIndex,
    scrollPosition: request.scrollPosition,
  };
  mockSessions[request.workspaceId] = session;
  return session;
}

// ==================== Coreference Mock Store ====================

const mockClusters: Record<string, ClusterDto[]> = {
  ws_fin_coref: [
    {
      id: 'cluster_fin_1',
      workspaceId: 'ws_fin_coref',
      clusterNumber: 1,
      label: 'Apple Inc.',
      representativeText: 'Apple Inc.',
      color: '#3b82f6',
      mentionCount: 4,
    },
    {
      id: 'cluster_fin_2',
      workspaceId: 'ws_fin_coref',
      clusterNumber: 2,
      label: 'Tim Cook',
      representativeText: 'Tim Cook',
      color: '#10b981',
      mentionCount: 2,
    },
    {
      id: 'cluster_fin_3',
      workspaceId: 'ws_fin_coref',
      clusterNumber: 3,
      label: 'Luca Maestri',
      representativeText: 'Luca Maestri',
      color: '#f59e0b',
      mentionCount: 3,
    },
  ],
};

const mockMentions: Record<string, MentionDto[]> = {
  ws_fin_coref: [
    // Cluster 1 (Apple Inc.)
    {
      id: 'mention_fin_01',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: 'cluster_fin_1',
      clusterNumber: 1,
      sentenceIndex: 0,
      startTokenIndex: 0,
      endTokenIndex: 1,
      globalStartIndex: 0,
      globalEndIndex: 1,
      text: 'Apple Inc',
      mentionType: 'NAMED',
      clusterColor: '#3b82f6',
    },
    {
      id: 'mention_fin_02',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: 'cluster_fin_1',
      clusterNumber: 1,
      sentenceIndex: 0,
      startTokenIndex: 4,
      endTokenIndex: 4,
      globalStartIndex: 4,
      globalEndIndex: 4,
      text: 'its',
      mentionType: 'PRONOMINAL',
      clusterColor: '#3b82f6',
    },
    {
      id: 'mention_fin_03',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: 'cluster_fin_1',
      clusterNumber: 1,
      sentenceIndex: 1,
      startTokenIndex: 0,
      endTokenIndex: 1,
      globalStartIndex: 14,
      globalEndIndex: 15,
      text: 'The company',
      mentionType: 'NOMINAL',
      clusterColor: '#3b82f6',
    },
    {
      id: 'mention_fin_04',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: 'cluster_fin_1',
      clusterNumber: 1,
      sentenceIndex: 2,
      startTokenIndex: 5,
      endTokenIndex: 5,
      globalStartIndex: 37,
      globalEndIndex: 37,
      text: 'Apple',
      mentionType: 'NAMED',
      clusterColor: '#3b82f6',
    },
    // Cluster 2 (Tim Cook)
    {
      id: 'mention_fin_05',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: 'cluster_fin_2',
      clusterNumber: 2,
      sentenceIndex: 2,
      startTokenIndex: 0,
      endTokenIndex: 2,
      globalStartIndex: 32,
      globalEndIndex: 34,
      text: 'CEO Tim Cook',
      mentionType: 'NAMED',
      clusterColor: '#10b981',
    },
    {
      id: 'mention_fin_06',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: 'cluster_fin_2',
      clusterNumber: 2,
      sentenceIndex: 3,
      startTokenIndex: 0,
      endTokenIndex: 0,
      globalStartIndex: 49,
      globalEndIndex: 49,
      text: 'He',
      mentionType: 'PRONOMINAL',
      clusterColor: '#10b981',
    },
    // Cluster 3 (Luca Maestri)
    {
      id: 'mention_fin_07',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: 'cluster_fin_3',
      clusterNumber: 3,
      sentenceIndex: 4,
      startTokenIndex: 0,
      endTokenIndex: 1,
      globalStartIndex: 62,
      globalEndIndex: 63,
      text: 'Luca Maestri',
      mentionType: 'NAMED',
      clusterColor: '#f59e0b',
    },
    {
      id: 'mention_fin_08',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: 'cluster_fin_3',
      clusterNumber: 3,
      sentenceIndex: 4,
      startTokenIndex: 3,
      endTokenIndex: 6,
      globalStartIndex: 65,
      globalEndIndex: 68,
      text: 'the chief financial officer',
      mentionType: 'NOMINAL',
      clusterColor: '#f59e0b',
    },
    {
      id: 'mention_fin_09',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: 'cluster_fin_3',
      clusterNumber: 3,
      sentenceIndex: 5,
      startTokenIndex: 0,
      endTokenIndex: 0,
      globalStartIndex: 79,
      globalEndIndex: 79,
      text: 'He',
      mentionType: 'PRONOMINAL',
      clusterColor: '#f59e0b',
    },
    // Unassigned mentions
    {
      id: 'mention_fin_10',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: null,
      clusterNumber: null,
      sentenceIndex: 1,
      startTokenIndex: 2,
      endTokenIndex: 3,
      globalStartIndex: 16,
      globalEndIndex: 17,
      text: 'quarterly revenue',
      mentionType: 'NOMINAL',
      clusterColor: null,
    },
    {
      id: 'mention_fin_11',
      workspaceId: 'ws_fin_coref',
      documentId: 'doc_fin_01',
      clusterId: null,
      clusterNumber: null,
      sentenceIndex: 5,
      startTokenIndex: 10,
      endTokenIndex: 12,
      globalStartIndex: 89,
      globalEndIndex: 91,
      text: 'operating cash flow',
      mentionType: 'NOMINAL',
      clusterColor: null,
    },
  ],
};

const CLUSTER_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#14b8a6',
];

export function getMockClusters(workspaceId: string): ClusterDto[] {
  return [...(mockClusters[workspaceId] || [])];
}

export function createMockCluster(
  workspaceId: string,
  request?: CreateClusterRequest,
): ClusterDto {
  const current = mockClusters[workspaceId] || [];
  const nextNum = current.reduce((max, c) => Math.max(max, c.clusterNumber), 0) + 1;
  const color = request?.color || CLUSTER_COLORS[(nextNum - 1) % CLUSTER_COLORS.length];
  const newCluster: ClusterDto = {
    id: `cluster_${Date.now()}`,
    workspaceId,
    clusterNumber: nextNum,
    label: request?.label || `Cluster ${nextNum}`,
    representativeText: null,
    color,
    mentionCount: 0,
  };
  mockClusters[workspaceId] = [...current, newCluster];
  return newCluster;
}

export function deleteMockCluster(clusterId: string): void {
  for (const wsId of Object.keys(mockClusters)) {
    mockClusters[wsId] = mockClusters[wsId].filter((c) => c.id !== clusterId);
    if (mockMentions[wsId]) {
      mockMentions[wsId] = mockMentions[wsId].map((m) =>
        m.clusterId === clusterId
          ? { ...m, clusterId: null, clusterNumber: null, clusterColor: null }
          : m,
      );
    }
  }
}

export function mergeMockClusters(
  workspaceId: string,
  sourceClusterIds: string[],
  targetClusterId: string,
): ClusterDto {
  const clusters = mockClusters[workspaceId] || [];
  const target = clusters.find((c) => c.id === targetClusterId);
  if (!target) throw new Error('Target cluster not found');

  const sourceSet = new Set(sourceClusterIds);
  mockClusters[workspaceId] = clusters.filter((c) => !sourceSet.has(c.id));

  if (mockMentions[workspaceId]) {
    mockMentions[workspaceId] = mockMentions[workspaceId].map((m) => {
      if (m.clusterId && sourceSet.has(m.clusterId)) {
        return {
          ...m,
          clusterId: target.id,
          clusterNumber: target.clusterNumber,
          clusterColor: target.color,
        };
      }
      return m;
    });
    target.mentionCount = mockMentions[workspaceId].filter((m) => m.clusterId === target.id).length;
  }

  return target;
}

export function getMockMentions(workspaceId: string): MentionDto[] {
  return [...(mockMentions[workspaceId] || [])];
}

export function createMockMention(
  workspaceId: string,
  data: CreateMentionRequest,
): MentionDto {
  const current = mockMentions[workspaceId] || [];
  const doc = mockDocumentContent.get(data.documentId);
  const sent = doc?.sentences.find((s) => s.sentenceIndex === data.sentenceIndex);
  const token = sent?.tokens.find((t) => t.tokenIndex === data.startTokenIndex);
  const globalStart = token?.globalIndex || 0;
  const globalEnd = globalStart + (data.endTokenIndex - data.startTokenIndex);

  const newMention: MentionDto = {
    id: `mention_${Date.now()}`,
    workspaceId,
    documentId: data.documentId,
    clusterId: null,
    clusterNumber: null,
    sentenceIndex: data.sentenceIndex,
    startTokenIndex: data.startTokenIndex,
    endTokenIndex: data.endTokenIndex,
    globalStartIndex: globalStart,
    globalEndIndex: globalEnd,
    text: data.text,
    mentionType: 'NOMINAL',
    clusterColor: null,
  };

  mockMentions[workspaceId] = [...current, newMention];
  return newMention;
}

export function assignMockMentionToCluster(
  mentionId: string,
  clusterId: string,
): MentionDto {
  for (const wsId of Object.keys(mockMentions)) {
    const mention = mockMentions[wsId].find((m) => m.id === mentionId);
    if (mention) {
      const cluster = mockClusters[wsId]?.find((c) => c.id === clusterId);
      mention.clusterId = clusterId;
      mention.clusterNumber = cluster?.clusterNumber || null;
      mention.clusterColor = cluster?.color || null;

      // Update counts
      if (cluster) {
        cluster.mentionCount = mockMentions[wsId].filter((m) => m.clusterId === clusterId).length;
        if (!cluster.representativeText) {
          cluster.representativeText = mention.text;
        }
      }
      return { ...mention };
    }
  }
  throw new Error('Mention not found');
}

export function deleteMockMention(mentionId: string): void {
  for (const wsId of Object.keys(mockMentions)) {
    const mention = mockMentions[wsId].find((m) => m.id === mentionId);
    const clusterId = mention?.clusterId;
    mockMentions[wsId] = mockMentions[wsId].filter((m) => m.id !== mentionId);
    if (clusterId) {
      const cluster = mockClusters[wsId]?.find((c) => c.id === clusterId);
      if (cluster) {
        cluster.mentionCount = mockMentions[wsId].filter((m) => m.clusterId === clusterId).length;
      }
    }
  }
}

// ==================== NER Mock Store ====================

const mockNerTags: Record<string, NerTagDefinition[]> = {
  ws_biomed_ner: [
    { id: 'tag_ner_1', tag: 'DISEASE', description: 'Illness, syndrome, or medical condition', scope: 'WORKSPACE', workspaceId: 'ws_biomed_ner', builtin: false },
    { id: 'tag_ner_2', tag: 'CHEMICAL', description: 'Drug, molecule, or pharmacological agent', scope: 'WORKSPACE', workspaceId: 'ws_biomed_ner', builtin: false },
    { id: 'tag_ner_3', tag: 'GENE', description: 'Gene or protein marker', scope: 'WORKSPACE', workspaceId: 'ws_biomed_ner', builtin: false },
  ],
};

const mockNerAnnotations: Record<string, NerAnnotation[]> = {
  doc_ner_01: [
    { id: 'ner_ann_1', documentId: 'doc_ner_01', annotatorId: 'usr_mock_01', startTokenIndex: 4, endTokenIndex: 4, label: 'CHEMICAL', timestamp: new Date().toISOString() },
    { id: 'ner_ann_2', documentId: 'doc_ner_01', annotatorId: 'usr_mock_01', startTokenIndex: 9, endTokenIndex: 14, label: 'DISEASE', timestamp: new Date().toISOString() },
    { id: 'ner_ann_3', documentId: 'doc_ner_01', annotatorId: 'usr_mock_01', startTokenIndex: 17, endTokenIndex: 18, label: 'QUANTITY', timestamp: new Date().toISOString() },
    { id: 'ner_ann_4', documentId: 'doc_ner_01', annotatorId: 'usr_mock_01', startTokenIndex: 21, endTokenIndex: 23, label: 'DATE', timestamp: new Date().toISOString() },
    { id: 'ner_ann_5', documentId: 'doc_ner_01', annotatorId: 'usr_mock_01', startTokenIndex: 25, endTokenIndex: 27, label: 'ORG', timestamp: new Date().toISOString() },
    { id: 'ner_ann_6', documentId: 'doc_ner_01', annotatorId: 'usr_mock_01', startTokenIndex: 29, endTokenIndex: 29, label: 'GPE', timestamp: new Date().toISOString() },
    { id: 'ner_ann_7', documentId: 'doc_ner_01', annotatorId: 'usr_mock_01', startTokenIndex: 31, endTokenIndex: 33, label: 'PERSON', timestamp: new Date().toISOString() },
    { id: 'ner_ann_8', documentId: 'doc_ner_01', annotatorId: 'usr_mock_01', startTokenIndex: 40, endTokenIndex: 41, label: 'PERCENT', timestamp: new Date().toISOString() },
    { id: 'ner_ann_9', documentId: 'doc_ner_01', annotatorId: 'usr_mock_01', startTokenIndex: 47, endTokenIndex: 49, label: 'GENE', timestamp: new Date().toISOString() },
  ],
};

export function getMockNerTags(workspaceId?: string): NerTagDefinition[] {
  const builtin: NerTagDefinition[] = UNIVERSAL_NER_TAGS.map((t) => ({
    id: null,
    tag: t.tag,
    description: t.description,
    scope: 'GLOBAL',
    workspaceId: null,
    builtin: true,
  }));
  const custom = workspaceId ? mockNerTags[workspaceId] || [] : [];
  return [...builtin, ...custom];
}

export function createMockNerTag(request: CreateNerTagRequest): NerTagDefinition {
  const wsId = request.workspaceId || 'global';
  const newTag: NerTagDefinition = {
    id: `tag_${Date.now()}`,
    tag: request.tag.toUpperCase(),
    description: request.description || null,
    scope: request.scope,
    workspaceId: request.workspaceId || null,
    builtin: false,
  };
  mockNerTags[wsId] = [...(mockNerTags[wsId] || []), newTag];
  return newTag;
}

export function getMockNerAnnotations(documentId: string, annotatorId?: string): NerAnnotation[] {
  const list = mockNerAnnotations[documentId] || [];
  if (annotatorId) {
    return list.filter((a) => a.annotatorId === annotatorId);
  }
  return [...list];
}

export function createMockNerAnnotation(request: CreateNerAnnotationRequest): NerAnnotation {
  const newAnn: NerAnnotation = {
    id: `ner_ann_${Date.now()}`,
    documentId: request.documentId,
    annotatorId: MOCK_USER.id,
    startTokenIndex: request.startTokenIndex,
    endTokenIndex: request.endTokenIndex,
    label: request.label,
    timestamp: new Date().toISOString(),
  };
  mockNerAnnotations[request.documentId] = [...(mockNerAnnotations[request.documentId] || []), newAnn];
  return newAnn;
}

export function deleteMockNerAnnotation(annotationId: string): void {
  for (const docId of Object.keys(mockNerAnnotations)) {
    mockNerAnnotations[docId] = mockNerAnnotations[docId].filter((a) => a.id !== annotationId);
  }
}

// ==================== POS Mock Store ====================

const mockPosTags: Record<string, PosTagDefinition[]> = {
  ws_legal_pos: [
    { id: 'pos_tag_1', tag: 'LEGAL_TERM', description: 'Defined statutory or contractual term', scope: 'WORKSPACE', workspaceId: 'ws_legal_pos', builtin: false },
  ],
};

const mockPosAnnotations: Record<string, PosAnnotation[]> = {};

export function getMockPosTags(workspaceId?: string): PosTagDefinition[] {
  const builtin: PosTagDefinition[] = UNIVERSAL_POS_TAGS.map((t) => ({
    id: null,
    tag: t.tag,
    description: t.description,
    scope: 'GLOBAL',
    workspaceId: null,
    builtin: true,
  }));
  const custom = workspaceId ? mockPosTags[workspaceId] || [] : [];
  return [...builtin, ...custom];
}

export function createMockPosTag(request: CreatePosTagRequest): PosTagDefinition {
  const wsId = request.workspaceId || 'global';
  const newTag: PosTagDefinition = {
    id: `pos_tag_${Date.now()}`,
    tag: request.tag.toUpperCase(),
    description: request.description || null,
    scope: request.scope,
    workspaceId: request.workspaceId || null,
    builtin: false,
  };
  mockPosTags[wsId] = [...(mockPosTags[wsId] || []), newTag];
  return newTag;
}

export function getMockPosAnnotations(documentId: string): PosAnnotation[] {
  if (!mockPosAnnotations[documentId]) {
    ensureDocumentContent(documentId);
    const content = mockDocumentContent.get(documentId);
    const initial: PosAnnotation[] = (content?.tokens || [])
      .filter((t) => !!t.pos)
      .map((t) => ({
        id: `pos_ann_${t.id}`,
        tokenId: t.id,
        annotatorId: MOCK_USER.id,
        posTag: t.pos!,
        timestamp: new Date().toISOString(),
      }));
    mockPosAnnotations[documentId] = initial;
  }
  return [...mockPosAnnotations[documentId]];
}

export function updateMockTokenPos(tokenId: string, pos: string | null): PosAnnotation | null {
  for (const docId of Object.keys(mockPosAnnotations)) {
    const list = mockPosAnnotations[docId];
    const existing = list.find((a) => a.tokenId === tokenId);
    if (!pos) {
      if (existing) {
        mockPosAnnotations[docId] = list.filter((a) => a.tokenId !== tokenId);
      }
      return null;
    }
    if (existing) {
      existing.posTag = pos;
      existing.timestamp = new Date().toISOString();
      return { ...existing };
    }
    const created: PosAnnotation = {
      id: `pos_ann_${Date.now()}`,
      tokenId,
      annotatorId: MOCK_USER.id,
      posTag: pos,
      timestamp: new Date().toISOString(),
    };
    mockPosAnnotations[docId] = [...list, created];
    return created;
  }
  return null;
}

// ==================== WSD Mock Store ====================

const mockWsdSenses: Record<string, WsdSense[]> = {
  ws_wsd_pilot: [
    { id: 'sense_bank_1', workspaceId: 'ws_wsd_pilot', word: 'bank', senseLabel: 'bank%1:14:00::', description: 'Financial institution that accepts deposits and channels money' },
    { id: 'sense_bank_2', workspaceId: 'ws_wsd_pilot', word: 'bank', senseLabel: 'bank%1:17:00::', description: 'Sloping land beside a body of water or river' },
    { id: 'sense_interest_1', workspaceId: 'ws_wsd_pilot', word: 'interest', senseLabel: 'interest%1:21:00::', description: 'A fixed charge for borrowing money' },
    { id: 'sense_interest_2', workspaceId: 'ws_wsd_pilot', word: 'interest', senseLabel: 'interest%1:09:00::', description: 'A sense of curiosity or emotional concern' },
  ],
};

const mockWsdAnnotations: Record<string, WsdAnnotation[]> = {
  ws_wsd_pilot: [
    { id: 'wsd_ann_1', tokenId: 'tok_doc_wsd_01_0_2', senseId: 'sense_bank_1', senseLabel: 'bank%1:14:00::', annotatorId: MOCK_USER.id, workspaceId: 'ws_wsd_pilot', timestamp: new Date().toISOString() },
    { id: 'wsd_ann_2', tokenId: 'tok_doc_wsd_01_0_7', senseId: 'sense_interest_1', senseLabel: 'interest%1:21:00::', annotatorId: MOCK_USER.id, workspaceId: 'ws_wsd_pilot', timestamp: new Date().toISOString() },
    { id: 'wsd_ann_3', tokenId: 'tok_doc_wsd_01_1_7', senseId: 'sense_bank_2', senseLabel: 'bank%1:17:00::', annotatorId: MOCK_USER.id, workspaceId: 'ws_wsd_pilot', timestamp: new Date().toISOString() },
    { id: 'wsd_ann_4', tokenId: 'tok_doc_wsd_01_2_3', senseId: 'sense_interest_2', senseLabel: 'interest%1:09:00::', annotatorId: MOCK_USER.id, workspaceId: 'ws_wsd_pilot', timestamp: new Date().toISOString() },
  ],
};

export function getMockWsdSenses(workspaceId: string, word?: string): WsdSense[] {
  const list = mockWsdSenses[workspaceId] || [];
  if (word) {
    return list.filter((s) => s.word.toLowerCase() === word.toLowerCase());
  }
  return [...list];
}

export function createMockWsdSense(workspaceId: string, request: CreateWsdSenseRequest): WsdSense {
  const newSense: WsdSense = {
    id: `sense_${Date.now()}`,
    workspaceId,
    word: request.word,
    senseLabel: request.senseLabel,
    description: request.description || null,
  };
  mockWsdSenses[workspaceId] = [...(mockWsdSenses[workspaceId] || []), newSense];
  return newSense;
}

export function updateMockWsdSense(workspaceId: string, senseId: string, request: CreateWsdSenseRequest): WsdSense {
  const list = mockWsdSenses[workspaceId] || [];
  const found = list.find((s) => s.id === senseId);
  if (!found) throw new Error('Sense not found');
  found.word = request.word;
  found.senseLabel = request.senseLabel;
  found.description = request.description || null;
  return { ...found };
}

export function deleteMockWsdSense(workspaceId: string, senseId: string): void {
  if (mockWsdSenses[workspaceId]) {
    mockWsdSenses[workspaceId] = mockWsdSenses[workspaceId].filter((s) => s.id !== senseId);
  }
  if (mockWsdAnnotations[workspaceId]) {
    mockWsdAnnotations[workspaceId] = mockWsdAnnotations[workspaceId].filter((a) => a.senseId !== senseId);
  }
}

export function getMockWsdAnnotationsForDocument(workspaceId: string, documentId: string): WsdAnnotation[] {
  const list = mockWsdAnnotations[workspaceId] || [];
  return list.filter((a) => a.tokenId.includes(documentId));
}

export function getMockWsdAnnotationsForToken(workspaceId: string, tokenId: string): WsdAnnotation[] {
  const list = mockWsdAnnotations[workspaceId] || [];
  return list.filter((a) => a.tokenId === tokenId);
}

export function upsertMockWsdAnnotation(workspaceId: string, tokenId: string, senseId: string): WsdAnnotation {
  const senses = mockWsdSenses[workspaceId] || [];
  const sense = senses.find((s) => s.id === senseId);
  const list = mockWsdAnnotations[workspaceId] || [];
  const existing = list.find((a) => a.tokenId === tokenId);

  if (existing) {
    existing.senseId = senseId;
    existing.senseLabel = sense?.senseLabel || null;
    existing.timestamp = new Date().toISOString();
    return { ...existing };
  }

  const created: WsdAnnotation = {
    id: `wsd_ann_${Date.now()}`,
    tokenId,
    senseId,
    senseLabel: sense?.senseLabel || null,
    annotatorId: MOCK_USER.id,
    workspaceId,
    timestamp: new Date().toISOString(),
  };
  mockWsdAnnotations[workspaceId] = [...list, created];
  return created;
}

export function deleteMockWsdAnnotation(workspaceId: string, annotationId: string): void {
  if (mockWsdAnnotations[workspaceId]) {
    mockWsdAnnotations[workspaceId] = mockWsdAnnotations[workspaceId].filter((a) => a.id !== annotationId);
  }
}

// ==================== Recommendations Mock Store ====================

const mockRecommendations: Record<string, Recommendation[]> = {
  ws_fin_coref: [
    {
      hash: 'rec_fin_hash_1',
      type: 'COREF_CHAIN_GAP',
      priority: 'HIGH',
      documentId: 'doc_fin_01',
      entityId: 'mention_fin_10',
      tokenStartIndex: 16,
      tokenEndIndex: 17,
      reason: 'Nominal phrase "quarterly revenue" in sentence 2 is unassigned but co-occurs with financial performance statements.',
    },
    {
      hash: 'rec_fin_hash_2',
      type: 'STRING_MATCH',
      priority: 'MEDIUM',
      documentId: 'doc_fin_01',
      entityId: null,
      tokenStartIndex: 37,
      tokenEndIndex: 37,
      reason: 'Token "Apple" in sentence 3 matches existing Cluster 1 ("Apple Inc.").',
    },
    {
      hash: 'rec_fin_hash_3',
      type: 'UNFINISHED_MENTION',
      priority: 'LOW',
      documentId: 'doc_fin_01',
      entityId: null,
      tokenStartIndex: 89,
      tokenEndIndex: 91,
      reason: 'Unclustered financial metric "operating cash flow" could be linked to performance reporting.',
    },
  ],
  ws_biomed_ner: [
    {
      hash: 'rec_ner_hash_1',
      type: 'DENSITY_GAP',
      priority: 'HIGH',
      documentId: 'doc_ner_02',
      entityId: null,
      tokenStartIndex: 5,
      tokenEndIndex: 8,
      reason: 'Potential unannotated disease entity "EGFR-mutated adenocarcinoma" identified.',
    },
  ],
};

export function getMockRecommendations(workspaceId: string): Recommendation[] {
  return [...(mockRecommendations[workspaceId] || [])];
}

export function dismissMockRecommendation(workspaceId: string, hash: string, accepted: boolean): void {
  void accepted;
  if (mockRecommendations[workspaceId]) {
    mockRecommendations[workspaceId] = mockRecommendations[workspaceId].filter((r) => r.hash !== hash);
  }
}

export function issueMockShareToken(workspaceId: string): ShareTokenResponse {
  void workspaceId;
  return {
    token: `share_token_${Date.now()}_mock`,
    expiresInSeconds: 86400,
  };
}

// ==================== Export Mock Data ====================

export function getMockExportData(type: string, id: string): { filename: string; mimeType: string; content: string } {
  if (type === 'workspaces') {
    const ws = getMockWorkspaceById(id);
    const docs = getMockDocuments(id);
    const exportPayload = {
      workspace: ws,
      documentsCount: docs.length,
      exportedAt: new Date().toISOString(),
      format: 'genesis-export-v1',
      clusters: mockClusters[id] || [],
      mentions: mockMentions[id] || [],
      nerTags: mockNerTags[id] || [],
      posTags: mockPosTags[id] || [],
      wsdAnnotations: mockWsdAnnotations[id] || [],
    };
    return {
      filename: `${ws.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_export.json`,
      mimeType: 'application/json',
      content: JSON.stringify(exportPayload, null, 2),
    };
  }

  // Document export
  return {
    filename: `document_${id}_export.conll`,
    mimeType: 'text/plain',
    content: `# begin document (${id})\n# Form\tPOS\tLemma\tNER\tCoref\n1\tApple\tPROPN\tapple\tORG\t(1)\n2\tInc\tPROPN\tinc\tORG\t1)\n3\tannounced\tVERB\tannounce\tO\t-\n# end document\n`,
  };
}

// ==================== Notifications ====================

let mockNotifications: Notification[] = [
  {
    id: 'notif_01',
    type: NotificationType.INFO,
    title: 'Frontend Mock Mode Active',
    message: 'Authentication is bypassed and sample workspaces are loaded for rapid UI development and testing.',
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

// ==================== Exported Workspace Helpers ====================

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
    annotationType: 'COREF',
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
  if (mockDocuments[workspaceId]) {
    return [...mockDocuments[workspaceId]];
  }
  return [
    {
      id: `doc_${workspaceId}_1`,
      name: 'sample_document_01.txt',
      orderIndex: 0,
      status: 'ANNOTATED',
      workspaceId,
      fileSize: 12400,
      progress: 60,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export function addMockDocumentWithContent(
  workspaceId: string,
  name: string,
  text: string,
  fileSize = 1000,
): DocumentResponse {
  const newDocId = `doc_${Date.now()}`;
  const newDoc: DocumentResponse = {
    id: newDocId,
    name,
    orderIndex: (mockDocuments[workspaceId]?.length || 0),
    status: 'NEW',
    workspaceId,
    fileSize,
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockDocuments[workspaceId] = [...(mockDocuments[workspaceId] || []), newDoc];
  mockDocumentContent.set(newDocId, tokenizeText(text, newDocId));

  const ws = mockWorkspaces.find((w) => w.id === workspaceId);
  if (ws) {
    ws.documentCount = (ws.documentCount || 0) + 1;
  }

  return newDoc;
}

export function getMockMembers(workspaceId?: string): MemberResponse[] {
  void workspaceId;
  return [...MOCK_MEMBERS];
}

export function getMockNotifications(): Notification[] {
  return [...mockNotifications];
}

export function markMockNotificationAsRead(id: string): void {
  const notif = mockNotifications.find((n) => n.id === id);
  if (notif) notif.read = true;
}

export function markAllMockNotificationsAsRead(): void {
  mockNotifications.forEach((n) => {
    n.read = true;
  });
}

export function deleteMockNotification(id: string): void {
  mockNotifications = mockNotifications.filter((n) => n.id !== id);
}
