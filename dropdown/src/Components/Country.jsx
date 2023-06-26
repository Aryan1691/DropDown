import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://d32sbion19muhj.cloudfront.net/pub/interview";

// eslint-disable-next-line react/prop-types
const Country = ({ onCountryChange }) => {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/countries`);
        const { data } = response;
        setCountries(data.data);
        setLoadingCountries(false);
      } catch (error) {
        console.log(error);
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const selectedID = e.target.value;
    onCountryChange(selectedID);
  };

  return (
    <select onChange={handleCountryChange}>
      <option value="">Select Country</option>
      {loadingCountries ? (
        <option value="" disabled>
          Loading countries...
        </option>
      ) : (
        countries.map((country) => (
          <option value={country.id} key={country.id}>
            {country.name}
          </option>
        ))
      )}
    </select>
  );
};

export default Country;
