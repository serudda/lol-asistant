import { Button, ButtonVariant, TriggerSize } from '@lol-assistant/ui';
import { useBreakpoint } from '../../common';
import { ChampionSearchBar } from '../Inputs';
import { Logo, LogoAppearance, LogoSize, LogoVariant } from '../Logo/Logo';
import { FeedbackFish } from '@feedback-fish/react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex items-center justify-between p-6 px-8 gap-2 lg:gap-4'],
});

export interface NavbarProps {
  /**
   * Additional class names.
   */
  className?: string;
}

/**
 * Component to display the navbar.
 */
export const Navbar = ({ className }: NavbarProps) => {
  const classes = container({ className });
  const search = useSearch({ from: '/champions/$championName' });
  const navigate = useNavigate({ from: '/champions/$championName' });
  const { isMobile } = useBreakpoint();
  const logoSize = isMobile ? LogoSize.sm : LogoSize.base;
  const logoAppearance = isMobile ? LogoAppearance.symbol : LogoAppearance.complete;

  const handleChampionChange = (newChampionSlug: string) => {
    void navigate({
      to: '/champions/$championName',
      params: { championName: newChampionSlug },
      search: { ...search },
    });
  };

  return (
    <nav className={classes}>
      <div className="flex items-center gap-4 w-full lg:min-w-[600px] lg:w-auto">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={logoSize} appearance={logoAppearance} variant={LogoVariant.light} />
          {!isMobile && <span className="text-gray-500">beta</span>}
        </Link>
        <span className="text-gray-600 text-xl">/</span>
        <ChampionSearchBar defaultValue="" onChange={handleChampionChange} size={TriggerSize.base} />
      </div>
      {!isMobile && (
        <div className="flex items-center gap-4">
          <FeedbackFish projectId="8be7540cd843a8">
            <Button variant={ButtonVariant.primary}>Feedback</Button>
          </FeedbackFish>
        </div>
      )}
    </nav>
  );
};
