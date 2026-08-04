import type { Metadata } from 'next'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import "./globals.css"

export const metadata: Metadata = {
  title: "Project Management App",
  description: "Workspace, project, board, task, and collaboration management",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/"
        >
    <html lang="id">
      <body className="min-h-full flex flex-col">          
          <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">                   
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="auth-button auth-button-secondary">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="auth-button auth-button-primary">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

            </div>
          </header>
          <main className="flex-1">
          {children}
          </main>
      </body>
    </html>
    </ClerkProvider>
  )
}