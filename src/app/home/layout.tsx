import CustomErrorBoundary from "@/shared/container/custom-error-boundary/CustomErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ErrorBoundary FallbackComponent={CustomErrorBoundary}>{children}</ErrorBoundary>;
}
