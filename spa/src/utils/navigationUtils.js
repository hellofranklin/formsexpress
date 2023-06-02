// navigationUtils.js

import { useNavigate } from 'react-router-dom';

export const NavigateTo = (destination) => {
  const navigate = useNavigate();
  navigate(destination);
};

export default NavigateTo;
