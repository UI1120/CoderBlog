"use client";

import { ArticleCard } from "./ArticleCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

interface Article {
  id: number;
  image: string;
  category: string;
  title: string;
  date: string;
  writer: string;
  writerId?: string | number;
  writerIcon?: string;
}

interface ArticleCarouselProps {
  articles: Article[];
}

export function ArticleCarousel({
  articles,
}: ArticleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const cardsPerView = 3;
  const totalPages = Math.ceil(articles.length / cardsPerView);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 280; // min-w-[280px]
      const gap = 24; // gap-6
      const scrollPosition =
        index * cardsPerView * (cardWidth + gap);
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : totalPages - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex < totalPages - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto pb-4 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div
          className="flex gap-6"
          style={{ width: "max-content" }}
        >
          {articles.map((article) => (
            <div key={article.id} className="w-[280px]">
              <ArticleCard
                id={article.id}
                image={article.image}
                category={article.category}
                title={article.title}
                date={article.date}
                writer={article.writer}
                writerId={article.writerId}
                writerIcon={article.writerIcon}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all z-10"
        aria-label="前へ"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all z-10"
        aria-label="次へ"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
              ? "bg-[#67e0b8] w-8"
              : "bg-black/40 hover:bg-black/60"
              }`}
            aria-label={`ページ ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
