import Link from "next/link";
import type { SVGAttributes } from "react";

export default async function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="w-full bg-transparent p-3 text-neutral-800 md:py-6">
      <div className="container flex max-w-7xl flex-row flex-wrap justify-center gap-16 text-sm sm:justify-between">
        <nav className="grid grid-cols-2 gap-16"></nav>
      </div>
      <div className="container mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row">
        <div>
          <p>
            {" "}
            &copy; Copyright {year} - Made with{" "}
            <span aria-label="love" role="img">
              💖
            </span>{" "}
            in Presov by stefan. All right reserved.{" "}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
            href="https://www.hancar.sk"
          >
            @web
          </Link>
          <Link
            className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
            href="https://www.instagram.com/stefan_hancar/"
          >
            @stefan
          </Link>
        </div>
      </div>
    </footer>
  );
}
