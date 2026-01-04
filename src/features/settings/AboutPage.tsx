export default function AboutPage() {
    return (
        <div className="p-6 pb-24 min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
            <h1 className="text-2xl font-bold mb-4">About Us</h1>
            <div className="prose dark:prose-invert">
                <p>
                    The Ethiopian Chamber of Commerce and Sectoral Associations (ECCSA) is the oldest and strongest private sector organization in Ethiopia.
                    It was established in 1947 with the objective of promoting trade and investment in the country.
                </p>
                <p className="mt-4">
                    ECCSA works to create a conducive business environment, bridge the gap between the private sector and the government, and promote Ethiopian products and services to the global market.
                </p>
            </div>
        </div>
    );
}
