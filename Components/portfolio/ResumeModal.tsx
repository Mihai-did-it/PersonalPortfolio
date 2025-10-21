import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
          >
            <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 w-full h-full max-w-6xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-700 bg-slate-800/50">
                <h3 className="text-lg md:text-xl font-semibold text-slate-200">Resume - Mihai Lache</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    className="border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-auto bg-slate-950 p-4">
                <iframe
                  src="/NewGrad_October.pdf"
                  className="w-full h-full min-h-[600px] rounded-lg"
                  title="Resume PDF"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
