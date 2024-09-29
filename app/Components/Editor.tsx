import React, { useImperativeHandle, forwardRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Editor = forwardRef((props, ref) => {
  const { quill, quillRef } = useQuill();

  useImperativeHandle(ref, () => ({
    getEditorContent: () => {
      if (quill) {
        return quill.getText(); // Get plain text content from the editor
      }
      return '';
    }
  }));

  return (
    <div style={{ width: 1000, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
});

export default Editor;
