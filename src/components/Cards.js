/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import Image1 from "@/assets/images/images.jpg";
import Image2 from "@/assets/images/images2.jpg";
import Image3 from "@/assets/images/images3.jpg";
import Image4 from "@/assets/images/images4.jpg";
import Image from "next/image";

const files = [
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: Image1.src,
  },
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: Image2.src,
  },
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: Image3.src,
  },
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: Image4.src,
  },
];

export default function Cards() {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {files.map((file) => (
        <li key={file.source} className="relative">
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <div className="position relative h-60 w-full">
              <Image
                src={file.source}
                alt=""
                className="pointer-events-none object-cover group-hover:opacity-75"
                fill
              />
            </div>
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {file.title}</span>
            </button>
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {file.title}
          </p>
        </li>
      ))}
    </ul>
  );
}
