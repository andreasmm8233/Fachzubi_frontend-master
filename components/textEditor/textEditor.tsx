"use client";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";
// Use dynamic to load ReactQuill only on the client side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
    ["link"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

export interface TextEditorType {
  setContent: (data: string) => void;
  content: string;
}

const TextEditor = ({ setContent, content }: TextEditorType) => {
  return (
    <>
      <Box
        component={ReactQuill}
        value={content}
        modules={modules}
        formats={formats}
        onChange={(txt) => setContent(txt)}
        sx={{
          ".ql-toolbar.ql-snow": {
            borderRadius: "10px",
            border: "1px solid #0A969E",
          },
          ".ql-container.ql-snow": {
            border: "1px solid #0096A4",
            marginTop: "-7px",
            paddingTop: "10px",
            borderRadius: "0px 0px 10px 10px",
            fontSize: "16px",
          },
        }}
      />
    </>
  );
};

export default TextEditor;
