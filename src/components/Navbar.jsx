import { BookOpen, Upload } from 'lucide-react';
import { Button } from './ui/Button';

export function Navbar({ onUploadClick }) {
    return (
        <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold text-slate-900">Acadrive</span>
                </div>

                <Button onClick={onUploadClick} className="gap-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload Resource</span>
                </Button>
            </div>
        </nav>
    );
}
