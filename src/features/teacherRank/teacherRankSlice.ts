import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TeacherRank {
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
}

export const teacherRankSlice = createApi({
  reducerPath: "TeacherRank",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/rank/`,
  }),
  tagTypes: ["TeacherRank"],
  endpoints(builder) {
    return {
      fetchTeacherRankByFacultyId: builder.query<
        TeacherRank,
        { facultyId: string }>({
        query({ facultyId }) {
          return {
            url: "teacher-ranks-faculty",
            method: "POST",
            body: { facultyId },
          };
        },
        providesTags: ["TeacherRank"],
      }),
      fetchTeacherRanksOfAllFaculties: builder.query<
        TeacherRank[],
        void
      >({
        query() {
          return `teacher-ranks`;
        },
        providesTags: ["TeacherRank"],
      }),
    };
  },
});

export const {
  useFetchTeacherRankByFacultyIdQuery,
  useFetchTeacherRanksOfAllFacultiesQuery,
} = teacherRankSlice;
