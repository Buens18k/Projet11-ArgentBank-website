import { createSlice } from '@reduxjs/toolkit';

// Création d'une tranche (slice) de Redux nommé 'user' à l'aide de createSlice
const profileSlice = createSlice({
  name: 'user',

  // État initial de la tranche, contenant des champ pour le profil utilisateur
  initialState: {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
  },

  // Reducteurs définissant des actions qui peuvent être effectuées sur cet état
  reducers: {
    // Action 'setProfile' : Mets à jour les champs du profil utilisateur avec les valeurs fournies dans l'action
    setProfile: (state, action) => {
      state.firstName = action.payload.body.firstName;
      state.lastName = action.payload.body.lastName;
      state.userName = action.payload.body.userName;
      state.email = action.payload.body.email;
    },
    // Action 'updateUserName' : Mets à jour le champ 'userName' du profil avec la valeur fournie dans l'action
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

// Exportation des actions 'setProfile' et 'updateUserName' pour les utilisaer dans d'autres parties de l'application
export const { setProfile, updateUserName } = profileSlice.actions;
// Exportation du reducteur associé à cette tranche
export default profileSlice.reducer;
