import { css } from "@emotion/css";
import * as m from "motion/react-m";
import React from "react";
import { cssVarKey, radius, spacing } from "./styles.js";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

const skeletonStyles = css({
  position: "relative",
  inset: 0,
  backgroundColor: `var(${cssVarKey.bgMuted})`,
  overflow: "hidden",
});

const shimmerStyles = css({
  position: "absolute",
  inset: 0,
  background: `var(${cssVarKey.gradientSkeleton})`,
});

const Skeleton = ({ className, style = {} }: SkeletonProps) => {
  return (
    <div
      style={{ ...style, borderRadius: radius.md }}
      className={`${skeletonStyles} ${className || ""}`}
    >
      <m.div
        className={shimmerStyles}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></m.div>
    </div>
  );
};

const containerStyles = css({
  padding: spacing["3"],
  overflow: "hidden",
  display: "flex",
  gap: 4,
  flexDirection: "column",
});

const spacerStyles = css({
  height: 22,
});

const nestedContainerStyles = css({
  paddingLeft: 20,
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const skeletonSizes = {
  small: css({
    height: 22,
    width: "clamp(40px, 10%, 80px)",
  }),
  medium: css({
    height: 22,
    width: "clamp(175px, 25%, 250px)",
  }),
  large: css({
    height: 22,
    width: "clamp(200px, 35%, 300px)",
  }),
  xlarge: css({
    height: 22,
    width: "clamp(235px, 45%, 350px)",
  }),
  xxlarge: css({
    height: 22,
    width: "clamp(300px, 60%, 375px)",
  }),
  xxxlarge: css({
    height: 22,
    width: "clamp(350px, 75%, 400px)",
  }),
  smallTall: css({
    height: 37,
    width: "clamp(40px, 10%, 80px)",
  }),
  mediumTall: css({
    height: 37,
    width: "clamp(175px, 25%, 250px)",
  }),
};

const indentedStyles = css({
  marginLeft: 20,
});

export const LoadingSkeleton = () => {
  return (
    <div className={containerStyles}>
      <Skeleton className={skeletonSizes.xlarge} />
      <div className={spacerStyles} />
      <Skeleton className={skeletonSizes.large} />
      <Skeleton className={`${skeletonSizes.xxlarge} ${indentedStyles}`} />
      <Skeleton className={skeletonSizes.small} />
      <div className={spacerStyles} />
      <Skeleton className={skeletonSizes.medium} />
      <div className={nestedContainerStyles}>
        <Skeleton className={skeletonSizes.xxxlarge} />
        <Skeleton className={`${skeletonSizes.medium} ${indentedStyles}`} />
        <Skeleton className={skeletonSizes.small} />
      </div>
      <div className={spacerStyles} />
      <Skeleton className={skeletonSizes.small} />
    </div>
  );
};

export const TitleSkeleton = () => (
  <Skeleton className={skeletonSizes.mediumTall} />
);

export const LanguageSelectorSkeleton = () => (
  <Skeleton className={skeletonSizes.mediumTall} />
);
