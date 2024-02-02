import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../redux/reducer/profileSlice';
import '../styles/pages/_profile.scss';

export default function EditName() {
  // Obtention de la fonction dispatch du Redux pour envoyez des actions
  const dispatch = useDispatch();

  // Récupèration des données du Redux store de l'utilisateur
  const userProfile = useSelector((state) => state.user);

  // Récupération du jeton d'authentification depuis le state Redux
  const token = useSelector((state) => state.auth.token);

  // Utilisation du hook useState pour gérer l'état d'ouverture du formulaire
  const [isEditing, setEditing] = useState(false);

  // Utilisation du hook useState pour définir l'état du nom utilisateur éditer (par défaut le nom utilisateur du redux store enregistrer est utilisé)
  const [editedUserName, setEditedUserName] = useState(userProfile.userName);
  // console.log('Le nom editer : ', editedUserName);

  // Utilisation du hook useEffect pour mettre à jour editedUserName lors d'un changement dans userProfile
  useEffect(() => {
    setEditedUserName(userProfile.userName);
  }, [userProfile.userName]);

  // Fonction qui ouvre le formulaire d'édition du userName
  const handleEditClick = () => {
    setEditing(true);
  };

  // Fonction qui ferme le formulaire et sauvegarde les modifications
  const handleSaveClick = async (event) => {
    event.preventDefault();
    setEditing(false);
    try {
      const editedUserNameString = String(editedUserName);
      // Envoie d'une requête PUT au serveur pour mettre à jour le nom userName de l'utilisateur
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
      // Vérification de la réussite de la requête
      if (response.ok) {
        const responseData = await response.json();
        // Dispatch au store de Redux avec la fonction 'updateUserName' le nom utilisateur éditer
        dispatch(updateUserName(editedUserName));
        console.log('Le nom d/utilisateur a été mis à jour avec succès :', responseData);
      } else {
        // Gestion spécifique pour le code d'erreur 401
        if (response.status === 401) {
          const errorData = await response.json();
          console.error('Error 401 :', errorData.message);

          // Gestion spécifique pour le code d'erreur 400
        } else if (response.status === 400) {
          const errorData = await response.json();
          console.error('Error 400 :', errorData);

          // Gestion spécifique pour autre erreur (500)
        } else {
          console.error('Error :', response.statusText);
        }
      }
    } catch (error) {
      // Gestion des erreurs liées à la requête
      console.error('Error : ', error);
    }
  };

  // Fonction qui ferme le formulaire sans sauvegarder les modifications
  const handleCanceClick = () => {
    setEditedUserName(userProfile.userName); // Rétablir la valeur initiale du userName
    setEditing(false);
  };

  // Fonction qui met à jour editedUserName lorsqu'il y a un changement
  const handleUserNameChange = (event) => {
    setEditedUserName(event.target.value);
  };

  return (
    <>
      {/* Si le mode édition est activé  */}
      {isEditing ? (
        // Formulaire d'edition des informations utilisateur, soumis à handleSaveClick lors de la sauvegarde par le boutton 'Save'
        <form onSubmit={handleSaveClick}>
          <h1>Edit User Info</h1>
          <div className="form">
            <div className="edit">
              <label htmlFor="userName">User Name:</label>
              {/* Champ d'édition du nom d'utilisateur, avec gestion de changement via la fonction handleUserNameChange, requis pour soumettre le formulaire*/}
              <input type="text" id="userName" value={editedUserName} onChange={handleUserNameChange} autoComplete="userName" required />
            </div>
            <div className="edit">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" value={userProfile.firstName} readOnly />
            </div>
            <div className="edit">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" value={userProfile.lastName} readOnly />
            </div>
          </div>
          <div className="edit-ctaBtn">
            <button className="edit-button" type="submit">
              Save
            </button>
            <button className="edit-button" type="button" onClick={handleCanceClick}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        // Si le mode édition n'est pas activé
        <>
          <h1>
            Welcome back
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
