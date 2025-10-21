import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/NewGrad_October.pdf';
    link.download = 'Mihai_Lache_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNew = () => {
    window.open('/NewGrad_October.pdf', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gradient-to-br from-black/90 via-slate-900/90 to-cyan-950/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-4 sm:inset-8 lg:inset-12 xl:inset-16 z-50 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 w-full h-full max-w-7xl flex flex-col overflow-hidden">
              {/* Glow effects */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
              
              {/* Enhanced Header */}
              <div className="relative flex items-center justify-between p-4 sm:p-6 md:p-8 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                    Resume
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Mihai Lache - Software Engineer</p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <Button
                    onClick={handleOpenNew}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 hover:border-cyan-500/50 bg-slate-800/50 backdrop-blur-sm hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105 hidden sm:flex"
                  >
                    <ExternalLink className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Open</span>
                  </Button>
                  <Button
                    onClick={handleDownload}
                    size="sm"
                    className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Enhanced PDF Viewer */}
              <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-2 sm:p-4 md:p-6">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/5 border border-slate-700/30">
                  <iframe
                    src="/NewGrad_October.pdf"
                    className="w-full h-full min-h-[400px] sm:min-h-[600px] bg-white"
                    title="Resume PDF"
                  />
                </div>
              </div>

              {/* Mobile action buttons */}
              <div className="sm:hidden flex gap-2 p-4 border-t border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
                <Button
                  onClick={handleOpenNew}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-slate-600 hover:border-cyan-500/50 bg-slate-800/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
