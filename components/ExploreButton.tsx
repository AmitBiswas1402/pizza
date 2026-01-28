"use client";

import Image from "next/image";

const ExploreButton = () => {
  return (
    <button className="mt-7 mx-auto" id="explore-btn" type="button">
      <a href="#events">
        Explore Events
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};

export default ExploreButton;
