"use client";

import { FC, useEffect, useRef } from "react";
import twemoji from "twemoji";

interface TwemojiTextProps {
  children: string;
  className?: string;
  as?: "h2" | "h3" | "p" | "span" | "div";
  banner?: boolean;
}

export const TwemojiText: FC<TwemojiTextProps> = ({
  children,
  className,
  as = "span",
  banner = false,
}) => {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
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
        
        // Для баннера используем middle с небольшим смещением, для остальных - middle
        if (banner) {
          img.style.verticalAlign = "middle";
          img.style.margin = "0 0.15em";
          img.style.position = "relative";
          img.style.top = "-0.05em";
        } else {
          img.style.verticalAlign = "middle";
        }
      });
    }
  }, [children, banner]);

  const Component = as;

  return (
    <Component ref={ref as any} className={className}>
      {children}
    </Component>
  );
};

