import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { trpc } from './utils/api';
import viteLogo from '/vite.svg';
import { tv } from 'tailwind-variants';

const styles = tv({
  slots: {
    container: 'max-w-7xl mx-auto p-8 text-center',
    logo: 'h-24 p-6 will-change-[filter] transition-filter duration-300',
    logoHover: 'hover:drop-shadow-[0_0_2em_#646cffaa]',
    reactLogoHover: 'hover:drop-shadow-[0_0_2em_#61dafbaa]',
    title: 'text-white text-7xl',
    card: 'p-8',
    button:
      'rounded-lg border bg-neutral-50 border-transparent px-5 py-2 text-base font-medium cursor-pointer transition-[border-color] duration-250',
    docs: 'text-neutral-400',
  },
});

function App() {
  const [count, setCount] = useState(0);
  const { container, logo, logoHover, reactLogoHover, title, card, button, docs } = styles();

  const { data: userData } = trpc.user.getByEmail.useQuery({
    email: 'serudda.oficial@gmail.com',
  });
  const user = userData?.result.user;

  return (
    <div className={container()}>
      <div className="flex items-center justify-center">
        <p className="text-white">{user?.username}</p>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className={`${logo()} ${logoHover()}`} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={`${logo()} ${reactLogoHover()}`} alt="React logo" />
        </a>
      </div>
      <h1 className={title()}>Vite + React</h1>
      <div className={card()}>
        <button className={button()} onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="text-neutral-400">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={docs()}>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
