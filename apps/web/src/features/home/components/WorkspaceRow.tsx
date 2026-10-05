'use client';

import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { WorkspaceResponse } from '@/features/workspace/workspace.contracts';
import { getTaskConfig } from '@/features/workspace/workspace.config';
import { formatDistanceToNow, isToday, isYesterday, isAfter, subDays, format } from 'date-fns';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WorkspaceRowProps {
  workspace: WorkspaceResponse;
  index: number;
}

export function WorkspaceRow({ workspace, index }: WorkspaceRowProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const config = getTaskConfig(workspace.annotationType);
  const Icon = config.icon;
  const isComplete = workspace.progressPercentage >= 100;

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    if (isToday(date)) return formatDistanceToNow(date, { addSuffix: true });
    if (isYesterday(date)) return 'Yesterday';
    if (isAfter(date, subDays(now, 7))) return formatDistanceToNow(date, { addSuffix: true });
    return format(date, 'MMM d, yyyy');
  };

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
      transition={{
        duration: 0.25,
        delay: index * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={reduceMotion ? {} : { x: 3 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => router.push(`/workspace/${workspace.id}`)}
      className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150 shadow-xs"
    >
      {/* Left: Icon + Info */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <div
          className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center border shadow-2xs ${config.theme.bg} ${config.theme.border}`}
        >
          <Icon className={`w-4.5 h-4.5 ${config.theme.text}`} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
              {workspace.name}
            </h4>
            <span
              className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded border ${config.theme.bg} ${config.theme.border} ${config.theme.text}`}
            >
              {config.shortLabel}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 max-w-lg">
            {workspace.description || config.description}
          </p>
        </div>
      </div>

      {/* Right: Progress + Metadata + Action */}
      <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
        {/* Progress Mini Bar */}
        <div className="w-36 hidden sm:block">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-slate-500 font-medium">
              {workspace.annotatedDocumentCount}/{workspace.documentCount}
            </span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {workspace.progressPercentage}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-linear-to-r ${config.theme.progressGradient}`}
              style={{ width: `${workspace.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Status / Last Updated */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          {isComplete ? (
            <Badge
              variant="outline"
              className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 gap-1 py-0.5"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Complete
            </Badge>
          ) : (
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-slate-400" />
              {formatLastUpdated(workspace.updatedAt)}
            </span>
          )}

          {/* Quick open arrow */}
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white transition-colors duration-150">
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
