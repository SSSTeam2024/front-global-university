import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PersonnelCategory {
  _id: string;
  value: string;
  categorie_ar: string;
  categorie_fr: string;
}

export const personnelCategorySlice = createApi({
  reducerPath: "PersonnelCategory",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/personnel-category/`,
  }),
  tagTypes: ["PersonnelCategory"],
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
      fetchPersonnelCategoriesOfAllFaculties: builder.query<
      PersonnelCategory[],
        void
      >({
        query() {
          return `personnel-categories`;
        },
        providesTags: ["PersonnelCategory"],
      }),
    };
  },
});

export const {
  useFetchPersonnelCategoriesOfAllFacultiesQuery,
} = personnelCategorySlice;
