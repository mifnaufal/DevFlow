import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevFlow - Engineering Workspace',
  description: 'Unified engineering workspace for project management, GitHub activity, and AI-powered insights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
