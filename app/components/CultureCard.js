"use client";

import { useEffect, useState } from "react";
import { Heart, MessageCircle, User } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CommentSection from "./CommentSection";

export default function CultureCard({
  id,
  title,
  origin,
  category,
  image,
  description,
  createdAt,
  user,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { data: session } = useSession();
  const [showComments, setShowComments] = useState(false);

  const [commentCount, setCommentCount] = useState(0);

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleNewComment = () => {
    setCommentCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!session?.user?.id) return;

    // Ambil jumlah komentar
    fetch(`/api/comments?budayaId=${id}&count=true`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setCommentCount(data.count);
        }
      });

    // Ambil jumlah like dan status like
    fetch(`/api/interaksi?budayaId=${id}&userId=${session.user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.likeCount === "number") setLikeCount(data.likeCount);
        if (typeof data.liked === "boolean") setLiked(data.liked);
      });
  }, [id, session?.user?.id]);

  const toggleLike = async () => {
    if (!session?.user?.id) return;

    const response = await fetch("/api/interaksi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        budayaId: id,
        userId: session.user.id,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      setLiked(result.liked);
      setLikeCount(result.likeCount);
    }
  };

  const getRelativeTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const isDefault =
    !user?.avatar ||
    user.avatar ===
      "https://res.cloudinary.com/dw8akacak/image/upload/v1753406528/default_avatar_ycdtxc.png";

  const defaultAvatar =
    "https://res.cloudinary.com/dw8akacak/image/upload/v1753406528/default_avatar_ycdtxc.png";

  return (
    <>
      <div
        id={`culture-${id}`}
        className="text-[#B49C78] rounded-2xl p-4 w-full"
      >
        <div className="flex items-start gap-3 mb-3 mt-3">
          <Image
            src={isDefault ? defaultAvatar : user.avatar}
            alt="Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover bg-gray-200"
          />

          <div className="flex flex-col">
            <span className="font-semibold">{user?.name}</span>
            <span className="text-sm text-white">
              {user?.username} • {getRelativeTime(createdAt)}
            </span>
          </div>
        </div>

        <div className="ml-12 -mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-200">
          <p className="mt-6 mb-2 font-bold text-[#B49C78] text-2xl">{title}</p>
          <p className="text-[#E2D8CC]">{description}</p>
        </div>

        {image && (
          <div className="ml-12 mt-3 rounded-xl overflow-hidden border border-neutral-800">
            <img src={image} alt={title} className="w-full h-64 object-cover" />
          </div>
        )}

        <div className="ml-12 mt-2 text-xs text-white">
          <p>
            {origin} • {category}
          </p>
        </div>

        <div className="ml-12 mt-3 flex gap-6 text-sm text-white items-center">
          <button
            onClick={toggleLike}
            className="flex items-center gap-1 hover:text-red-500 transition"
          >
            <Heart
              className={`w-4 h-4 ${
                liked ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
            {likeCount}
          </button>
          <span
            className="flex items-center gap-1 hover:text-[#E2D8CC] cursor-pointer"
            onClick={() => setIsCommentModalOpen(true)}
          >
            <MessageCircle className={"w-4 h-4"} /> {commentCount}
          </span>
        </div>
        {showComments && (
          <CommentSection
            budayaId={id}
            userId={session?.user?.id}
            onNewComment={handleNewComment}
          />
        )}
      </div>
      {isCommentModalOpen && (
        <div className="fixed min-h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-black hover:text-red-500"
              onClick={() => setIsCommentModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4 text-[#433D3D]">
              Komentar
            </h2>
            <CommentSection
              budayaId={id}
              userId={session?.user?.id}
              onNewComment={handleNewComment}
            />
          </div>
        </div>
      )}
    </>
  );
}
