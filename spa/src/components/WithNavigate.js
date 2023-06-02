import { useNavigate } from "react-router-dom";

const WithNavigate = (WrappedComponent) => {
  return function WithNavigate(props) {
    const navigate = useNavigate();

    return <WrappedComponent {...props} navigate={navigate} />;
  };
};

export default WithNavigate;
