"use client";
import { useEffect, useState } from "react";

export default function CommentSection({ budayaId, userId, onNewComment }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`/api/comments?budayaId=${budayaId}`)
      .then((res) => res.json())
      .then(setComments);
  }, [budayaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newComment,
        userId,
        budayaId,
      }),
    });

    if (res.ok) {
      const comment = await res.json();
      setComments([comment, ...comments]);
      setNewComment("");

      if (onNewComment) onNewComment();
    }
  };

  return (
    <div>
      {comments.map((c) => (
        <div key={c.id} className="mb-3 border-b pb-2 text-[#433D3D]">
          <p className="text-sm font-semibold">{c.user?.name}</p>
          <p className="text-sm">{c.content}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2 text-black"
          placeholder="Tulis komentar..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#433D3D] text-white px-4 py-1 rounded hover:bg-[#E2D8CC] hover:text-[#433D3D]"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
