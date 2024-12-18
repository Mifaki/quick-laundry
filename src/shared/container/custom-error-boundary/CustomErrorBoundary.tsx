'use client';

import { Button } from '../ui/button';

interface ICustomErrorBoundary {
  error: unknown;
}

const CustomErrorBoundary = ({ error }: ICustomErrorBoundary) => {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

  return (
    <div className="p-5">
      <div className="h-full w-full rounded-lg bg-red-100">
        <div className="text-ny-error-500 flex min-h-[50vh] flex-col items-center justify-center gap-[20px] text-center">
          <div>
            <div className="text-[30px] font-bold">Something went wrong!</div>
            <div className="font-regular text-[18px]">{errorMessage}</div>
          </div>
          <Button
            className="h-[40px] max-w-max"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomErrorBoundary;
