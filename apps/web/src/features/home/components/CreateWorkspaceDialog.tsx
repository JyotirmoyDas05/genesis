'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateWorkspaceRequest, AnnotationType } from '@/features/workspace/workspace.contracts';
import { TASK_CONFIGS } from '@/features/workspace/workspace.config';
import { Check, Plus } from 'lucide-react';

interface CreateWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (request: CreateWorkspaceRequest) => Promise<void>;
  isCreating: boolean;
  createError: string | null;
}

export function CreateWorkspaceDialog({
  open,
  onOpenChange,
  onCreate,
  isCreating,
  createError,
}: CreateWorkspaceDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState<AnnotationType>('NER');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedType) return;

    await onCreate({
      name: name.trim(),
      description: description.trim(),
      annotationType: selectedType,
    });

    // Reset form after successful submission
    if (!createError) {
      setName('');
      setDescription('');
      setSelectedType('NER');
    }
  };

  const currentConfig = TASK_CONFIGS[selectedType];
  const CurrentIcon = currentConfig.icon;

  const taskOptions: AnnotationType[] = ['NER', 'COREF', 'POS', 'WSD'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px] rounded-2xl p-0 overflow-hidden border-slate-200 dark:border-slate-800 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
                  Create Annotation Workspace
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Configure your project scope, annotation task schema, and guidelines.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Task Type Selector: Visual Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Annotation Task Type
                </Label>
                <span className="text-[11px] text-slate-400">Select one task schema</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {taskOptions.map((type) => {
                  const cfg = TASK_CONFIGS[type];
                  const Icon = cfg.icon;
                  const isSelected = selectedType === type;

                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`relative flex items-start gap-3 p-3 text-left rounded-xl border transition-all duration-150 ${
                        isSelected
                          ? `bg-white dark:bg-slate-900 border-primary ring-2 ring-primary/20 shadow-sm`
                          : `bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/70 hover:border-slate-300`
                      }`}
                    >
                      <div
                        className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center border ${cfg.theme.bg} ${cfg.theme.border}`}
                      >
                        <Icon className={`w-4 h-4 ${cfg.theme.text}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {cfg.shortLabel}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {cfg.label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Workspace Name */}
            <div className="space-y-1.5">
              <Label htmlFor="ws-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Workspace Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ws-name"
                placeholder="e.g. Clinical Trial Drug Mentions"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10 text-sm rounded-xl border-slate-200 dark:border-slate-700 focus-visible:ring-primary"
              />
            </div>

            {/* Workspace Description */}
            <div className="space-y-1.5">
              <Label htmlFor="ws-desc" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Description & Annotation Guidelines
              </Label>
              <Textarea
                id="ws-desc"
                placeholder="Briefly describe the corpus and objectives for your annotators..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="text-sm rounded-xl border-slate-200 dark:border-slate-700 focus-visible:ring-primary resize-none"
              />
            </div>

            {/* Live Preview Card */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Live Card Preview
              </span>
              <div className="p-3.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${currentConfig.theme.bg} ${currentConfig.theme.border}`}>
                    <CurrentIcon className={`w-3.5 h-3.5 ${currentConfig.theme.text}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${currentConfig.theme.bg} ${currentConfig.theme.border} ${currentConfig.theme.text}`}>
                    {currentConfig.shortLabel}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {name || 'Untitled Workspace'}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {currentConfig.sampleTokens.map((tok) => (
                    <span key={tok} className="text-[9px] font-mono px-1 py-0.5 rounded bg-white dark:bg-slate-800 border text-slate-500">
                      {tok}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {createError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-3.5 py-2.5 text-xs text-red-700 dark:text-red-300"
              >
                {createError}
              </div>
            )}
          </div>

          <DialogFooter className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!name.trim() || isCreating}
              className="rounded-xl font-semibold gap-1.5 shadow-sm"
            >
              {isCreating ? (
                <>Creating Workspace...</>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Workspace
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
