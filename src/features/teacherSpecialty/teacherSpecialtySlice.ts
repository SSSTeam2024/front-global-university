import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TeacherSpecialty {
  _id: string;
  value_specialite_enseignant: string;
  specialite_ar: string;
  specialite_fr: string;
}

export const teacherSpecialtySlice = createApi({
  reducerPath: "TeacherSpecialty",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/specialty/`,
  }),
  tagTypes: ["TeacherSpecialty"],
  endpoints(builder) {
    return {
      fetchTeacherSpecialtiesByFacultyId: builder.query<
      TeacherSpecialty,
        { facultyId: string }>({
        query({ facultyId }) {
          return {
            url: "teacher-specialties-faculty",
            method: "POST",
            body: { facultyId },
          };
        },
        providesTags: ["TeacherSpecialty"],
      }),
      fetchTeacherSpecialtiesOfAllFaculties: builder.query<
      TeacherSpecialty[],
        void
      >({
        query() {
          return `teacher-specialties`;
        },
        providesTags: ["TeacherSpecialty"],
      }),
    };
  },
});

export const {
  useFetchTeacherSpecialtiesByFacultyIdQuery,
  useFetchTeacherSpecialtiesOfAllFacultiesQuery,
} = teacherSpecialtySlice;
