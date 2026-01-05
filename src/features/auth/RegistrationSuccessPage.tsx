import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smile } from 'lucide-react';

export default function RegistrationSuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-black dark:text-white">
            <div className="p-4">
                <button
                    onClick={() => navigate('/settings')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>

            <div className="max-w-md mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
                {/* Smiley Icon */}
                <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mb-8">
                    <Smile className="w-14 h-14 text-primary" />
                </div>

                {/* Success Title */}
                <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>

                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    Thank you for registering your company. We're excited to have you on board!
                </p>

                {/* Info Box */}
                <div className="w-full p-6 bg-blue-50 dark:bg-primary/10 rounded-2xl border border-blue-100 dark:border-primary/20">
                    <p className="text-blue-700 dark:text-blue-300 font-medium">
                        Your company details have been received and our team will review them shortly.
                    </p>
                </div>

                <div className="mt-12 w-full">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
