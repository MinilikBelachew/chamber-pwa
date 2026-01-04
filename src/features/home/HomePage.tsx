import { useGetPublicCategoriesQuery } from '../../store/api';
import SearchBar from './components/SearchBar';
import TopSectors from './components/TopSectors';
import { Skeleton } from '../../components/ui/Skeleton';
import homeBg from '../../assets/homebg.png';
import circleImg from '../../assets/circleimg.png';

export default function HomePage() {
    const { data, isLoading, error } = useGetPublicCategoriesQuery();

    // The API returns { sectors: [...] } based on Flutter analysis (TopSectorsWidget uses state.sectors)
    // We need to verify the exact API response structure. 
    // Assuming data structure matches Flutter's expectation: { sectors: [] }
    const sectors = data?.sectors || [];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <div className="relative h-[360px] w-full">
                {/* Background Image Container */}
                <div className="absolute top-5 left-0 right-0 h-[250px] mx-5 rounded-t-2xl overflow-hidden bg-surface shadow-sm z-0">
                    {/* Use a placeholder if asset is missing, or real asset */}
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        {/*  Ideally we import the asset, for now using a colored block or placeholder if image fails */}
                        <img
                            src={homeBg}
                            className="w-full h-full object-cover"
                            alt="Home Background"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                ((e.target as HTMLImageElement).parentElement as HTMLElement).classList.add('bg-primary/20');
                            }}
                        />
                    </div>
                </div>

                {/* Search Bar - Positioned over the image */}
                <div className="absolute top-[134px] left-[30px] right-[30px] z-10">
                    <SearchBar />
                </div>

                {/* Chamber Info Card */}
                <div className="absolute top-[215px] left-[30px] right-[30px] z-10">
                    <div className="h-[125px] bg-primary rounded-2xl p-5 flex items-center justify-between shadow-lg text-white">
                        <div className="flex-1">
                            <h2 className="text-lg font-bold leading-tight">Chamber of <br />Commerce</h2>
                        </div>
                        <div className="w-[65px] h-[65px] bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                            <img
                                src={circleImg}
                                alt="Logo"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {isLoading ? (
                    <TopSectors sectors={[]} loading={true} />
                ) : error ? (
                    <div className="p-8 text-center text-red-500">
                        Failed to load data. Please try again.
                    </div>
                ) : (
                    <TopSectors sectors={sectors} />
                )}
            </div>
        </div>
    );
}
