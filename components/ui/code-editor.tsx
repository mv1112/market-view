'use client';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { minimalSetup } from 'codemirror';
import { useState, useCallback } from 'react';

// Custom dark theme with pure black background
const customDarkTheme = EditorView.theme({
  '&': {
    color: '#abb2bf',
    backgroundColor: '#000000'
  },
  '.cm-content': {
    caretColor: '#528bff',
    backgroundColor: '#000000',
    minHeight: '100vh'
  },
  '.cm-scroller': {
    backgroundColor: '#000000',
    fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
    minHeight: '100vh'
  },
  '.cm-line': {
    backgroundColor: 'transparent'
  },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#528bff' },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: '#3E4451' },
  '.cm-panels': { backgroundColor: '#000000', color: '#abb2bf' },
  '.cm-panels.cm-panels-top': { borderBottom: '2px solid #3E4451' },
  '.cm-panels.cm-panels-bottom': { borderTop: '2px solid #3E4451' },
  '.cm-searchMatch': {
    backgroundColor: '#72a1ff59',
    outline: '1px solid #457dff'
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#6199ff2f'
  },
  '.cm-activeLine': { backgroundColor: '#0a0a0a' },
  '.cm-selectionMatch': { backgroundColor: '#aafe661a' },
  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: '#bad0f847'
  },
  '.cm-gutters': {
    backgroundColor: '#000000',
    color: '#495162',
    border: 'none'
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#0a0a0a'
  },
  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ddd'
  },
  '.cm-tooltip': {
    border: 'none',
    backgroundColor: '#1a1a1a'
  },
  '.cm-tooltip .cm-tooltip-arrow:before': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  '.cm-tooltip .cm-tooltip-arrow:after': {
    borderTopColor: '#1a1a1a',
    borderBottomColor: '#1a1a1a'
  },
  '.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor: '#2C313A',
      color: '#abb2bf'
    }
  },
  // Ensure all editor areas have black background
  '.cm-editor': {
    backgroundColor: '#000000'
  },
  '.cm-editor.cm-focused': {
    backgroundColor: '#000000'
  },
  // Override any default white backgrounds
  '&.cm-editor': {
    backgroundColor: '#000000 !important'
  },
  '&.cm-editor .cm-scroller': {
    backgroundColor: '#000000 !important'
  },
  '&.cm-editor .cm-content': {
    backgroundColor: '#000000 !important'
  }
}, { dark: true });

// Custom syntax highlighting for the dark theme
const customHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#c678dd' },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: '#e06c75' },
  { tag: [t.function(t.variableName), t.labelName], color: '#61afef' },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#d19a66' },
  { tag: [t.definition(t.name), t.separator], color: '#abb2bf' },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: '#e6c07b' },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: '#56b6c2' },
  { tag: [t.meta, t.comment], color: '#5c6370' },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: '#56b6c2', textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: '#e06c75' },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#d19a66' },
  { tag: [t.processingInstruction, t.string, t.inserted], color: '#98c379' },
  { tag: t.invalid, color: '#ffffff', backgroundColor: '#e06c75' }
]);

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
    <div className={`h-full w-full overflow-auto bg-black ${className}`} style={{ minHeight: '300px', maxHeight: '100%' }}>
      <CodeMirror
        value={value}
        height="100%"
        extensions={[
          minimalSetup,
          javascript({ jsx: true, typescript: true }),
          syntaxHighlighting(customHighlightStyle),
          customDarkTheme
        ]}
        onChange={handleChange}
      />
    </div>
  );
}
