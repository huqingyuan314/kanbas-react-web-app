import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../Database";

interface Enrollment {
  user: string; // User ID
  course: string; // Course ID
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: initialEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {

    // Enrolls a user in a course if they are not already enrolled
    enrollInCourse: (state, action: PayloadAction<Enrollment>) => {
      const { user, course } = action.payload;
      const existingEnrollment = state.enrollments.some(
        (enrollment) => enrollment.user === user && enrollment.course === course
      );

      if (!existingEnrollment) {
        // Add new enrollment if it doesn't already exist
        state.enrollments.push({ user, course });
      }
    },

    // Unenrolls a user from a course based on userId and courseId
    unenrollFromCourse: (state, action: PayloadAction<Enrollment>) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) => !(enrollment.user === user && enrollment.course === course)
      );
    },
  },
});

export const { enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;









// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Enrollment {
//   userId: string;
//   courseId: string;
// }

// interface EnrollmentState {
//   enrollments: Enrollment[];
// }

// const initialState: EnrollmentState = {
//   enrollments: [],
// };

// const enrollmentsSlice = createSlice({
//   name: 'enrollments',
//   initialState,
//   reducers: {
//     enrollInCourse: (state, action: PayloadAction<Enrollment>) => {
//       const { userId, courseId } = action.payload;
//       const existingEnrollment = state.enrollments.find(enrollment => enrollment.userId === userId && enrollment.courseId === courseId);
//       if (!existingEnrollment) {
//         state.enrollments.push(action.payload);
//       }
//     },
//     unenrollFromCourse: (state, action: PayloadAction<Enrollment>) => {
//       state.enrollments = state.enrollments.filter(enrollment => enrollment.userId !== action.payload.userId || enrollment.courseId !== action.payload.courseId);
//     },
//   },
// });

// export const { enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
// export default enrollmentsSlice.reducer;





// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define the type for an enrollment
// interface Enrollment {
//   _id: number;
//   user: string;
//   course: string;
// }

// // Define the state type
// interface EnrollmentsState {
//   enrollments: Enrollment[];
// }

// const initialState: EnrollmentsState = {
//   enrollments: [], // Initialize as an empty array of enrollments
// };

// const enrollmentsSlice = createSlice({
//   name: "enrollments",
//   initialState,

//   reducers: {
//     setEnrollments(state, action: PayloadAction<Enrollment[]>) {
//       state.enrollments = action.payload;
//     },

//     // enrollInCourse(state, action: PayloadAction<Enrollment>) {
//     //   state.enrollments.push(action.payload);
//     // },

//     enrollInCourse: (state, action: PayloadAction<Enrollment>) => {
//       const { user, course } = action.payload;
//       const existingEnrollment = state.enrollments.some(
//         (enrollment) => enrollment.user === user && enrollment.course === course
//       );
//             if (!existingEnrollment) {
//         // Add new enrollment if it doesn't already exist
//         state.enrollments.push({
//           user, course,
//           _id: new Date().getTime(),
//         });
//       }
//     },

//     unenrollFromCourse(state, action: PayloadAction<{ user: string; course: string }>) {
//       state.enrollments = state.enrollments.filter(
//         (enrollment) =>
//           enrollment.user !== action.payload.user ||
//           enrollment.course !== action.payload.course
//       );
//     },
//   },
// });

// export const { setEnrollments, enrollInCourse, unenrollFromCourse } =
//   enrollmentsSlice.actions;
// export default enrollmentsSlice.reducer;