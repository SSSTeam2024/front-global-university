import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PapierAdministratif {
  _id?: string;
  nom_ar: string;
  nom_fr: string;
  category: string[];
}

export interface Paper {
  papier_administratif: PapierAdministratif;
  annee: string;
  remarques: string; 
  file: string;
  FileExtension:string;
  FileBase64String:string

}

export interface DossierAdministratif {
  _id?: string;
  dossierId?: string;
  papers: Paper[];
  enseignant?: {
    _id: string;
    nom_fr: string;
    nom_ar: string;
    prenom_fr: string;
    prenom_ar: string;
  };
  personnel?: {
    _id: string;
    nom_fr: string;
    nom_ar: string;
    prenom_fr: string;
    prenom_ar: string;
  };
  isArchived?: boolean;
}

export interface Personnel {
  dossier?: DossierAdministratif;
  _id: string;
  nom_fr: string;
  nom_ar: string;
  mat_cnrps:string;
  matricule:string;
  prenom_fr: string;
  prenom_ar: string;
  lieu_naissance_fr: string;
  lieu_naissance_ar: string;
  date_naissance: string;
  date_designation:string;
  nationalite: string;
  etat_civil: string;
  sexe: string;
  etat_compte: {
    _id:string,
    value:string,
    etat_fr: string,
  etat_ar: string,
  };
  poste: {
    _id: string;
    value: string;
    poste_fr: string;
    poste_ar: string;
  };
  grade: {
    _id: string;
    value_grade_personnel: string;
    grade_fr: string;
    grade_ar: string;
  };
  categorie: {
    _id: string;
    value: string;
    categorie_fr: string;
    categorie_ar: string;
  };
  service: {
    _id: string;
    value: string;
    service_fr: string;
    service_ar: string;
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
  photo_profil: string;
  PhotoProfilFileExtension: string;
  PhotoProfilFileBase64String: string;
  papers?:string[]
  }


export interface FacultiesPersonnel {
  totalPersonnels: {
    facultyName: string;
    personnels: Personnel[];
    personnelsNumber: number;
  }[];
  totalPersonnelsNumber: number;
}

export const facultiesPersonnelSlice = createApi({
  reducerPath: "FacultiesPersonnel",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/personnel/`,
  }),
  tagTypes: ["FacultiesPersonnel"],
  endpoints(builder) {
    return {
      // fetchEnseignantsByFacultyId: builder.query<Personnel[], string>(
      //   {
      //     query(facultyId) {
      //       return `enseignants-faculty/${facultyId}`;
      //     },
      //     providesTags: ["FacultiesEnseignant"],
      //   }
      // ),
      fetchPersonnelsOfAllFaculties: builder.query<FacultiesPersonnel,void>(
        {
        query() {
          return `personnels-faculties`;
        },
        providesTags: ["FacultiesPersonnel"],
      }),
    };
  },
});

export const {
  // useFetchEnseignantsByFacultyIdQuery,
  useFetchPersonnelsOfAllFacultiesQuery,
} = facultiesPersonnelSlice;
