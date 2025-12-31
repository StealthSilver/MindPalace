import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeMap = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  };

  const { width, height } = sizeMap[size];

  return (
    <Image
      src="/mplogo.svg"
      alt="Mind Palace Logo"
      width={width}
      height={height}
      className={className}
    />
  );
}
