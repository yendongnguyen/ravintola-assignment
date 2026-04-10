import { useEffect, useRef, useState, type HTMLAttributes } from "react";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  bgUrl: string;
  style?: React.CSSProperties;
}

export default function LazyBgDiv({ bgUrl, className = "", style, children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new window.Image();
          img.onload = () => setLoaded(true);
          img.onerror = () => setLoaded(true);
          img.src = bgUrl;
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [bgUrl]);

  return (
    <div
      ref={ref}
      className={`lazy-bg${loaded ? " lazy-bg--loaded" : ""} ${className}`}
      style={{
        ...style,
        ...(loaded ? { backgroundImage: `url('${bgUrl}')` } : {}),
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
