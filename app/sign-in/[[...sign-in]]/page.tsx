import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="page-shell" style={{ paddingTop: '3rem' }}>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" afterSignOutUrl="/" />
    </main>
  );
}
