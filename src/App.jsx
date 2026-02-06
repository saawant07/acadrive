import { useEffect, useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { ResourceCard } from './components/ResourceCard';
import { ResourceModal } from './components/ResourceModal';
import { UploadModal } from './components/UploadModal';
import { supabase } from './lib/supabase';
import { Loader2, Database } from 'lucide-react';

function App() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ type: null, semester: null });

  const [viewResource, setViewResource] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        // Search in subject name, code or file name
        query = query.or(`subject_name.ilike.%${searchQuery}%,subject_code.ilike.%${searchQuery}%,file_name.ilike.%${searchQuery}%`);
      }

      if (filters.type) {
        query = query.eq('resource_type', filters.type);
      }

      if (filters.semester) {
        query = query.eq('semester', filters.semester);
      }

      const { data, error } = await query;

      if (error) throw error;
      setResources(data || []);
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters]);

  // Initial fetch and refetch on filter/search change
  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return (
    <Layout onUploadClick={() => setIsUploadOpen(true)}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            Sharing Knowledge, <br className="hidden md:block" />
            <span className="text-blue-600">Made Simple.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            Share and discover academic resources anonymously. No login required.
          </p>

          <div className="max-w-2xl mx-auto mt-8">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>

        {/* Filters */}
        <Filters filters={filters} setFilters={setFilters} />

        {/* content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="h-10 w-10 animate-spin mb-4" />
            <p>Loading resources…</p>
          </div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                onView={setViewResource}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <div className="mx-auto bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Database className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No resources found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-1">
              {searchQuery || filters.type || filters.semester
                ? "Try adjusting your search or filters."
                : "Be the first to upload a resource!"}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ResourceModal
        resource={viewResource}
        onClose={() => setViewResource(null)}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={fetchResources}
      />
    </Layout>
  );
}

export default App;
