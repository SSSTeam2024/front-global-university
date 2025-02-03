import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Teacher {

    _id: string;
    nom_fr: string;
    nom_ar: string;
    matricule: string;
    mat_cnrps: string;
    prenom_fr: string;
    prenom_ar: string;
    lieu_naissance_fr: string;
    lieu_naissance_ar: string;
    date_naissance: string;
    nationalite: string;
    etat_civil: string;
    sexe: string;
    etat_compte: {
      _id: string;
      value_etat_enseignant: string;
      etat_ar: string;
      etat_fr: string;
    };
    poste: {
      _id: string;
      value_poste_enseignant: string;
      poste_ar: string;
      poste_fr: string;
    };
    grade: {
      _id: string;
      value_grade_enseignant: string;
      grade_ar: string;
      grade_fr: string;
      charge_horaire?: {
        annualMinHE: string;
        annualMaxHE: string;

        s1MinHE: string;
        s1MaxHE: string;

        s2MinHE: string;
        s2MaxHE: string;

        annualMinHS: string;
        annualMaxHS: string;

        s1MinHS: string;
        s1MaxHS: string;

        s2MinHS: string;
        s2MaxHS: string;

        annualMinHX: string;
        annualMaxHX: string;

        s1MinHX: string;
        s1MaxHX: string;

        s2MinHX: string;
        s2MaxHX: string;

        totalAnnualMin: string;
        totalAnnualMax: string;

        totalS1Min: string;
        totalS1Max: string;

        totalS2Min: string;
        totalS2Max: string;
      };
    };
    specilaite: {
      _id: string;
      value_specialite_enseignant: string;
      specialite_ar: string;
      specialite_fr: string;
    };
    departements: {
      _id: string;
      description: string;
      volume_horaire: string;
      nom_chef_dep: string;
      name_ar: string;
      name_fr: string;
      SignatureFileExtension: string;
      SignatureFileBase64String: string;
      signature: string;
    };
    date_affectation: string;
    compte_courant: string;
    identifinat_unique: string;
    num_cin: string;
    date_delivrance: string;
    state: string;
    dependence: string;
    code_postale: string;
    adress_ar: string;
    adress_fr: string;
    email: string;
    num_phone1: string;
    num_phone2: string;
    nom_conjoint: string;
    job_conjoint: string;
    nombre_fils: string;
    entreprise1: string;
    annee_certif1: string;
    certif1: string;

    entreprise2: string;
    annee_certif2: string;
    certif2: string;

    entreprise3: string;
    annee_certif3: string;
    certif3: string;
    photo_profil: string;
    PhotoProfilFileExtension: string;
    PhotoProfilFileBase64String: string;
    papers?: string[];
  }


export interface FacultiesEnseignant {
  totalEnseignants: {
    facultyName: string;
    enseignants: Teacher[];
    enseignantsNumber: number;
  }[];
  totalEnseignantsNumber: number;
}

export const facultiesEnseignantSlice = createApi({
  reducerPath: "FacultiesEnseignant",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/enseignant/`,
  }),
  tagTypes: ["FacultiesEnseignant"],
  endpoints(builder) {
    return {
      fetchEnseignantsByFacultyId: builder.query<FacultiesEnseignant[], string>(
        {
          query(facultyId) {
            return `enseignants-faculty/${facultyId}`;
          },
          providesTags: ["FacultiesEnseignant"],
        }
      ),
      fetchFacultiesEnseignantOfAllFaculties: builder.query<FacultiesEnseignant,void>(
        {
        query() {
          return `enseignants-faculties`;
        },
        providesTags: ["FacultiesEnseignant"],
      }),
    };
  },
});

export const {
  useFetchEnseignantsByFacultyIdQuery,
  useFetchFacultiesEnseignantOfAllFacultiesQuery,
} = facultiesEnseignantSlice;
