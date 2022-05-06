import React from "react";
import { AvailabilityLabel } from "./AvailabilityLabel";

export function About() {
  return (
    <div
      style={{
        padding: "8px",
      }}
    >
      <p>
        I made this tool to search a database of cocktails, to quickly find
        interesting recipes based on the bottles and ingredients I have at the
        moment.
      </p>
      <p>
        How it works : by clicking on the button
        <AvailabilityLabel availability={null} />
        next to an ingredient you can mark it as
        <AvailabilityLabel availability="yes" />
        (you have it in your cupboard),
        <AvailabilityLabel availability="maybe" />
        (you might find it at the store), or
        <AvailabilityLabel availability="no" /> (you will never buy it). Then
        you can use the search box to use those as criteria.
      </p>
      <p>
        By default all ingredients are marked as
        <AvailabilityLabel availability={null} />
        so it might take a while before the data becomes really useful.
      </p>
      <p>The data was scraped from another website (shhh!).</p>
    </div>
  );
}
