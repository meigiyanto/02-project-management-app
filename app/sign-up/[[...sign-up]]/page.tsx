import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="page-shell" style={{ paddingTop: '3rem' }}>
      <SignUp routing="path" signInUrl="/sign-in" afterSignOutUrl="/" />
    </main>
  );
}
