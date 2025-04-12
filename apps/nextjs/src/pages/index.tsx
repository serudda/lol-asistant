import { Button } from '~/components';
import { type NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next.js Starter Kit</title>
        <meta name="description" content="A clean Next.js starter kit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Welcome to Next.js Starter Kit</h1>
        <p className="mt-4 text-xl">
          Get started by editing <code className="font-mono font-bold">src/pages/index.tsx</code>
        </p>
        <div className="mt-8 flex gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      </main>
    </>
  );
};

export default Home;
