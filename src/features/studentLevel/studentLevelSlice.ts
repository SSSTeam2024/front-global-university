import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface StudentLevel {
  _id: string;
  name_niveau_ar: string;
  name_niveau_fr: string;
  abreviation: string;
  sections: {
    _id: string;
    name_section_ar: string;
    name_section_fr: string;
    abreviation: string;
    niveau_classe: string[];
    departements: string[];
    }[];
}

export const StudentLevelSlice = createApi({
  reducerPath: "StudentLevel",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/student-level/`,
  }),
  tagTypes: ["StudentLevel"],
  endpoints(builder) {
    return {
      // fetchTeacherSpecialtiesByFacultyId: builder.query<
      // StudentSubscriptionType,
      //   { facultyId: string }>({
      //   query({ facultyId }) {
      //     return {
      //       url: "teacher-specialties-faculty",
      //       method: "POST",
      //       body: { facultyId },
      //     };
      //   },
      //   providesTags: ["StudentSubscriptionType"],
      // }),
      fetchStudentsLevelsOfAllFaculties: builder.query<
      StudentLevel[],
        void
      >({
        query() {
          return `student-levels-faculties`;
        },
        providesTags: ["StudentLevel"],
      }),
    };
  },
});

export const {
  // useFetchTeacherSpecialtiesByFacultyIdQuery,
  useFetchStudentsLevelsOfAllFacultiesQuery,
} = StudentLevelSlice;
