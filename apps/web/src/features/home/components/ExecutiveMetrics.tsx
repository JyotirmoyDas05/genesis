'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { WorkspaceResponse } from '@/features/workspace/workspace.contracts';
import { Layers, FileCheck, Award, Users2 } from 'lucide-react';

interface ExecutiveMetricsProps {
  workspaces: WorkspaceResponse[];
}

export function ExecutiveMetrics({ workspaces }: ExecutiveMetricsProps) {
  const reduceMotion = useReducedMotion();

  const stats = useMemo(() => {
    const totalDocs = workspaces.reduce((acc, w) => acc + (w.documentCount || 0), 0);
    const annotatedDocs = workspaces.reduce((acc, w) => acc + (w.annotatedDocumentCount || 0), 0);
    const completedWorkspaces = workspaces.filter((w) => w.progressPercentage >= 100).length;
    const inProgressWorkspaces = workspaces.length - completedWorkspaces;
    const overallPercentage = totalDocs > 0 ? Math.round((annotatedDocs / totalDocs) * 100) : 0;

    return {
      totalWorkspaces: workspaces.length,
      completedWorkspaces,
      inProgressWorkspaces,
      totalDocs,
      annotatedDocs,
      overallPercentage,
    };
  }, [workspaces]);

  const cards = [
    {
      title: 'Active Workspaces',
      value: stats.totalWorkspaces,
      subtitle: `${stats.inProgressWorkspaces} in progress · ${stats.completedWorkspaces} complete`,
      icon: Layers,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-900/40',
      badge: '4 Tasks Live',
    },
    {
      title: 'Pipeline Throughput',
      value: `${stats.annotatedDocs}/${stats.totalDocs}`,
      subtitle: `${stats.overallPercentage}% total corpus annotated`,
      icon: FileCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-900/40',
      badge: `${stats.overallPercentage}% Complete`,
      progressBar: stats.overallPercentage,
    },
    {
      title: 'Agreement Rate (IAA)',
      value: '96.4%',
      subtitle: "Cohen's κ = 0.91 (High consistency)",
      icon: Award,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/60 dark:border-indigo-900/40',
      badge: '+1.8% this cycle',
      badgePositive: true,
    },
    {
      title: 'Research Team',
      value: '3 Members',
      subtitle: '12 document revisions today',
      icon: Users2,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200/60 dark:border-purple-900/40',
      badge: 'Active Now',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: idx * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={reduceMotion ? {} : { y: -2 }}
            className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_12px_-4px_rgba(0,0,0,0.02)] transition-shadow duration-200 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${card.bg}`}>
                <Icon className={`w-4.5 h-4.5 ${card.color}`} />
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  card.badgePositive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {card.badge}
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {card.title}
              </p>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {card.value}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {card.subtitle}
              </p>

              {typeof card.progressBar === 'number' && (
                <div className="pt-2">
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full"
                      initial={reduceMotion ? { width: `${card.progressBar}%` } : { width: 0 }}
                      animate={{ width: `${card.progressBar}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
