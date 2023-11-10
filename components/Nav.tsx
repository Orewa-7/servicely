"use client";
import React from "react";
import Link from "next/link";

const links = [
  {
    href: "",
    name: "home",
  },
  {
    href: "skills",
    name: "skills",
  },
  {
    href: "services",
    name: "services",
  },
  {
    href: "profiles",
    name: "profiles",
  },
  {
    href: "categories",
    name: "categories",
  },
];

const Nav = () => {
  return (
    <nav className="background-light900_dark200 flex h-screen w-3/12 flex-col px-6 py-12">
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            href={`/${link.href}`}
            className="h3-bold h-12 text-lg"
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
