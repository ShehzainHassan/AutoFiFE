export type ButtonNavigateProps = {
  type: "next" | "prev";
  width?: number;
  height?: number;
  onClick?: () => void;
  backgroundColor?: string;
  whiteButton?: boolean;
  opacity?: number;
  className?: string;
};
