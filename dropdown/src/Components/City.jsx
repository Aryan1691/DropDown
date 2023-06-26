import React, { useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const City = ({ selectStateId }) => {
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectStateId) {
        setLoadingCities(false);
        try {
          const response = await axios.get(
            "https://cors-anywhere.herokuapp.com/https://d32sbion19muhj.cloudfront.net/pub/interview/cities"
          );
          setCities(response.data.data);
          setLoadingCities(false);
        } catch (error) {
          console.log(error);
          setLoadingCities(false);
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [selectStateId]);

  const filteredCities = cities.filter(
    (city) => city.state_id === parseInt(selectStateId)
  );

  return (
    <React.Fragment>
      <select>
        <option value="">Select City</option>
        {loadingCities ? (
          <option value="" disabled>
            Loading cities...
          </option>
        ) : (
          filteredCities.map((city) => (
            <option value={city.id} key={city.id}>
              {city.name}
            </option>
          ))
        )}
      </select>
    </React.Fragment>
  );
};

export default City;
