import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PersonnelRank {
  _id: string;
  value_grade_personnel: string;
  grade_ar: string;
  grade_fr: string;
}

export const personnelRankSlice = createApi({
  reducerPath: "PersonnelRank",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/personnel-rank/`,
  }),
  tagTypes: ["PersonnelRank"],
  endpoints(builder) {
    return {
      // fetchTeacherSpecialtiesByFacultyId: builder.query<
      // PersonnelRank,
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
      fetchPersonnelRanksOfAllFaculties: builder.query<
      PersonnelRank[],
        void
      >({
        query() {
          return `personnel-ranks`;
        },
        providesTags: ["PersonnelRank"],
      }),
    };
  },
});

export const {
  useFetchPersonnelRanksOfAllFacultiesQuery,
} = personnelRankSlice;
