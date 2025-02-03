import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FileDetail {
  name_ar: string;
  name_fr: string;
  file?: string;
  base64String?: string;
  extension?: string;
}
interface Section {
  _id: string;
  name_section_fr: string;
  name_section_ar: string;
  abreviation: string;
  departements: string[];
}

interface NiveauClasse {
  _id: string;
  name_niveau_ar: string;
  name_niveau_fr: string;
  abreviation: string;
  sections: Section[]; // Ensure this is defined as an array
}

interface GroupeClasse {
  _id: string;
  nom_classe_fr: string;
  nom_classe_ar: string;
  departement: string;
  niveau_classe: NiveauClasse;
  matieres: string[];
}

export interface FacultyEtudiant {
  _id?: string;
  nom_fr: string;
  nom_ar: string;
  prenom_fr: string;
  prenom_ar: string;
  lieu_naissance_fr: string;
  lieu_naissance_ar: string;
  date_naissance: string;
  nationalite: string;
  etat_civil: string;
  sexe: string;
  num_CIN: string;
  face_1_CIN: string;
  face_2_CIN: string;
  fiche_paiement: string;
  etat_compte: {
    _id: string;
    value_etat_etudiant: string;
    etat_ar: string;
    etat_fr: string;
  };
  groupe_classe: GroupeClasse;
  state: string;
  dependence: string;
  code_postale: string;
  adress_ar: string;
  adress_fr: string;
  num_phone: string;
  email: string;
  nom_pere: string;
  job_pere: string;
  nom_mere: string;
  num_phone_tuteur: string;
  moyen: string;
  session: string;
  filiere: string;
  niveau_scolaire: string;
  annee_scolaire: string;
  type_inscription: {
    _id: string;
    value_type_inscription: string;
    type_ar: string;
    type_fr: string;
    files_type_inscription: {
      name_ar: string;
      name_fr: string;
    }[];
  };
  Face1CINFileBase64String: string;
  Face1CINFileExtension: string;
  Face2CINFileBase64String: string;
  Face2CINFileExtension: string;
  FichePaiementFileBase64String: string;
  FichePaiementFileExtension: string;
  files: FileDetail[];
  photo_profil: string;
  PhotoProfilFileExtension: string;
  PhotoProfilFileBase64String: string;
}
export interface FacultiesEtudiant {
  totalStudents: {
    facultyName: string;
    students: FacultyEtudiant[];
    studentsNumber: number;
  }[];
  totalStudentsNumber: number;
}

export const facultiesEtudiantSlice = createApi({
  reducerPath: "FacultyEtudiant",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/student/`,
  }),
  tagTypes: ["FacultyEtudiant", "FacultiesEtudiant"],
  endpoints(builder) {
    return {
      fetchEtudiantsByFacultyId: builder.query<FacultyEtudiant[], string>({
        query(facultyId) {
          return `students-faculty/${facultyId}`;
        },
        providesTags: ["FacultyEtudiant"],
      }),
      fetchFacultyEtudiantOfAllFaculties: builder.query<FacultiesEtudiant, void>({
        query() {
          return `students-faculties`;
        },
        providesTags: ["FacultiesEtudiant"],
      }),
    };
  },
});

export const {
  useFetchEtudiantsByFacultyIdQuery,
  useFetchFacultyEtudiantOfAllFacultiesQuery,
} = facultiesEtudiantSlice;
