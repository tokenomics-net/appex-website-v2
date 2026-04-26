"use client";
// "use client" required -- Next.js route-level Error Boundary requires client component.

import { LegalError } from "@/components/legal/LegalError";

interface ErrorProps {
  error:          Error & { digest?: string };
  unstable_retry: () => void;
}

export default function PrivacyError(props: ErrorProps) {
  return <LegalError {...props} />;
}
