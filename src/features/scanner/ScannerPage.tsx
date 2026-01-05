
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function ScannerPage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [paused, setPaused] = useState(false);

    const handleScan = (detectedCodes: any[]) => {
        if (paused || !detectedCodes || detectedCodes.length === 0) return;

        const result = detectedCodes[0];
        const rawValue = result.rawValue;

        if (!rawValue) return;

        console.log('Scanned:', rawValue);

        try {
            // Check if it's a URL or just a path
            let path = rawValue;
            if (rawValue.startsWith('http')) {
                try {
                    const url = new URL(rawValue);
                    path = url.pathname;
                } catch (e) {
                    console.error('Invalid URL:', e);
                }
            }

            // Logic ported from Flutter: /companyDetail/123 -> /company/123
            if (path.includes('/companyDetail/')) {
                const parts = path.split('/');
                const companyIdStr = parts[parts.length - 1]; // Get last part
                const companyId = parseInt(companyIdStr, 10);

                if (!isNaN(companyId)) {
                    setPaused(true); // Pause scanning to prevent multiple triggers
                    navigate(`/company/${companyId}`);
                } else {
                    setError('Invalid Company ID format');
                    // Clear error after 3 seconds
                    setTimeout(() => setError(null), 3000);
                }
            } else {
                // Mirroring Flutter strictness
                setError('Invalid QR Code. Please scan a Company QR.');
                setTimeout(() => setError(null), 3000);
            }

        } catch (e) {
            console.error('Error processing scan:', e);
            setError('Error processing scan');
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleError = (error: any) => {
        console.error('Scanner error:', error);
        setError('Try scanning again/Allow camera permission');
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-black text-white p-4">
            {/* Header */}
            <div className="w-full flex items-center justify-between mb-6 mt-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-xl font-bold">Scan QR Code</h1>
                <div className="w-10" /> {/* Spacer for centering */}
            </div>

            <div className="w-full max-w-sm aspect-square bg-gray-900 rounded-3xl overflow-hidden relative mb-8 border border-white/20">
                <Scanner
                    onScan={handleScan}
                    onError={handleError}
                    components={{
                        onOff: true,
                        torch: true,
                        zoom: true,
                        finder: true,
                    }}
                    styles={{
                        container: {
                            width: '100%',
                            height: '100%',
                            borderRadius: '1.5rem',
                        },
                        video: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }
                    }}
                    paused={paused}
                />
            </div>

            <p className="text-gray-400 text-center mb-8 px-8">
                Point your camera at a company QR code to view their details.
            </p>

            {error && (
                <div className="bg-red-500/90 text-white px-4 py-3 rounded-lg absolute bottom-20 max-w-xs text-center shadow-lg backdrop-blur-sm animate-bounce">
                    {error}
                </div>
            )}
        </div>
    );
}
