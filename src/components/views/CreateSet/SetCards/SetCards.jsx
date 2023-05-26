import React from "react";

import Card from "./Card/Card";

export default function SetCards() {
  return (
    <div>
      <Card order={1} />
      <Card order={2} />
      <Card order={3} />
    </div>
  );
}
