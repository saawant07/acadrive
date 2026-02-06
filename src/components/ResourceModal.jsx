import { Download, X, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

export function ResourceModal({ resource, onClose }) {
    if (!resource) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
                    <div>
                        <h3 className="font-semibold text-lg text-slate-900">{resource.subject_name} ({resource.resource_type})</h3>
                        <p className="text-sm text-slate-500">{resource.file_name} • Sem {resource.semester}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="secondary" onClick={() => window.open(resource.file_url, '_blank')}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                        <button onClick={onClose} aria-label="Close modal" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 outline-none">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-slate-100 p-4 overflow-hidden relative">
                    <iframe
                        src={`${resource.file_url}#toolbar=0`}
                        className="w-full h-full rounded-lg border border-slate-200 bg-white shadow-inner motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
                        title={resource.file_name}
                    />
                </div>

                <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs text-slate-400">
                    <span>Previewing file (PDF)</span>
                    <button
                        className="flex items-center hover:text-red-600 transition-colors focus-visible:outline-blue-500"
                        aria-label="Report an issue with this file"
                    >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Report Issue
                    </button>
                </div>
            </div>
        </div>
    );
}
