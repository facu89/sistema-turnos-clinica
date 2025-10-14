import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              Sistema de turnos Turns Med Manager
              <div className="flex items-center gap-2"></div>
            </div>
            <AuthButton />
          </div>
        </nav>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16"></footer>
      </div>
    </main>
  );
}
