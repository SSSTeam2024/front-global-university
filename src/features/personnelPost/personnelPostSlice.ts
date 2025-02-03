import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PersonnelPost {
  _id: string;
  value: string;
  poste_ar: string;
  poste_fr: string;
}

export const personnelPostSlice = createApi({
  reducerPath: "PersonnelPost",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/personnel-post/`,
  }),
  tagTypes: ["PersonnelPost"],
  endpoints(builder) {
    return {
      // fetchTeacherSpecialtiesByFacultyId: builder.query<
      // PersonnelCategory,
      //   { facultyId: string }>({
      //   query({ facultyId }) {
      //     return {
      //       url: "teacher-specialties-faculty",
      //       method: "POST",
      //       body: { facultyId },
      //     };
      //   },
      //   providesTags: ["TeacherSpecialty"],
      // }),
      fetchPersonnelPostsOfAllFaculties: builder.query<
      PersonnelPost[],
        void
      >({
        query() {
          return `personnel-posts`;
        },
        providesTags: ["PersonnelPost"],
      }),
    };
  },
});

export const {
  useFetchPersonnelPostsOfAllFacultiesQuery,
} = personnelPostSlice;
