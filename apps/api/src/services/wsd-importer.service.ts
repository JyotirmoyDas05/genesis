/**
 * Service for parsing and bulk importing dictionary senses (e.g. Hemkosh OCR datasets).
 * Supports JSON array, JSON Lines (JSONL), and CSV / TSV files.
 */

export interface RawSenseInput {
  word: string;
  senseLabel?: string | null;
  description?: string | null;
  examples?: string | null;
}

export interface ImportSensesResult {
  totalProcessed: number;
  inserted: number;
  skipped: number;
  updated: number;
}

/**
 * Parses raw file content (JSON, JSONL, or CSV/TSV) into normalized RawSenseInput entries.
 */
export function parseSenseImportContent(content: string, filename?: string): RawSenseInput[] {
  // Strip UTF-8 BOM if present
  let clean = content.replace(/^\uFEFF/, '').trim();
  if (!clean) return [];

  const lowerName = (filename || '').toLowerCase();

  // 1. JSON Array format: [ { ... }, { ... } ]
  if (clean.startsWith('[') || lowerName.endsWith('.json')) {
    try {
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed)) {
        return parsed.map(mapObjectToSenseInput).filter((s): s is RawSenseInput => Boolean(s.word));
      }
    } catch {
      // Fall through to other formats if JSON.parse fails
    }
  }

  // 2. JSONL (JSON Lines) format
  const lines = clean.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length > 0 && lines[0].startsWith('{') && lines[0].endsWith('}')) {
    const entries: RawSenseInput[] = [];
    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        const mapped = mapObjectToSenseInput(obj);
        if (mapped.word) entries.push(mapped);
      } catch {
        // Skip unparseable line
      }
    }
    if (entries.length > 0) return entries;
  }

  // 3. CSV or TSV format
  const delimiter = lowerName.endsWith('.tsv') || (!clean.includes(',') && clean.includes('\t')) ? '\t' : ',';
  return parseDelimited(lines, delimiter);
}

/**
 * Normalizes property keys from various OCR / dictionary formats into RawSenseInput.
 */
function mapObjectToSenseInput(obj: Record<string, unknown>): RawSenseInput {
  const getProp = (...keys: string[]): string | undefined => {
    for (const key of keys) {
      if (typeof obj[key] === 'string' && obj[key].trim()) return obj[key].trim();
      const lower = key.toLowerCase();
      for (const k of Object.keys(obj)) {
        if (k.toLowerCase() === lower && typeof obj[k] === 'string' && obj[k].trim()) {
          return obj[k].trim();
        }
      }
    }
    return undefined;
  };

  const word = getProp('word', 'headword', 'entry', 'lemma', 'senseWord', 'text') || '';
  const senseLabel = getProp('senseLabel', 'sense_label', 'label', 'sense', 'senseId', 'id');
  const description = getProp('description', 'gloss', 'meaning', 'definition');
  const examples = getProp('examples', 'example', 'example_sentence', 'sentence', 'sentences');

  return {
    word,
    senseLabel: senseLabel || null,
    description: description || null,
    examples: examples || null,
  };
}

/**
 * Simple CSV/TSV parser supporting quoted fields and embedded commas.
 */
function parseDelimited(lines: string[], delimiter: string): RawSenseInput[] {
  if (lines.length < 2) return [];

  const headers = splitDelimitedLine(lines[0], delimiter).map(h => h.trim().toLowerCase());
  const wordIdx = headers.findIndex(h => ['word', 'headword', 'entry', 'lemma', 'senseword'].includes(h));
  const labelIdx = headers.findIndex(h => ['senselabel', 'sense_label', 'label', 'sense', 'senseid', 'id'].includes(h));
  const descIdx = headers.findIndex(h => ['description', 'gloss', 'meaning', 'definition'].includes(h));
  const exIdx = headers.findIndex(h => ['examples', 'example', 'example_sentence', 'sentence'].includes(h));

  if (wordIdx === -1) {
    // If no explicit header matched, assume columns: [word, senseLabel, description, examples]
    return lines.slice(1).map(line => {
      const cols = splitDelimitedLine(line, delimiter);
      return {
        word: cols[0]?.trim() || '',
        senseLabel: cols[1]?.trim() || null,
        description: cols[2]?.trim() || null,
        examples: cols[3]?.trim() || null,
      };
    }).filter(s => Boolean(s.word));
  }

  const results: RawSenseInput[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitDelimitedLine(lines[i], delimiter);
    const word = cols[wordIdx]?.trim() || '';
    if (!word) continue;

    results.push({
      word,
      senseLabel: labelIdx !== -1 ? cols[labelIdx]?.trim() || null : null,
      description: descIdx !== -1 ? cols[descIdx]?.trim() || null : null,
      examples: exIdx !== -1 ? cols[exIdx]?.trim() || null : null,
    });
  }

  return results;
}

/**
 * Splits a CSV/TSV row respecting double quotes.
 */
function splitDelimitedLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
