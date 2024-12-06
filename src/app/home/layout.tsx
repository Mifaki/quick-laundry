import { ErrorBoundary } from 'react-error-boundary';
import CustomErrorBoundary from '@/shared/container/custom-error-boundary/CustomErrorBoundary';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ErrorBoundary FallbackComponent={CustomErrorBoundary}>{children}</ErrorBoundary>;
}
