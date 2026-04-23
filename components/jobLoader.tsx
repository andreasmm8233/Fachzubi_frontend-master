import React from "react";
import "./SkeletonLoader.css"; // You can define styles in a separate CSS file

const SkeletonLoader = () => {
  return (
    <div className="row-skeleton-loader">
      <div className="row-skeleton-loader-item"></div>
      <div className="row-skeleton-loader-item"></div>
      <div className="row-skeleton-loader-item"></div>
    </div>
  );
};

export default SkeletonLoader;
