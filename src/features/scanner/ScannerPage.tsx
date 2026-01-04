import { Button } from '../../components/ui/Button';
// We would use something like react-qr-reader or similar here
// For PWA, simple webcam access via a library is standard.

export default function ScannerPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center pb-20">
            <div className="w-full max-w-sm aspect-square bg-black rounded-3xl relative overflow-hidden flex items-center justify-center mb-8">
                <div className="text-white text-opacity-50">Camera View</div>
                {/* Simulation of scanner overlay */}
                <div className="absolute inset-10 border-2 border-primary/50 rounded-xl" />
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 animate-pulse" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }} />
            </div>

            <h1 className="text-2xl font-bold mb-2">Scan QR Code</h1>
            <p className="text-gray-500 mb-8">
                Point your camera at a company QR code to view their details.
            </p>

            <Button size="lg" className="w-full max-w-sm">
                Permission Required
            </Button>

            <p className="text-xs text-gray-400 mt-4">
                (Scanner implementation requires additional libraries like react-qr-reader)
            </p>
        </div>
    );
}
