export function HangingChains() {
    return (
        <>
            {/* Left Chain */}
            <img
                src="/chain.png"
                alt="Hanging Chain"
                className="absolute top-0 left-10 h-[60vh] w-auto animate-swing z-10 pointer-events-none opacity-80 mix-blend-multiply"
                style={{ animationDelay: '0s' }}
            />

            {/* Right Chain */}
            <img
                src="/chain.png"
                alt="Hanging Chain"
                className="absolute top-0 right-20 h-[40vh] w-auto animate-swing z-10 pointer-events-none opacity-80 mix-blend-multiply"
                style={{ animationDelay: '2s' }}
            />
        </>
    );
}
