import type { LogoAppearanceType, LogoSizeType, LogoVariantType } from './types';
import { LogoAppearance, LogoSize, LogoVariant } from './types';
import { tv, type VariantProps } from 'tailwind-variants';

const SymbolSizes: Record<LogoSizeType, string> = {
  [LogoSize.sm]: 'w-9 h-9',
  [LogoSize.base]: 'w-12 h-12',
  [LogoSize.lg]: 'w-16 h-16',
};

const CompleteSizes: Record<LogoSizeType, string> = {
  [LogoSize.sm]: 'w-[152px] h-8',
  [LogoSize.base]: 'w-36 h-6',
  [LogoSize.lg]: 'w-[192px] h-10',
};

const WordmarkSizes: Record<LogoSizeType, string> = {
  [LogoSize.sm]: 'w-[113px] h-[15px]',
  [LogoSize.base]: 'w-[127px] h-[17px]',
  [LogoSize.lg]: 'w-[141px] h-[19px]',
};

const container = tv({
  base: ['flex items-center gap-2'],
});

const logoStyles = tv({
  base: '',
  variants: {
    variant: {
      [LogoVariant.light]: 'text-white',
      [LogoVariant.dark]: 'text-black',
    },
    appearance: {
      [LogoAppearance.symbol]: '',
      [LogoAppearance.wordmark]: '',
      [LogoAppearance.complete]: '',
    },
    size: {
      [LogoSize.sm]: '',
      [LogoSize.base]: '',
      [LogoSize.lg]: '',
    },
  },
  compoundVariants: [
    // Symbol
    { appearance: LogoAppearance.symbol, size: LogoSize.sm, className: SymbolSizes[LogoSize.sm] },
    { appearance: LogoAppearance.symbol, size: LogoSize.base, className: SymbolSizes[LogoSize.base] },
    { appearance: LogoAppearance.symbol, size: LogoSize.lg, className: SymbolSizes[LogoSize.lg] },

    // Wordmark
    { appearance: LogoAppearance.wordmark, size: LogoSize.sm, className: WordmarkSizes[LogoSize.sm] },
    { appearance: LogoAppearance.wordmark, size: LogoSize.base, className: WordmarkSizes[LogoSize.base] },
    { appearance: LogoAppearance.wordmark, size: LogoSize.lg, className: WordmarkSizes[LogoSize.lg] },

    // Complete
    { appearance: LogoAppearance.complete, size: LogoSize.sm, className: CompleteSizes[LogoSize.sm] },
    { appearance: LogoAppearance.complete, size: LogoSize.base, className: CompleteSizes[LogoSize.base] },
    { appearance: LogoAppearance.complete, size: LogoSize.lg, className: CompleteSizes[LogoSize.lg] },
  ],
  defaultVariants: {
    variant: LogoVariant.dark,
    appearance: LogoAppearance.complete,
    size: LogoSize.base,
  },
});

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof logoStyles> {
  /**
   * Specify the label of the logo (for accessibility).
   */
  arialLabel?: string;

  /**
   * If true the text "Beta v2" is shown next to the logo.
   */
  showLabel?: boolean;
}

