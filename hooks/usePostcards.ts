"use client";
import { useEffect, useState } from "react";
import { Postcard } from "@/components/PostcardCard/PostcardCard.types";
import {
  getPostcards,
  updatePostcard as storageUpdate,
  deletePostcard as storageDelete,
} from "@/utils/storage";
import { CARDS_PER_PAGE } from "@/utils/constants";
import { createBrowserClient } from "@/lib/supabase";

export function usePostcards() {
  const [allPostcards, setAllPostcards] = useState<Postcard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient();

  const reload = async () => {
    setLoading(true);
    try {
      const data = await getPostcards(supabase);
      setAllPostcards(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
  }, []);

  const handleDelete = async (id: string) => {
    await storageDelete(id);
    const updated = await getPostcards(supabase);
    setAllPostcards(updated);
    const newTotal = Math.max(1, Math.ceil(updated.length / CARDS_PER_PAGE));
    if (currentPage > newTotal) setCurrentPage(newTotal);
  };

  const handleUpdate = async (id: string, patch: Partial<Postcard>) => {
    await storageUpdate(id, patch);
    setAllPostcards(await getPostcards(supabase));
  };

  const totalPages = Math.max(
    1,
    Math.ceil(allPostcards.length / CARDS_PER_PAGE)
  );
  const paginated = allPostcards.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const channel = supabase
      .channel("postcards-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "postcards" },
        () => {
          reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    postcards: paginated,
    allPostcards,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleDelete,
    handleUpdate,
    reload,
  };
}
