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