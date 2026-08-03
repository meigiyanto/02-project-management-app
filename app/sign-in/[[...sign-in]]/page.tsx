import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="page-shell" style={{ paddingTop: '3rem' }}>
      <SignIn routing="path" signUpUrl="/sign-up" afterSignOutUrl="/" />
    </main>
  );
}
