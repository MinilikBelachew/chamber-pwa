import { useRef } from 'react';

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

    if (!ads || ads.length === 0) return null;

    return (
        <div className="relative w-full">
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {ads.map((ad) => (
                    <div
                        key={ad.id}
                        className="flex-shrink-0 snap-center w-[90%] sm:w-[400px] h-[150px] relative rounded-xl overflow-hidden shadow-sm"
                        onClick={() => ad.link && window.open(ad.link, '_blank')}
                    >
                        <img
                            src={`https://coc.addisanalytics.com/storage/uploads/${ad.photo}`}
                            alt="Ad"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x200?text=Ad';
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
