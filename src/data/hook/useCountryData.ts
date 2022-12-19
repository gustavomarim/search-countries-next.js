import { useContext } from 'react';
import CountryContext from '../context/CountryContext';

const useCountryData = () => useContext(CountryContext);

export default useCountryData;
