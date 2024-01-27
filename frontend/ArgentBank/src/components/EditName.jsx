import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../redux/reducer/profileSlice';
import '../styles/pages/_profile.scss';

export default function EditName() {
  const dispatch = useDispatch();
  // Récupère le profile Utilisateur
  const userProfile = useSelector((state) => state.user);
  console.log('Le nom dans le store :', userProfile.userName);

  const token = useSelector((state) => state.auth.token);

  // Utilise le hook useState pour définir l'ouverture du formulaire
  const [isEditing, setEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState(userProfile.userName);
  console.log('Le nom editer : ', editedUserName);

  useEffect(() => {
    setEditedUserName(userProfile.userName); // Mise à jour editedUserName lorsque userProfile.userName change
  }, [userProfile.userName]);

  // Fonction qui ouvre le formulaire d'édit Name
  const handleEditClick = () => {
    setEditing(true);
  };

  // Fonction qui ferme le formulaire et sauvegarde
  const handleSaveClick = async (event) => {
    event.preventDefault();
    setEditing(false);
    try {
      const editedUserNameString = String(editedUserName);
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: editedUserNameString,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();

        dispatch(updateUserName(editedUserName));
        console.log('Le nom d/utilisateur a été mis à jour avec succès :', responseData);
      } else {
        console.error('Error :', response.statusText);
        if (response.status === 400) {
          const errorData = await response.json();
          console.error('Error 400 :', errorData);
        }
      }
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  // Fonction qui ferme le formulaire sans sauvegarder
  const handleCanceClick = () => {
    setEditedUserName(userProfile.userName); // Rétablir la valeur initiale du userName
    setEditing(false);
  };

  const handleUserNameChange = (event) => {
    setEditedUserName(event.target.value);
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <h1>Edit User Info</h1>
          <div>
            <label htmlFor="userName">User Name:</label>
            <input type="text" id="userName" value={editedUserName} onChange={handleUserNameChange} />
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value={userProfile.firstName} disabled />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value={userProfile.lastName} disabled />
          </div>
          <button className="edit-button" onClick={handleSaveClick}>
            Save
          </button>
          <button className="edit-button" onClick={handleCanceClick}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h1>
            Welcome back
            {userProfile.userName}
            <br />
            {userProfile ? `${userProfile.firstName} ${userProfile.lastName} !!` : 'Loading'}
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        </>
      )}
    </>
  );
}
