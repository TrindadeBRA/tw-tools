export default function LoadingResult() {
    return (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-[var(--color-main-200)] rounded-full"></div>
                <div className="w-16 h-16 border-4 border-transparent border-t-[var(--color-main-600)] rounded-full absolute top-0 left-0 animate-spin"></div>
            </div>
            <div className="text-center">
                <h3 className="text-lg font-semibold text-[var(--color-main-800)]">Carregando resultado</h3>
                <p className="text-gray-500 mt-2">Aguarde enquanto processamos sua solicitação...</p>
            </div>
            <div className="w-full max-w-sm mt-4">
                <div className="h-1.5 w-full bg-[var(--color-main-100)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-main-600)] rounded-full animate-pulse origin-left" style={{ width: '60%' }}></div>
                </div>
            </div>
        </div>
    )
}