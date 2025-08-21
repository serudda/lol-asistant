import { Logo, LogoAppearance, LogoSize, LogoVariant } from '../Logo/Logo';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex flex-col lg:flex-row p-8 lg:p-20 gap-8 lg:gap-0 lg:justify-between border-t border-gray-900'],
});

const logoContainer = tv({
  base: ['flex items-center gap-2'],
});

const description = tv({
  base: ['text-gray-400 max-w-lg font-light leading-relaxed'],
});

const attribution = tv({
  base: ['flex items-center gap-2 text-gray-500 text-sm'],
});

const twitterLink = tv({
  base: ['text-primary-300 hover:text-primary-400 transition-colors duration-200 hover:underline'],
});

const heart = tv({
  base: ['text-red-500'],
});

export interface FooterProps {
  /**
   * Additional class names.
   */
  className?: string;
}

/**
 * Component to display the footer.
 */
export const Footer = ({ className }: FooterProps) => {
  const classes = container({ className });

  return (
    <footer className={classes}>
      <div className="flex flex-col gap-2">
        <div className={logoContainer()}>
          <Logo size={LogoSize.base} appearance={LogoAppearance.complete} variant={LogoVariant.light} />
          <span className="text-gray-500">beta</span>
        </div>

        <p className={description()}>
          No more tab-switching during champ select. Matchub.app shows you champion winrates from Mobalytics, OP.GG, and
          U.GG all in one place. Make better picks in seconds.
        </p>
      </div>

      <div className="flex flex-col gap-1 lg:self-end">
        <div className={attribution()}>
          <span>Made by a LoL fan</span>
          <span className={heart()}>♥</span>
          <a className={twitterLink()} href="https://twitter.com/serudda" target="_blank" rel="noopener noreferrer">
            @serudda
          </a>
        </div>
      </div>
    </footer>
  );
};
