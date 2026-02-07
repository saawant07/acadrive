import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Button } from './ui/Button';

export function RequestResourceModal({ isOpen, onClose }) {
    const [subjectName, setSubjectName] = useState('');
    const [moduleTopic, setModuleTopic] = useState('');
    const [urgency, setUrgency] = useState('Medium');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate success
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            onClose();
            // Reset form
            setSubjectName('');
            setModuleTopic('');
            setUrgency('Medium');
        }, 2500);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-md bg-zinc-900 rounded-2xl border border-red-900/30 shadow-[0_0_40px_rgba(127,29,29,0.3)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-2xl font-heading text-white" style={{ fontFamily: '"Grenze Gotisch", cursive' }}>
                                Missing Knowledge?
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Subject Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Subject Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Engineering Mathematics"
                                    value={subjectName}
                                    onChange={(e) => setSubjectName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-red-900/40 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                                />
                            </div>

                            {/* Module/Topic */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Module / Topic
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Module 4 - Calculus"
                                    value={moduleTopic}
                                    onChange={(e) => setModuleTopic(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-red-900/40 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                                />
                            </div>

                            {/* Urgency */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Urgency
                                </label>
                                <select
                                    value={urgency}
                                    onChange={(e) => setUrgency(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-red-900/40 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High (Exam Tomorrow!)</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full px-6 py-4 text-lg font-bold bg-red-900/60 hover:bg-red-800 border border-red-700 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(127,29,29,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                            >
                                <Send className="h-5 w-5" />
                                Send Request
                            </Button>
                        </form>

                        {/* Success Toast */}
                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute inset-0 flex items-center justify-center bg-zinc-900/95"
                                >
                                    <div className="text-center p-8">
                                        <div className="text-4xl mb-4">📜</div>
                                        <p className="text-xl font-heading text-red-400" style={{ fontFamily: '"Grenze Gotisch", cursive' }}>
                                            Your plea has been heard by the Archivist.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
