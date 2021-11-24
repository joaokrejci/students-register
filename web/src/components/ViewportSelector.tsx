import React from "react";

interface ViewportSelectorProps {
  smaller: React.ReactElement;
  larger: React.ReactElement;
  step?: number;
}

export default function ViewportSelector({
  smaller,
  larger,
  step = 600,
}: ViewportSelectorProps) {
  if (window.innerWidth > step) {
    return larger;
  }
  return smaller;
}
