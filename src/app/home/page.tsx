import HomeContainer from './container/HomeContainer';

export default function page() {
  return (
    <>
      <main className="z-10 flex h-full w-full flex-col items-center justify-center gap-0 bg-white">
        <HomeContainer />
      </main>
    </>
  );
}
