import React from 'react';

interface MarkdownViewerProps {
  content: string;
}

function renderInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(
        <strong key={key++} className="font-semibold text-stone-900 dark:text-stone-100">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      tokens.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 text-xs font-folio bg-[#EAE3D5] dark:bg-[#2A2621] text-[#9A3412] dark:text-[#D97757]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      tokens.push(
        <em key={key++} className="italic text-stone-700 dark:text-stone-300">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens;
}

function parseTableRows(lines: string[]): string[][] {
  return lines.map((line) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim())
  );
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre
          key={key++}
          className="p-4 bg-[#EAE3D5]/70 dark:bg-[#141311] border border-stone-200 dark:border-stone-800 text-xs leading-relaxed overflow-x-auto text-stone-800 dark:text-stone-200 whitespace-pre-wrap"
        >
          {codeLines.join('\n')}
        </pre>
      );
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      blocks.push(
        <hr key={key++} className="my-5 border-stone-200 dark:border-stone-800" />
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      blocks.push(
        <h1
          key={key++}
          className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-200 dark:border-stone-800"
        >
          {renderInline(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      blocks.push(
        <h2
          key={key++}
          className="text-lg font-bold text-[#9A3412] dark:text-[#D97757] pt-3"
        >
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      blocks.push(
        <h3
          key={key++}
          className="text-base font-semibold text-stone-900 dark:text-stone-100 pt-2"
        >
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <blockquote
          key={key++}
          className="pl-4 border-l-2 border-[#9A3412] dark:border-[#D97757] py-1 text-sm text-stone-700 dark:text-stone-300 bg-[#FBF9F5]/60 dark:bg-[#161513]/60 space-y-1.5"
        >
          {quoteLines.map((ql, idx) => (
            <p key={idx}>{renderInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    if (
      trimmed.startsWith('|') &&
      i + 1 < lines.length &&
      /^\|[\s:|-]+\|?$/.test(lines[i + 1].trim())
    ) {
      const tableLines: string[] = [lines[i]];
      i += 2; // skip header + separator
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = parseTableRows(tableLines);
      const header = rows[0] ?? [];
      const bodyRows = rows.slice(1);
      blocks.push(
        <div key={key++} className="overflow-x-auto border border-stone-200 dark:border-stone-800">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-[#EAE3D5]/80 dark:bg-[#25221E]">
              <tr>
                {header.map((cell, cIdx) => (
                  <th
                    key={cIdx}
                    className="px-3 py-2.5 font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 whitespace-nowrap"
                  >
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800 bg-[#FBF9F5]/70 dark:bg-[#161513]/50">
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx} className="align-top">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="px-3 py-2.5 text-stone-700 dark:text-stone-300 leading-relaxed"
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^(\s*[-*]|\s*\d+\.)\s+/.test(rawLine)) {
      const listItems: { indent: number; ordered: boolean; text: string }[] = [];
      while (
        i < lines.length &&
        /^(\s*[-*]|\s*\d+\.)\s+/.test(lines[i])
      ) {
        const current = lines[i];
        const indentMatch = current.match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[1].length : 0;
        const ordered = /^\s*\d+\.\s+/.test(current);
        const text = current.replace(/^(\s*[-*]|\s*\d+\.)\s+/, '');
        listItems.push({ indent, ordered, text });
        i++;
      }
      blocks.push(
        <ul key={key++} className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
          {listItems.map((item, idx) => (
            <li
              key={idx}
              className={`leading-relaxed flex gap-2 ${
                item.indent >= 2 ? 'pl-5 text-stone-600 dark:text-stone-400' : ''
              }`}
            >
              <span className="text-[#9A3412] dark:text-[#D97757] shrink-0 font-folio">
                {item.indent >= 2 ? '◦' : item.ordered ? `${idx + 1}.` : '•'}
              </span>
              <span>{renderInline(item.text)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,3}\s|>|---+$|\|[\s:|-]*|```|(\s*[-*]|\s*\d+\.)\s+)/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push(
      <p key={key++} className="text-sm leading-[1.85] text-stone-700 dark:text-stone-300">
        {renderInline(paraLines.join(' '))}
      </p>
    );
  }

  return <div className="space-y-4">{blocks}</div>;
}
