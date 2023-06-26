import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://d32sbion19muhj.cloudfront.net/pub/interview";

// eslint-disable-next-line react/prop-types
const State = ({ selectedCountryId, selectStateId }) => {
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountryId) {
        setLoadingStates(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/states`);
          const { data } = response;
          setStates(data.data);
          setLoadingStates(false);
        } catch (error) {
          console.log(error);
          setLoadingStates(false);
        }
      } else {
        setStates([]);
      }
    };

    fetchStates();
  }, [selectedCountryId]);
  const stateFilter = states.filter(
    (state) => state.country_id === parseInt(selectedCountryId)
  );
  const selectTheIdOfState = (e) => {
    const setId = e.target.value;
    console.log(setId);
    selectStateId(setId);
  };
  return (
    <select onChange={selectTheIdOfState}>
      <label>Select State</label>
      <option defaultValue="Select state" value="">
        Select State
      </option>
      {loadingStates ? (
        <option value="" disabled>
          Loading states...
        </option>
      ) : (
        stateFilter.map((state) => (
          <option value={state.id} key={state.id}>
            {state.name}
          </option>
        ))
      )}
    </select>
  );
};

export default State;
