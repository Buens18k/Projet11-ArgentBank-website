import React, { useEffect } from 'react';

import Account from '../components/Account';

import { useDispatch, useSelector } from 'react-redux';
import EditName from '../components/EditName';
import { setProfile } from '../redux/reducer/profileSlice';
import '../styles/pages/_profile.scss';

export default function Profile() {
  // Utilise le hook useDispatch pour obtenir la fonction de dispatch du store Redux
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user);
  // console.log("Profil de l'utilisateur", userProfile);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      fetchProfileData(authToken);
    }
  });

  async function fetchProfileData(authToken) {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          status: 0,
          message: 'string',
          body: {
            id: 'string',
            email: 'string',
          },
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch(setProfile(responseData));
        console.log(responseData);
        console.log(responseData.body);
      } else {
        console.error('Error :', response.message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userProfile ? `${userProfile.firstName} ${userProfile.lastName} !!` : 'Loading'}
        </h1>
        <EditName />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
      <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
      <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
    </main>
  );
}
