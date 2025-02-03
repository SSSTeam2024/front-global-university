import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import LayoutReducer from "../slices/layouts/reducer";
// Authentication
import ForgetPasswordReducer from "../slices/auth/forgetpwd/reducer";
import ProfileReducer from "../slices/auth/profile/reducer";
import DashboardReducer from "../slices/dashboard/reducer";

import { facultiesEnseignantSlice } from "features/facultyEnseignant/facultyEnseignant";
import { facultiesEtudiantSlice } from "features/facultyEtudiant/facultyEtudiant";
import { facultiesSlice } from "features/faculties/faculties";
import { teacherRankSlice } from "features/teacherRank/teacherRankSlice";
import { teacherSpecialtySlice } from "features/teacherSpecialty/teacherSpecialtySlice";
import { StudentSubscriptionTypeSlice } from "features/studentSubscriptionType/studentSubscriptionTypeSlice";
import { StudentLevelSlice } from "features/studentLevel/studentLevelSlice";
import { facultiesPersonnelSlice } from "features/facultyPersonnel/facultyPersonnel";
import { personnelCategorySlice } from "features/personnelCategory/personnelCategorySlice";
import { personnelPostSlice } from "features/personnelPost/personnelPostSlice";
import { personnelRankSlice } from "features/personnelRank/personnelRankSlice";

export const store = configureStore({
  reducer: {
    [facultiesEnseignantSlice.reducerPath]: facultiesEnseignantSlice.reducer,
    [facultiesEtudiantSlice.reducerPath]: facultiesEtudiantSlice.reducer,
    [facultiesSlice.reducerPath]: facultiesSlice.reducer,
    [teacherRankSlice.reducerPath]: teacherRankSlice.reducer,
    [teacherSpecialtySlice.reducerPath]: teacherSpecialtySlice.reducer,
    [StudentSubscriptionTypeSlice.reducerPath]: StudentSubscriptionTypeSlice.reducer,
    [StudentLevelSlice.reducerPath]: StudentLevelSlice.reducer,
    [facultiesPersonnelSlice.reducerPath]: facultiesPersonnelSlice.reducer,
    [personnelCategorySlice.reducerPath]: personnelCategorySlice.reducer,
    [personnelPostSlice.reducerPath]: personnelPostSlice.reducer,
    [personnelRankSlice.reducerPath]: personnelRankSlice.reducer,
    Layout: LayoutReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Dashboard: DashboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      facultiesSlice.middleware,
      facultiesEtudiantSlice.middleware,
      facultiesEnseignantSlice.middleware,
      teacherRankSlice.middleware,
      teacherSpecialtySlice.middleware,
      StudentSubscriptionTypeSlice.middleware,
      StudentLevelSlice.middleware,
      facultiesPersonnelSlice.middleware,
      personnelRankSlice.middleware,
      personnelPostSlice.middleware,
      personnelCategorySlice.middleware,
    ]);
  },
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
