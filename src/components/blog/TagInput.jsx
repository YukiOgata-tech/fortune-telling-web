import React, { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    const tag = input.trim();
    if (tag && !tags.includes(tag)) setTags([...tags, tag]);
    setInput("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-2xl flex items-center gap-1"
        >
          #{tag}
          <button onClick={() => removeTag(tag)} className="text-xs font-bold text-red-400 ml-1">&times;</button>
        </span>
      ))}
      <form onSubmit={addTag} className="flex">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="タグを追加"
          className="px-2 py-1 rounded-xl border border-gray-300"
        />
        <button
          type="submit"
          className="ml-1 px-2 py-1 rounded-xl bg-purple-200 text-purple-800 font-bold"
        >追加</button>
      </form>
    </div>
  );
};

export default TagInput;
