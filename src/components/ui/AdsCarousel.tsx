import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Ad {
    id: number;
    photo: string;
    link?: string;
}

interface AdsCarouselProps {
    ads: Ad[];
}

export default function AdsCarousel({ ads }: AdsCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll logic (every 3 seconds)
    useEffect(() => {
        if (!ads || ads.length <= 1) return;

        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const nextIndex = (currentIndex + 1) % ads.length;
                const scrollAmount = scrollContainerRef.current.offsetWidth;

                scrollContainerRef.current.scrollTo({
                    left: nextIndex * scrollAmount,
                    behavior: 'smooth'
                });
                setCurrentIndex(nextIndex);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [ads, currentIndex]);

    // Update currentIndex on manual scroll
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const scrollAmount = scrollContainerRef.current.offsetWidth;
            const newIndex = Math.round(scrollLeft / scrollAmount);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < ads.length) {
                setCurrentIndex(newIndex);
            }
        }
    };

    if (!ads || ads.length === 0) return null;

    return (
        <div className="relative w-full overflow-hidden">
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {ads.map((ad) => (
                    <div
                        key={ad.id}
                        className="flex-shrink-0 snap-center w-full aspect-[21/9] lg:aspect-[5/1] relative overflow-hidden transition-transform active:scale-[0.98] cursor-pointer bg-black"
                        onClick={() => setSelectedAd(ad)}
                    >
                        {/* Background Image (More visible - lower blur, higher opacity) */}
                        <img
                            src={`https://coc.addisanalytics.com/storage/uploads/${ad.photo}`}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-85 scale-105"
                        />

                        {/* Foreground Contain Image */}
                        <div className="absolute inset-0 flex items-center justify-center p-2">
                            <img
                                src={`https://coc.addisanalytics.com/storage/uploads/${ad.photo}`}
                                alt="Ad"
                                className="max-w-full max-h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x200?text=Promotion';
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-1.5 -mt-2 mb-4">
                {ads.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-primary w-4' : 'bg-gray-300 dark:bg-gray-700'
                            }`}
                    />
                ))}
            </div>

            {/* Ad Modal Popup */}
            {selectedAd && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
                    onClick={() => setSelectedAd(null)}
                >
                    <div
                        className="relative max-w-4xl w-full max-h-[80vh] bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Close Button */}
                        <button
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors"
                            onClick={() => setSelectedAd(null)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-2 h-full flex items-center justify-center min-h-[300px]">
                            <img
                                src={`https://coc.addisanalytics.com/storage/uploads/${selectedAd.photo}`}
                                alt="Enlarged Ad"
                                className="max-w-full max-h-full object-contain rounded-xl"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x600?text=Ad+Image';
                                }}
                            />
                        </div>

                        {selectedAd.link && (
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 text-center border-t border-gray-100 dark:border-gray-700">
                                <button
                                    className="w-full py-3 px-6 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-colors"
                                    onClick={() => window.open(selectedAd.link, '_blank')}
                                >
                                    Visit Website
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
