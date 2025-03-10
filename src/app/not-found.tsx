import Link from "next/link";

function NotFoundPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl">Welp, Something is misplaced!</h1>
        <Link href="/" className="underline transition-all hover:text-white">
          Go Home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
