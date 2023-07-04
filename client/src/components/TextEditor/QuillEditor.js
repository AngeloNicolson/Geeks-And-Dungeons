import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillToolbar, { modules, formats } from "./QuillToolbar";

const QuillEditor = ({ onPaste, getText }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.editor.pasteHTML("");
    }
  }, []);

  useEffect(() => {
    const handlePaste = (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData("text/plain");
      const maxLength = 1777;
      if (pastedData.length > maxLength) {
        event.preventDefault();
        const truncatedText = pastedData.substring(0, maxLength);
        insertTextAtSelection(truncatedText);
      }
    };

    const quill = quillRef.current && quillRef.current.getEditor();
    if (quill) {
      quill.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
        const text = node.data;
        const maxLength = 1777;
        if (text.length > maxLength) {
          const truncatedText = text.substring(0, maxLength);
          node.data = truncatedText;
          const range = new Range();
          range.setStart(node, maxLength);
          range.setEnd(node, text.length);
          const selection = quill.getSelection();
          if (selection) {
            quill.setSelection(range);
          }
        }
        return delta;
      });
      quill.root.addEventListener("paste", handlePaste);
    }

    return () => {
      if (quill) {
        quill.root.removeEventListener("paste", handlePaste);
      }
    };
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      if (quill) {
        const unprivilegedEditor =
          quillRef.current.makeUnprivilegedEditor(quill);
        const text = unprivilegedEditor.getText();
        console.log(text);
        // This if statment is to stop quill from inserting \n into the editor,
        if (text.trim() !== "") {
          getText(text); // Callback to parent component with the text content
        }
      }
    }
  }, [getText]);

  const insertTextAtSelection = (text) => {
    const quill = quillRef.current && quillRef.current.getEditor();
    if (quill) {
      const selection = quill.getSelection();
      if (selection) {
        quill.insertText(selection.index, text);
      }
    }
  };

  return (
    <div>
      <QuillToolbar toolbarId="myToolbar" />
      <ReactQuill
        ref={quillRef}
        className="quill-editor"
        modules={modules("myToolbar")}
        formats={formats}
        onPaste={onPaste}
      />
    </div>
  );
};

export default QuillEditor;
