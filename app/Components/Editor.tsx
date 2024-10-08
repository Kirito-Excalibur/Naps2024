import React, { useImperativeHandle, forwardRef, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Editor = forwardRef((props, ref) => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        [{ 'align': [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"], // Image button to allow image insertion
        ["clean"],
      ],
      imageUploader: {
        upload: (file: File) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);

            fetch("https://api.imgbb.com/1/upload?key=fdec295ccce9cfe02ffb42e4ee1b8bb4", {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((result) => {
                const imageUrl = result.data.url;

                // Ensure quill exists before inserting the image
                if (quill) {
                  const range = quill.getSelection(); // Get the current selection range
                  if (range) {
                    quill.insertEmbed(range.index, "image", imageUrl); // Insert the image at the cursor position
                  }
                }

                resolve(imageUrl); // Resolve the promise with the image URL
              })
              .catch((error) => {
                reject("Upload failed");
                console.error("Error:", error);
              });
          });
        },
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getEditorContent: () => {
      if (quill) {
        return quill.root.innerHTML; // Return HTML content including images
      }
      return "";
    },
  }));

  useEffect(() => {
    if (quill) {
      // You can perform additional setup or actions here once quill is ready
      console.log("Quill is ready!");
    }
  }, [quill]);

  return (
    <div className="h-[400px]">
      <div ref={quillRef} />
    </div>
  );
});

export default Editor;
