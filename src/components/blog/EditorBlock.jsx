// src/components/blog/EditorBlock.jsx
import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";

// インポートするツールを追加
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link"; // ★ リンクツールをインポート
import Marker from "@editorjs/marker";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";

const HOLDER_ID = "editorjs-holder"; // IDが一意であることを確認

const EditorBlock = ({ initialData, onChange }) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    // インスタンスがなければ初期化
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: HOLDER_ID,
        autofocus: true,
        placeholder: "ここから本文を書き始めてください…",
        tools: {
          header: Header,
          linkTool: LinkTool, // ★ ツールとして追加
          image: {
            class: ImageTool,
            config: {
              uploader: {
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
          if (editorInstance.current) {
            const content = await editorInstance.current.save();
            onChange?.(content);
          }
        },
      });
    }

    // コンポーネントがアンマウントされる時にインスタンスを破棄
    return () => {
      if (editorInstance.current && typeof editorInstance.current.destroy === "function") {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  // initialDataが変更されたときのみ再初期化するように依存配列を調整
  }, [initialData, onChange]);

  return (
    <div
      id={HOLDER_ID}
      className="bg-white/70 rounded-2xl shadow-lg p-4"
      style={{ minHeight: 200 }}
    />
  );
};

export default EditorBlock;
