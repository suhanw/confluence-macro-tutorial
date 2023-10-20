import React from "react";

export default function Dog({ title, imageUrl }) {
  return (
    <div id="dogImage">
      <h1>{title}</h1>
      <img src={imageUrl} alt={title} />
    </div>
  );
}
