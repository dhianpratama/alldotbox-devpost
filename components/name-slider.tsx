"use client";
import { useWindowSize } from "@react-hook/window-size";
import { InteractiveMarquee } from "./marquee";

export default function TextSlider({ text }: { text: string }) {
  const [wWidth] = useWindowSize();
  const isMobile = typeof wWidth === "number" && wWidth < 768;
  const isTablet = typeof wWidth === "number" && wWidth >= 768 && wWidth <= 1024;
  return (
    <div>
      {(isMobile && text?.length > 13) || (isTablet && text?.length > 13) ? (
        <InteractiveMarquee>
          <h1 className="text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl ">
            {text}
          </h1>
        </InteractiveMarquee>
      ) : (
        <h1 className="text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl ">
          {text}
        </h1>
      )}
    </div>
  );
}
