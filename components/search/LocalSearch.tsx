"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { useRouter } from "next/navigation";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

/**
 * Keeps the text typed into a page-level search field in sync with the
 * `query` URL parameter. The page can then read that parameter and render
 * matching results on the server.
 *
 * Flow:
 * 1. Read the current `query` from the URL to initialize the input.
 * 2. Wait until the user focuses the input and stops typing for 500 ms.
 * 3. Replace the URL with the new query, or remove it when the input is cleared.
 * 4. Next.js re-renders the page using the updated URL parameter.
 */
const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Do not search on mount, after blur, or when the URL already has this value.
    if (!isSearchOpen || searchQuery === query) return;

    // Debouncing waits for a pause in typing before updating the URL.
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.replace(newUrl, { scroll: false });
      } else {
        // Only remove `query` when it is currently present in the URL.
        if (pathname === route && query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.replace(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [isSearchOpen, searchQuery, query, router, route, searchParams, pathname]);

  return (
    <div
      className={`background-light800_darkgradient 
        flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="search"
        className="cursor-pointer"
      />
      {/* Focus starts searching; blur cancels any pending debounce timer. */}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onFocus={() => setIsSearchOpen(true)}
        onBlur={() => setIsSearchOpen(false)}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 
        outline-none border-none shadow-none bg-transparent dark:bg-transparent"
      />
    </div>
  );
};

export default LocalSearch;
