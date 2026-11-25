import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

interface ResilientArtworkProps {
  src: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
  allowZoom?: boolean;
  className?: string;
}

export function ResilientArtwork({
  src,
  alt,
  caption,
  aspectClass = 'aspect-[3/4]',
  allowZoom = true,
  className = '',
}: ResilientArtworkProps) {
  const [hasError, setHasError] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <figure className={`group ${className}`}>
      <div
        className={`relative overflow-hidden bg-[#EFECE5] dark:bg-[#23201C] border border-stone-200 dark:border-stone-800 ${aspectClass}`}
      >
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F3EFE6] to-[#E6DFD2] dark:from-[#23201C] dark:to-[#191714]">
            <svg
              className="w-10 h-10 text-[#9A3412]/60 dark:text-[#D97757]/60 mb-3"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="6"
                y="6"
                width="36"
                height="36"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16 24h16M24 16v16"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-[18ch]">
              {alt}
            </p>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        )}

        {allowZoom && !hasError && (
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={`放大查看 ${alt}`}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#FBF9F5]/90 dark:bg-[#161513]/90 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>大图</span>
          </button>
        )}
      </div>

      {caption && (
        <figcaption className="mt-2.5 text-xs text-stone-500 dark:text-stone-400 italic leading-relaxed">
          {caption}
        </figcaption>
      )}

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xs"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-[#FBF9F5] dark:bg-[#1C1A17] border border-stone-300 dark:border-stone-700 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-stone-200 dark:border-stone-800">
              <span className="text-sm text-stone-700 dark:text-stone-200 truncate">
                {alt}
              </span>
              <button
                type="button"
                onClick={() => setZoomed(false)}
                aria-label="关闭大图"
                className="inline-flex items-center justify-center w-9 h-9 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 overflow-hidden flex items-center justify-center max-h-[72vh]">
              <img
                src={src}
                alt={alt}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            {caption && (
              <p className="mt-3 text-xs text-stone-500 dark:text-stone-400 italic">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </figure>
  );
}
