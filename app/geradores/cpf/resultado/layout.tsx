export default function ResultadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">{children}</div>
    </main>
  )
} 