import { useState, lazy, Suspense } from "react";
import Country from "./Components/Country";

import "../src/Styles/Home.css";
import "../src/Styles/Loader.css";
import Loader from "./Components/Loader";
const LazyState = lazy(() => import("./Components/State"));
const LazyCity = lazy(() => import("./Components/City"));

const CountryState = () => {
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");

  const handleCountryChange = (selectedID) => {
    setSelectedCountryId(selectedID);
    setSelectedStateId("");
  };

  const handleStateChange = (selectedID) => {
    setSelectedStateId(selectedID);
  };

  return (
    <>
     <Suspense fallback={<Loader />}>
    <div className="menuPage">
      <Country onCountryChange={handleCountryChange} />
     
        <LazyState
          selectedCountryId={selectedCountryId}
          selectStateId={handleStateChange}
        />
        <LazyCity selectStateId={selectedStateId} />
    
    </div>
    </Suspense>
    </>
   
  );
};

export default CountryState;
