import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRegisterCompanyMutation } from '../../store/api';
import { Button } from '../../components/ui/Button';

export default function RegistrationPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [registerCompany, { isLoading }] = useRegisterCompanyMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!agreedToTerms) {
            setError(t('mustAgreeTerms'));
            return;
        }

        try {
            await registerCompany(formData).unwrap();
            navigate('/registration-success');
        } catch (err: any) {
            setError(err.data?.message || 'Failed to register. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-background text-black dark:text-white">
            <div className="p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>

            <div className="max-w-md mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold mb-8">{t('createAccount')}</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-gray-500">
                            {t('name')}
                        </label>
                        <input
                            type="text"
                            required
                            placeholder={t('enterName')}
                            className="w-full bg-gray-50 dark:bg-surface border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-gray-500">
                            {t('email')}
                        </label>
                        <input
                            type="email"
                            required
                            placeholder={t('enterEmail')}
                            className="w-full bg-gray-50 dark:bg-surface border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-gray-500">
                            {t('phone')}
                        </label>
                        <input
                            type="tel"
                            required
                            placeholder={t('enterPhone')}
                            className="w-full bg-gray-50 dark:bg-surface border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    {/* Terms */}
                    <div className="flex items-center gap-3 py-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                        />
                        <label htmlFor="terms" className="text-sm font-medium">
                            {t('agreeTerms')}{' '}
                            <span className="font-bold text-primary">{t('termsConditions')}</span>
                        </label>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            t('getStarted')
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
