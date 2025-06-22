'use client';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useState, useCallback } from 'react';

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  height?: string;
  className?: string;
}

export function CodeEditor({
  initialValue = '// Write your algorithm here\n',
  onChange,
  height = '400px',
  className = '',
}: CodeEditorProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((val: string) => {
    setValue(val);
    if (onChange) {
      onChange(val);
    }
  }, [onChange]);

  return (
    <div className={`h-full w-full overflow-hidden ${className}`}>
      <CodeMirror
        value={value}
        height="100%"
        extensions={[javascript({ jsx: true, typescript: true })]}
        onChange={handleChange}
        theme="light"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          tabSize: 2,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
        }}
      />
    </div>
  );
}
