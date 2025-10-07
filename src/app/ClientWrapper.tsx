"use client";

import { Public_Sans } from "next/font/google";

const PublicSans = Public_Sans({
  weight: ["400", "700"],
});

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={`md:px-10 md:mt-10 mt-6 px-4 pb-14 flex-1 overflow-y-auto ${PublicSans.className}`}>
      {children}
    </main>
  );
}
