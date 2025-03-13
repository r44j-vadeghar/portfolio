"use client";
import { useInView } from "framer-motion";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useFeatureStore } from "./feature-store";

function FeaturedContent({
  children,
  id,
}: PropsWithChildren & {
  id: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const documentRef = useRef(document);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
    // @ts-ignore
    root: documentRef,
  });
  const setInViewFeature = useFeatureStore((state) => state.setInViewFeature);
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);

  useEffect(() => {
    if (isInView) setInViewFeature(id);
    // if (!isInView && inViewFeature === id) setInViewFeature(null);
  }, [isInView, id, setInViewFeature, inViewFeature]);

  return (
    <div
      ref={ref}
      className={`py-[30vh] transition-opacity ${isInView ? "" : "opacity-30"}`}
    >
      {children}
    </div>
  );
}

export default FeaturedContent;
