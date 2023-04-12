import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import mapStyle from "./mapStyle";

interface MapProps extends google.maps.MapOptions {
  className: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactNode;
}

export default function Map({
  className,
  onClick,
  onIdle,
  children,
  ...options
}: MapProps) {

  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    // every use ref has a .current, which stores the current ref element
    if (ref.current && map === undefined) {
      const googleMap = new window.google.maps.Map(ref.current);
      setMap(googleMap);
    }
  }, [ref, map])
}