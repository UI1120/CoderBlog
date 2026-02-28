interface HeroSectionProps {
    title: string;
    description: string;
    bgImage: string;
    highlightCount?: number;
}

export function HeroSection({ title, description, bgImage, highlightCount = 0 }: HeroSectionProps) {
    const highlightedText = highlightCount > 0 ? title.substring(0, highlightCount) : "";
    const remainingText = highlightCount > 0 ? title.substring(highlightCount) : title;

    return (
        <section
            className="relative bg-cover bg-center"
            style={{
                backgroundImage: `url('${bgImage}')`,
            }}
        >
            <div className="container mx-auto px-6 py-24 md:py-32">
                <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-[#2d7a5f]/70 rounded-2xl p-8 border-2 border-[#67e0b8] shadow-lg">
                    <h1 className="text-white mb-4 text-4xl font-bold drop-shadow-lg">
                        {highlightCount > 0 ? (
                            <>
                                <span className="text-[#67e0b8]">{highlightedText}</span>
                                {remainingText}
                            </>
                        ) : (
                            title
                        )}
                    </h1>
                    <p className="text-gray-200 mb-0 max-w-2xl mx-auto drop-shadow-md text-xl">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}
