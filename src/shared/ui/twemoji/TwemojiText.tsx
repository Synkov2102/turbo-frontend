"use client";

import { FC, useEffect, useRef } from "react";
import twemoji from "twemoji";

interface TwemojiTextProps {
  children: string;
  className?: string;
  as?: "h2" | "h3" | "p" | "span";
  banner?: boolean;
}

export const TwemojiText: FC<TwemojiTextProps> = ({
  children,
  className,
  as = "span",
  banner = false,
}) => {
  const ref = useRef<
    HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
  >(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // Парсим эмодзи и добавляем класс
    twemoji.parse(ref.current, {
      folder: "svg",
      ext: ".svg",
      className: "emoji",
    });

    // Дополнительно применяем стили ко всем img внутри элемента
    const images = ref.current.querySelectorAll("img");

    images.forEach((img) => {
      img.classList.add("emoji");
      img.style.height = "1em";
      img.style.width = "auto";
      img.style.display = "inline-block";
      img.style.verticalAlign = banner ? "middle" : "middle";
      
      if (banner) {
        img.style.margin = "0 0.15em";
        img.style.position = "relative";
        img.style.top = "-0.05em";
      }
    });
  }, [children, banner]);

  const Component = as;

  // TypeScript requires type assertion for dynamic component refs
  // Cast through unknown to satisfy type checker for polymorphic refs
  return (
    <Component
      ref={ref as unknown as React.Ref<HTMLHeadingElement>}
      className={className}
    >
      {children}
    </Component>
  );
};
