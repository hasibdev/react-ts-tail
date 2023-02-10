import React from "react";
// import GooglePlaceAutocomplete from "../components/froms/GooglePlaceAutocomplete";
import { GooglePlaceAutocomplete } from "@getdokan/dokan-ui";
type Props = {};

const Place = (props: Props) => {
  return (
    <div className="w-1/3 mx-auto">
      <h2 className="text-lg my-4">Place autocomplete</h2>
      <GooglePlaceAutocomplete
        apiKey="AIzaSyDvqF2TFlH_iL33LMiDHvNpkAcpK0nW7_0"
        onPlaceSelected={() => {}}
      />
    </div>
  );
};

export default Place;
