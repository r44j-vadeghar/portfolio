function NotFoundPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl">Welp, Something is misplaced!</h1>
        <a href="/" className="underline transition-all hover:text-white">
          Go Home
        </a>
      </div>
    </main>
  );
}

export default NotFoundPage;
