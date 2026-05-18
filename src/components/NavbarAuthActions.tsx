import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/astro/react';

export default function NavbarAuthActions() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="w-32 h-8 bg-[#1C1C1C] rounded-full animate-pulse" />;
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <a
          href="/dashboard"
          className="inline-flex items-center bg-[#7C3AED] text-white font-semibold text-sm px-4 py-1.5 rounded-lg hover:bg-[#8B5CF6] transition-colors"
        >
          Dashboard
        </a>
        <UserButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <SignInButton mode="redirect">
        <button className="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors cursor-pointer">
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="redirect">
        <button className="inline-flex items-center bg-[#7C3AED] text-white font-semibold text-sm px-4 py-1.5 rounded-lg hover:bg-[#8B5CF6] transition-colors cursor-pointer">
          Get API Key
        </button>
      </SignUpButton>
    </div>
  );
}
