import React, { useContext } from 'react';
import Hero from '../components/WalletPage/Hero';
import { AuthContext } from '../context/AuthContext';

const Wallet = () => {
  // 1. Get the user object from your authentication context.
  const { user } = useContext(AuthContext);

  // 2. Pass the entire user object as a prop to the Hero component.
  //    If the user is not loaded yet, you can pass null or an empty object.
  return (
    <>
      <Hero user={user} />
    </>
  );
};

export default Wallet;