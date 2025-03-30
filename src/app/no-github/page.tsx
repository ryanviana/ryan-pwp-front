import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not on GitHub",
  description: "This project is not available on GitHub",
};

export default function NoGithub() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[70vh] relative">
      {/* Background subtle gradient for the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent dark:from-transparent dark:via-gray-800/10 dark:to-transparent rounded-xl" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-7xl mb-6">😔</div>
        <h1 className="text-5xl font-bold mb-6 text-blue-400">Not on GitHub</h1>

        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-xl mb-4">
            This is probably a project for a client and the repository is
            private.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            *sigh of relief* <span className="italic">Maybe someday...</span>
          </p>
        </div>

        <Link
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
        >
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
