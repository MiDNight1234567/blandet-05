import { Header } from 'components';
import Home from 'pages/Home';
import Rates from 'pages/Rates';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { setBaseCurrency } from 'reduxState/currencySlice';
import { fetchBaseCurrency } from 'reduxState/operations';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      dispatch(fetchBaseCurrency(crd));
    }

    function error() {
      dispatch(setBaseCurrency('USD'));
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);
  return (
    <Routes>
      <Route element={<Header />} path="/">
        <Route element={<Home />} index />
        <Route element={<Rates />} path="/rates" />
        <Route element={<Navigate to={'/'} replace />} path="*" />
      </Route>
    </Routes>
  );
};
