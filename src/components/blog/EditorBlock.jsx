// src/components/EditorBlock.jsx
import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Marker from "@editorjs/marker";
import Warning from "@editorjs/warning";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import List from "@editorjs/list";
import Table from "@editorjs/table";

const HOLDER_ID = "editorjs"; // 必ず一意

const EditorBlock = ({ initialData, onChange }) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    if (
      editorInstance.current &&
      typeof editorInstance.current.destroy === "function"
    ) {
      editorInstance.current.destroy();
      editorInstance.current = null;
    }
    editorInstance.current = new EditorJS({
      holder: HOLDER_ID,
      autofocus: true,
      placeholder: "ここから本文を書き始めてください…",
      tools: {
        header: Header,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              // 動的インポートしている
              async uploadByFile(file) {
                const { uploadImageToStorage } = await import(
                  "@/utils/uploadImageToStorage"
                );
                const url = await uploadImageToStorage(file);
                return { success: 1, file: { url } };
              },
            },
          },
        },
        marker: Marker,
        warning: Warning,
        delimiter: Delimiter,
        list: List,
        table: Table,
      },
      data: initialData || { blocks: [] },
      onChange: async () => {
        const content = await editorInstance.current.save();
        onChange && onChange(content);
      },
    });

    return () => {
      if (
        editorInstance.current &&
        typeof editorInstance.current.destroy === "function"
      ) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
    // 依存配列は[]で初回のみ
  }, []);

  return (
    <div
      id={HOLDER_ID}
      className="bg-white/70  rounded-2xl shadow-lg p-4"
      style={{ minHeight: 200 }}
    />
  );
};

export default EditorBlock;
