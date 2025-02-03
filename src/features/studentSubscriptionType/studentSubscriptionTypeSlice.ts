import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface StudentSubscriptionType {
  _id: string;
    value_type_inscription: string;
    type_ar: string;
    type_fr: string;
    files_type_inscription: {
      name_ar: string;
      name_fr: string;
    }[];
}

export const StudentSubscriptionTypeSlice = createApi({
  reducerPath: "StudentSubscriptionType",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/student-subscription/`,
  }),
  tagTypes: ["StudentSubscriptionType"],
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
      fetchStudentSubscriptionTypeOfAllFaculties: builder.query<
      StudentSubscriptionType[],
        void
      >({
        query() {
          return `student-subscription-types`;
        },
        providesTags: ["StudentSubscriptionType"],
      }),
    };
  },
});

export const {
  // useFetchTeacherSpecialtiesByFacultyIdQuery,
  useFetchStudentSubscriptionTypeOfAllFacultiesQuery,
} = StudentSubscriptionTypeSlice;
