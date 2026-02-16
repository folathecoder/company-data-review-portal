'use client';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => (
  <div className="min-h-screen bg-background flex items-center justify-center px-6">
    <div className="text-center max-w-md">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button type="button" onClick={reset} className="btn-primary mx-auto">
        Try again
      </button>
    </div>
  </div>
);

export default ErrorPage;
