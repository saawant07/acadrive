import { clsx } from 'clsx';

export function Filters({ filters, setFilters }) {
    const resourceTypes = ['All', 'Notes', 'Module', 'Question Paper', 'Question Set'];
    const semesters = ['All', '1', '2', '3', '4', '5', '6', '7', '8'];

    const toggleResourceType = (type) => {
        // If 'All' is selected, strictly set to All.
        // If a specific type is selected, switch to it.
        // Simplifying logic: Single select for MVP based on requirements "Resource type filters (pill buttons)" usually implies single active or toggle.
        // "Resource type (text)" in DB suggests one type per file.
        // Let's assume single select for now to keep it simple.

        // If clicking same type, do nothing or user might want to toggle off to clear? 
        // Requirement: "All Resources" is a pill. So it's radio-button functionality.
        setFilters(prev => ({ ...prev, type: type === 'All' ? null : type }));
    };

    const handleSemesterChange = (e) => {
        const val = e.target.value;
        setFilters(prev => ({ ...prev, semester: val === 'All' ? null : parseInt(val) }));
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-slate-500">Type:</span>
                <div className="flex flex-wrap gap-2">
                    {resourceTypes.map((type) => {
                        // Check if active
                        const isActive = (filters.type === null && type === 'All') || filters.type === type;

                        return (
                            <button
                                key={type}
                                onClick={() => toggleResourceType(type)}
                                className={clsx(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-slate-900 text-white shadow-md hover:bg-slate-800"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                                )}
                            >
                                {type}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-500">Semester:</span>
                <select
                    className="h-9 rounded-md border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={filters.semester || 'All'}
                    onChange={handleSemesterChange}
                >
                    <option value="All">All Semesters</option>
                    {semesters.slice(1).map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
