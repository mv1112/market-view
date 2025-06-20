'use client';

import { useState, useRef, useEffect } from 'react';
import { CiPlay1, CiSaveUp1 } from 'react-icons/ci';
import { CodeEditor } from '../ui/code-editor';

const SaveScriptDialog = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (name: string) => void }) => {
  const [scriptName, setScriptName] = useState('Untitled Script');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black border border-gray-800 rounded-lg p-4 w-80 shadow-xl">
        <h3 className="text-white font-medium mb-3">Save Script</h3>
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={scriptName}
            onChange={(e) => setScriptName(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/30"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSave(scriptName);
              } else if (e.key === 'Escape') {
                onClose();
              }
            }}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-white bg-black hover:bg-gray-900 rounded border border-gray-700 hover:border-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(scriptName)}
            className="px-3 py-1.5 text-sm text-black bg-white hover:bg-gray-100 rounded border border-white transition-colors flex items-center space-x-1"
          >
            <CiSaveUp1 className="text-xs" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AlgoScriptPage() {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [scriptName, setScriptName] = useState('Untitled Script');
  const [code, setCode] = useState<string>(
    '// Write your trading algorithm here\n' +
    '// Example moving average crossover strategy\n' +
    '\n' +
    '// Define strategy parameters\n' +
    'const shortPeriod = 10;\n' +
    'const longPeriod = 30;\n' +
    '\n' +
    '// Main strategy function\n' +
    'function runStrategy(data) {\n' +
    '  // Your strategy logic here\n' +
    '  console.log("Running strategy with data:", data);\n' +
    '  \n' +
    '  // Example: Calculate moving averages\n' +
    '  // const shortMA = calculateMA(data, shortPeriod);\n' +
    '  // const longMA = calculateMA(data, longPeriod);\n' +
    '  \n' +
    '  // Return trading signals\n' +
    '  return {\n' +
    '    signals: [],\n' +
    '    indicators: {}\n' +
    '  };\n' +
    '}\n' +
    '\n' +
    '// Helper function to calculate moving average\n' +
    'function calculateMA(data, period) {\n' +
    '  // Implementation here\n' +
    '  return [];\n' +
    '}'
  );

  return (
    <div className="h-full w-full flex flex-col">
      {/* Top Dividers */}
      <div className="w-full">
        <div className="h-px w-full bg-white/30"></div>
        <div className="h-px w-full bg-white/10 mt-px"></div>
      </div>
      
      {/* Horizontal Panel */}
      <div className="w-full bg-black px-3 py-2">
        <div className="flex items-center justify-between h-7">
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsSaveDialogOpen(true)}
              className="px-4 py-2 bg-transparent text-white text-base font-medium rounded leading-none hover:bg-gray-800/50 transition-colors flex items-center space-x-2"
            >
              <span>{scriptName}</span>
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                <path d="M4.18179 5.18179C4.35753 5.00605 4.64245 5.00605 4.81819 5.18179L7.49999 7.86359L10.1818 5.18179C10.2665 5.09704 10.3806 5.0494 10.5 5.0494C10.6194 5.0494 10.7335 5.09704 10.8182 5.18179C10.9939 5.35753 10.9939 5.64245 10.8182 5.81819L7.81819 8.81819C7.73345 8.90294 7.61934 8.95058 7.49999 8.95058C7.38064 8.95058 7.26653 8.90294 7.18179 8.81819L4.18179 5.81819C4.00605 5.64245 4.00605 5.35753 4.18179 5.18179Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white text-base font-medium rounded border border-gray-700 hover:bg-gray-700 transition-colors leading-none flex items-center space-x-2">
              <CiPlay1 className="text-base" />
              <span>Add to Chart</span>
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-[12px] text-gray-300 leading-none">
              <span className="text-gray-400">Status:</span> <span className="font-medium text-white">Ready</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Bottom Divider */}
      <div className="h-px w-full bg-white/30"></div>
      
      {/* Code Editor */}
      <div className="flex-1 overflow-hidden">
        <CodeEditor 
          initialValue={code}
          onChange={setCode}
          className="h-full w-full"
        />
      </div>
      
      <SaveScriptDialog 
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={(name) => {
          setScriptName(name);
          setIsSaveDialogOpen(false);
        }}
      />
    </div>
  );
}