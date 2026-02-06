import { Calendar, FileText, Eye, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { getUserId } from '../lib/identity';

export function ResourceCard({ resource, onView, onDelete }) {
    const date = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(new Date(resource.created_at));

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
            <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <FileText className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                        Sem {resource.semester}
                    </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900 line-clamp-2 leading-tight">
                    {resource.subject_name}
                </h3>
                <p className="text-sm text-slate-500 font-medium">{resource.subject_code}</p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-sm text-slate-600 truncate bg-slate-50 px-2 py-1 rounded">
                        <span className="font-semibold text-xs text-slate-400 uppercase tracking-wide mr-2">File</span>
                        {resource.file_name}
                    </p>
                    <p className="text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded">
                        <span className="font-semibold text-xs text-slate-400 uppercase tracking-wide mr-2">Type</span>
                        {resource.resource_type}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {date}
                </span>
                <div className="flex gap-2">
                    {resource.owner_id === getUserId() && (
                        <Button size="sm" variant="destructive" onClick={(e) => {
                            e.stopPropagation();
                            onDelete(resource);
                        }}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                    <Button size="sm" variant="secondary" onClick={() => onView(resource)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                    </Button>
                </div>
            </div>
        </div>
    );
}
