import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Faculties {
  _id: string;
  name_ar: string;
  name_fr: string;
  abreviation: string;
  server_domain_name: string;
}

export const facultiesSlice = createApi({
  reducerPath: "Faculties",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/faculty/`,
  }),
  tagTypes: ["Faculties", "Enseignants", "Students"],
  endpoints(builder) {
    return {
      fetchAllFaculties: builder.query<Faculties[], void>({
        query() {
          return `get-all-faculties`;
        },
        providesTags: ["Faculties"],
      }),
      // fetchEnseignantsByFacultyId: builder.query<Enseignants[], string>({
      //   query(facultyId) {
      //     return `enseignants-faculty/${facultyId}`;
      //   },
      //   providesTags: ["Enseignants"],
      // }),
      // fetchEnseignantsOfAllFaculties: builder.query<Enseignants[], void>({
      //   query() {
      //     return `enseignants-faculties`;
      //   },
      //   providesTags: ["Enseignants"],
      // }),
      // fetchStudentsByFacultyId: builder.query<Students[], string>({
      //   query(facultyId) {
      //     return `students-faculty/${facultyId}`;
      //   },
      //   providesTags: ["Students"],
      // }),
      // fetchStudentsOfAllFaculties: builder.query<Students[], void>({
      //   query() {
      //     return `students-faculties`;
      //   },
      //   providesTags: ["Students"],
      // }),
    };
  },
});

export const {
  useFetchAllFacultiesQuery,
  // useFetchEnseignantsByFacultyIdQuery,
  // useFetchEnseignantsOfAllFacultiesQuery,
  // useFetchStudentsByFacultyIdQuery,
  // useFetchStudentsOfAllFacultiesQuery,
} = facultiesSlice;
