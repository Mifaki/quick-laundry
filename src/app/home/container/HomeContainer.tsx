import { Button } from '@/shared/container/ui/button';

const HomeContainer = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <p>HomeContainer</p>
      <div className="mt-4 flex items-center gap-4">
        <Button size={'lg'}>Primary</Button>
        <Button
          size={'lg'}
          variant={'secondary'}
        >
          Secondary
        </Button>
      </div>
    </div>
  );
};

export default HomeContainer;
