import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BOARD_MEMBERS = [
    { id: "1", name: "Mr. Sebsib Abafira Abajobir", role: "President", image: "/images/mrsebsib.png" },
    { id: "2", name: "Dr. Aynalem Abayneh Mamo", role: "Vice President", image: "/images/draynalem.png" },
    { id: "3", name: "Mr Berihu Haftu Girmay", role: "Board Member", image: "/images/mrberihu.png" },
    { id: "4", name: "Eng. Alemayehu Nigatu Kebede", role: "Board Member", image: "/images/engalemayehu.png" },
    { id: "5", name: "Mr. Abebayehu Girma Wondimu", role: "Board Member", image: "/images/mrabebayehu.png" },
    { id: "6", name: "Mr. Esmael Ali Mohammed", role: "Board Member", image: "/images/mresmael.png" },
    { id: "7", name: "Haji. Ahmed kelifa Zeruke", role: "Board Member", image: "/images/hajiahmed.png" },
    { id: "8", name: "Megabi. Taye Leta Elema", role: "Board Member", image: "/images/megabitaye.png" },
    { id: "9", name: "Mr. Sani Hassen Hussen", role: "Board Member", image: "/images/mrsani.png" },
    { id: "10", name: "Mr. Dawud Hamolo Gado", role: "Board Member", image: "/images/mrdawud.png" },
    { id: "11", name: "Mr. Anteneh Addisu Shibeshi", role: "Board Member", image: "/images/mranteneh.png" }
];

export default function AboutPage() {
    const { t } = useTranslation();
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="pb-24 min-h-screen bg-background text-black dark:text-white">
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Header */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                    {t('about_eccsa')}
                </h1>

                {/* Main Image */}
                <div className="rounded-2xl overflow-hidden mb-8 shadow-lg aspect-video">
                    <img
                        src="/images/onbnew2.jpg"
                        alt="ECCSA Header"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* About Us Content */}
                <div className="space-y-4 text-gray-800 dark:text-gray-200">
                    <h2 className="text-2xl font-bold text-black dark:text-white">{t('aboutUs')}</h2>
                    <p className="text-lg leading-relaxed">{t('welcome_message')}</p>
                    <p className="text-lg leading-relaxed">{t('history')}</p>

                    {showMore && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <p className="text-lg leading-relaxed">{t('paragraph3')}</p>
                            <p className="text-lg leading-relaxed">{t('paragraph4')}</p>
                            <p className="text-lg leading-relaxed">{t('paragraph5')}</p>
                            <p className="text-lg leading-relaxed">{t('paragraph6')}</p>
                        </div>
                    )}

                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="w-full mt-4 flex items-center justify-center gap-2 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                        {showMore ? t('readLess') : t('readMore')}
                        {showMore ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                </div>

                {/* Stats */}
                <div className="my-16 flex flex-col items-center space-y-8 text-center">
                    {[
                        { count: '12', label: t('stats.regional_chambers') },
                        { count: '2', label: t('stats.city_chambers') },
                        { count: '1', label: t('stats.national_chamber') },
                        { count: '6', label: t('stats.sectoral_associations') }
                    ].map((stat, idx) => (
                        <div key={idx} className="w-full">
                            <div className="text-4xl font-bold text-primary mb-1">{stat.count}</div>
                            <div className="text-lg font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                            {idx < 3 && <div className="mt-8 mx-auto w-48 h-px bg-gray-200 dark:bg-gray-800" />}
                        </div>
                    ))}
                </div>

                {/* Values */}
                <div className="my-16">
                    <h2 className="text-2xl font-bold mb-6">{t('values')}</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'integrity', 'professionalism', 'memberCentric',
                            'collaborativePartnerships', 'transparency',
                            'accountability', 'corporateSocialResponsibility'
                        ].map(val => (
                            <li key={val} className="flex items-start gap-3 text-lg">
                                <span className="text-primary font-bold mt-1">•</span>
                                {t(val)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mission & Vision */}
                <div className="my-16 space-y-6">
                    <h2 className="text-2xl font-bold">{t('missionVision')}</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-8 bg-gray-50 dark:bg-surface rounded-3xl border border-transparent dark:border-gray-800">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">✨</span>
                                {t('vision')}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">{t('visionStatement')}</p>
                        </div>
                        <div className="p-8 bg-gray-50 dark:bg-surface rounded-3xl border border-transparent dark:border-gray-800">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">🚀</span>
                                {t('mission')}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">{t('missionStatement')}</p>
                        </div>
                    </div>
                </div>

                {/* Strategic Priorities */}
                <div className="my-16">
                    <h2 className="text-2xl font-bold mb-6">{t('ECCSAStrategicPriorities')}</h2>
                    <ul className="space-y-4">
                        {[
                            'advocacyAndPolicyInfluence', 'robustMemberEngagementAndSupport',
                            'resourceMobilizationAndOptimization', 'capacityBuildingAndSystemEnhancement',
                            'technologyIntegrationAndDigitalTransformation', 'socialResponsibility',
                            'tradeInvestmentAndPromotion'
                        ].map(val => (
                            <li key={val} className="flex items-start gap-3 text-lg p-4 bg-gray-50 dark:bg-surface rounded-2xl border border-transparent dark:border-gray-800">
                                <span className="text-primary font-bold">•</span>
                                {t(val)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Board Members */}
                <div className="my-16">
                    <h2 className="text-2xl font-bold mb-8 px-2">{t('board_members.section_title')}</h2>
                    <div className="flex overflow-x-auto gap-6 pb-8 px-2 no-scrollbar snap-x snap-mandatory">
                        {BOARD_MEMBERS.map(member => (
                            <div key={member.id} className="flex-shrink-0 w-[280px] snap-center group">
                                <div className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-surface border border-gray-100 dark:border-gray-800 mb-4 aspect-[4/5] relative">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/images/user.png';
                                        }}
                                    />
                                </div>
                                <div className="px-2">
                                    <h4 className="font-bold text-lg leading-tight mb-1">{member.name}</h4>
                                    <p className="text-primary font-medium">{t(member.role === 'President' ? 'president' : member.role === 'Vice President' ? 'vicePresident' : 'boardMember')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ads Section */}
                <div className="my-16 flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory">
                    <div className="flex-shrink-0 w-full md:w-[600px] aspect-video rounded-3xl overflow-hidden shadow-xl snap-center transition-transform hover:scale-[1.02]">
                        <img src="/images/aboutad2.png" alt="Ad 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-shrink-0 w-full md:w-[600px] aspect-video rounded-3xl overflow-hidden shadow-xl snap-center transition-transform hover:scale-[1.02]">
                        <img src="/images/aboutad3.png" alt="Ad 3" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}

