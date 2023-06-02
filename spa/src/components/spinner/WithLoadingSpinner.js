import React, { useRef, useState } from "react";
import Spinner from "./Spinner";

const WithLoadingSpinner = (WrappedComponent) => {
  const WithLoadingSpinner = ({ ...props }) => {
    const [isLoading, setIsLoading] = useState(false);
    const messagesRef = useRef();

    const handleApiCall = async (apiCall, message) => {
      messagesRef.current = message;
      if (message !== "no") {
        setIsLoading(true);
      }
      const response = await apiCall();
      console.log(response);

      if (response.ok) {
        const responseJson = await response.json();
        setIsLoading(false);
        return await responseJson;
      } else {
        setIsLoading(false);
        return {
          ok: false
        };
      }
    };

    return (
      <>
        {isLoading && <Spinner spinnerMsg={messagesRef.current} />}
        <WrappedComponent {...props} handleApiCall={handleApiCall} />
      </>
    );
  };

  return WithLoadingSpinner;
};

export default WithLoadingSpinner;
