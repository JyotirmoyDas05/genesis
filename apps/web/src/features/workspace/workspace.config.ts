import { AnnotationType } from './workspace.contracts';
import { Tag, GitFork, Binary, Sparkles } from 'lucide-react';

export interface TaskTypeConfig {
  type: AnnotationType;
  label: string;
  shortLabel: string;
  description: string;
  icon: typeof Tag;
  sampleTokens: string[];
  theme: {
    accent: string;
    text: string;
    bg: string;
    border: string;
    gradient: string;
    progressGradient: string;
    ring: string;
  };
}

export const TASK_CONFIGS: Record<AnnotationType, TaskTypeConfig> = {
  NER: {
    type: 'NER',
    label: 'Named Entity Recognition',
    shortLabel: 'NER',
    description: 'Classify tokens into pre-defined categories like Disease, Gene, Person, Organization.',
    icon: Tag,
    sampleTokens: ['Disease', 'Gene', 'Chemical'],
    theme: {
      accent: 'emerald',
      text: 'text-emerald-700 dark:text-emerald-300',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      gradient: 'from-emerald-500 to-teal-600',
      progressGradient: 'from-emerald-500 to-teal-500',
      ring: 'ring-emerald-500/20',
    },
  },
  COREF: {
    type: 'COREF',
    label: 'Coreference Resolution',
    shortLabel: 'COREF',
    description: 'Link mentions, pronouns, and noun phrases that refer to the same real-world entity.',
    icon: GitFork,
    sampleTokens: ['Pronoun Chains', 'Nominals', 'Antecedents'],
    theme: {
      accent: 'indigo',
      text: 'text-indigo-700 dark:text-indigo-300',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-200 dark:border-indigo-800/60',
      gradient: 'from-indigo-500 to-blue-600',
      progressGradient: 'from-indigo-500 to-blue-500',
      ring: 'ring-indigo-500/20',
    },
  },
  POS: {
    type: 'POS',
    label: 'Part-of-Speech Tagging',
    shortLabel: 'POS',
    description: 'Mark up syntactic word classes like nouns, verbs, adjectives, and conjunctions.',
    icon: Binary,
    sampleTokens: ['NOUN', 'VERB', 'ADJ', 'ADP'],
    theme: {
      accent: 'amber',
      text: 'text-amber-700 dark:text-amber-300',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800/60',
      gradient: 'from-amber-500 to-orange-600',
      progressGradient: 'from-amber-500 to-orange-500',
      ring: 'ring-amber-500/20',
    },
  },
  WSD: {
    type: 'WSD',
    label: 'Word-Sense Disambiguation',
    shortLabel: 'WSD',
    description: 'Determine which sense of a word is used in context using lexicons like WordNet.',
    icon: Sparkles,
    sampleTokens: ['WordNet 3.1', 'OntoNotes', 'Polysemy'],
    theme: {
      accent: 'violet',
      text: 'text-violet-700 dark:text-violet-300',
      bg: 'bg-violet-50 dark:bg-violet-950/40',
      border: 'border-violet-200 dark:border-violet-800/60',
      gradient: 'from-violet-500 to-purple-600',
      progressGradient: 'from-violet-500 to-purple-500',
      ring: 'ring-violet-500/20',
    },
  },
};

export function getTaskConfig(type: string): TaskTypeConfig {
  const normalized = type.toUpperCase() as AnnotationType;
  return TASK_CONFIGS[normalized] || TASK_CONFIGS.NER;
}