export const Logo = ({
  className,
  arialLabel = 'Logo',
  showLabel = false,
  variant,
  size,
  appearance,
  ...props
}: LogoProps) => {
  const rootClasses = container({ className });
  const svgClasses = logoStyles({ variant, size, appearance });

  const svgs: Record<LogoAppearanceType, JSX.Element> = {
    [LogoAppearance.symbol]: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 24" fill="none" className={svgClasses}>
        <path
          fill="currentColor"
          d="M12.897 0C19.461 0 25 5.492 25 12s-5.539 12-12.103 12S1 18.508 1 12 6.333 0 12.897 0Zm0 3.127C7.957 3.127 3.95 7.101 3.95 12c0 4.899 4.007 8.872 8.948 8.872 4.941 0 8.949-3.973 8.949-8.872s-4.008-8.873-8.949-8.873Z"
        />
        <path
          fill="currentColor"
          d="M11.05 7.86a2.482 2.482 0 0 1 3.489 0l2.328 2.308a2.432 2.432 0 0 1 0 3.46l-2.328 2.308a2.482 2.482 0 0 1-3.49 0l-2.327-2.308a2.431 2.431 0 0 1 0-3.46L11.05 7.86Zm1.744 1.998a2.05 2.05 0 0 0-2.057 2.04 2.05 2.05 0 0 0 2.057 2.04 2.05 2.05 0 0 0 2.057-2.04 2.05 2.05 0 0 0-2.057-2.04Z"
        />
      </svg>
    ),
    [LogoAppearance.wordmark]: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 18" fill="none" className={svgClasses}>
        <path
          fill="currentColor"
          d="M9.883.914h3.383v10.39c0 1.167-.279 2.188-.836 3.063-.552.875-1.326 1.557-2.32 2.047-.995.484-2.154.727-3.477.727-1.328 0-2.49-.243-3.485-.727-.994-.49-1.768-1.172-2.32-2.047C.276 13.492 0 12.471 0 11.305V.915h3.383v10.1c0 .61.133 1.152.398 1.626.271.474.651.846 1.14 1.117.49.27 1.06.406 1.712.406.656 0 1.226-.135 1.71-.406.49-.271.868-.643 1.134-1.117.27-.474.406-1.016.406-1.625V.914ZM19.432.914v16h-3.383v-16h3.383ZM37.916 6.086a3.509 3.509 0 0 0-.46-1.008 2.845 2.845 0 0 0-.728-.75 3.116 3.116 0 0 0-.968-.476 4.095 4.095 0 0 0-1.195-.164c-.818 0-1.537.203-2.157.609-.614.406-1.094.997-1.437 1.773-.344.771-.516 1.714-.516 2.828 0 1.115.17 2.063.508 2.844.338.781.818 1.378 1.437 1.79.62.405 1.352.609 2.196.609.765 0 1.419-.136 1.96-.407a2.912 2.912 0 0 0 1.25-1.164c.292-.5.438-1.09.438-1.773l.688.101h-4.125V8.352h6.695v2.015c0 1.406-.297 2.615-.89 3.625a6.07 6.07 0 0 1-2.454 2.328c-1.041.542-2.234.813-3.578.813-1.5 0-2.818-.33-3.953-.992-1.136-.667-2.02-1.612-2.656-2.836-.63-1.23-.946-2.688-.946-4.375 0-1.297.188-2.453.563-3.47.38-1.02.911-1.884 1.594-2.593a6.887 6.887 0 0 1 2.383-1.617A7.72 7.72 0 0 1 34.51.695c.906 0 1.75.133 2.531.399.781.26 1.474.63 2.078 1.11.61.478 1.107 1.049 1.492 1.71.386.656.633 1.38.742 2.172h-3.437Z"
        />
      </svg>
    ),
    [LogoAppearance.complete]: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={svgClasses}>
        <path
          fill="currentColor"
          d="M12.897 0C19.461 0 25 5.492 25 12s-5.539 12-12.103 12S1 18.508 1 12 6.333 0 12.897 0Zm0 3.127C7.957 3.127 3.95 7.101 3.95 12c0 4.899 4.007 8.872 8.948 8.872 4.941 0 8.949-3.973 8.949-8.872s-4.008-8.873-8.949-8.873Z"
        />
        <path
          fill="currentColor"
          d="M11.05 7.86a2.482 2.482 0 0 1 3.489 0l2.328 2.308a2.432 2.432 0 0 1 0 3.46l-2.328 2.308a2.482 2.482 0 0 1-3.49 0l-2.327-2.308a2.431 2.431 0 0 1 0-3.46L11.05 7.86Zm1.744 1.998a2.05 2.05 0 0 0-2.057 2.04 2.05 2.05 0 0 0 2.057 2.04 2.05 2.05 0 0 0 2.057-2.04 2.05 2.05 0 0 0-2.057-2.04ZM33 19.728V4.272h4.392l3.84 7.848 3.816-7.848h4.368v15.456h-4.512V12l-2.472 5.088h-2.424L37.512 12v7.728H33ZM51.106 19.728l5.928-15.456h4.776l5.928 15.456h-4.704l-1.296-3.288h-4.656l-1.272 3.288h-4.704Zm6.576-6.528h3.456L59.41 8.664 57.682 13.2ZM70.767 19.728V7.632h-4.344v-3.36h13.2v3.36h-4.344v12.096h-4.512ZM88.714 19.968c-2.8 0-4.936-.688-6.408-2.064-1.472-1.376-2.208-3.32-2.208-5.832 0-2.592.72-4.576 2.16-5.952 1.44-1.392 3.584-2.088 6.432-2.088.96 0 1.816.072 2.568.216.752.144 1.472.344 2.16.6v3.936a10.803 10.803 0 0 0-4.416-.912c-1.456 0-2.536.336-3.24 1.008-.704.656-1.056 1.72-1.056 3.192 0 1.44.368 2.48 1.104 3.12.752.624 1.832.936 3.24.936.768 0 1.512-.072 2.232-.216a11.07 11.07 0 0 0 2.184-.672v3.96c-.688.24-1.416.424-2.184.552-.752.144-1.608.216-2.568.216ZM95.156 19.728V4.272h4.512v5.76h5.328v-5.76h4.512v15.456h-4.512v-5.76h-5.328v5.76h-4.512ZM118.88 19.968c-1.44 0-2.712-.232-3.816-.696-1.088-.48-1.944-1.176-2.568-2.088-.624-.928-.936-2.064-.936-3.408V4.272h4.512v9.024c0 1.888.936 2.832 2.808 2.832.896 0 1.584-.232 2.064-.696.48-.464.72-1.176.72-2.136V4.272h4.512v9.504c0 1.344-.312 2.48-.936 3.408-.608.912-1.464 1.608-2.568 2.088-1.088.464-2.352.696-3.792.696ZM128.227 19.728V4.272h8.496c1.568 0 2.76.368 3.576 1.104.816.736 1.224 1.792 1.224 3.168 0 .8-.152 1.472-.456 2.016a3.482 3.482 0 0 1-1.152 1.296c.656.256 1.176.632 1.56 1.128.4.48.6 1.2.6 2.16 0 1.456-.448 2.584-1.344 3.384-.896.8-2.168 1.2-3.816 1.2h-8.688Zm4.344-9.288h2.928c1.104 0 1.656-.496 1.656-1.488 0-.496-.136-.872-.408-1.128-.256-.256-.712-.384-1.368-.384h-2.808v3Zm0 6.144h3.12c.608 0 1.056-.128 1.344-.384.288-.256.432-.68.432-1.272 0-.496-.144-.872-.432-1.128-.288-.256-.768-.384-1.44-.384h-3.024v3.168Z"
        />
      </svg>
    ),
  };

  return (
    <div className={rootClasses} aria-label={arialLabel} {...props}>
      {svgs[appearance ?? LogoAppearance.complete]}
      {showLabel && <span className="text-sm text-slate-400">Beta v2</span>}
    </div>
  );
};

Logo.displayName = 'Logo';

export { LogoAppearance, LogoSize, LogoVariant };
export type { LogoAppearanceType, LogoSizeType, LogoVariantType };
