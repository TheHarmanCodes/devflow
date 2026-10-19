import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

// This component is used to display a metric with an image, value, and title.
// It can optionally be a link if the `href` prop is provided.
// this component is used in the `QuestionCard` component to display metrics like upvotes, answers, and views.
const Metric = (props: Props): React.ReactNode => {
  const { imgUrl, alt, value, title, href, textStyles, isAuthor } = props;
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`rounded-full object-contain ${textStyles || ""} `}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        {/* currently , the `isAuthor` prop is used to conditionally hide the title on smaller screens. */}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  );

  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
