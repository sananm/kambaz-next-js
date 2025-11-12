import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database/assignments";

type AssignmentsState = {
    assignments: any[];
};

const initialState: AssignmentsState = {
    assignments: Array.isArray(assignments) ? assignments : [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }: { payload: any }) => {
            state.assignments = [...state.assignments, assignment];
        },
        deleteAssignment: (state, { payload: assignmentId }: { payload: string }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: assignment }: { payload: any }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === (assignment._id ?? assignment.id) ? { ...a, ...assignment } : a
            );
        },
        setAssignments: (state, { payload: items }: { payload: any[] }) => {
            state.assignments = items;
        },
        clearAssignments: (state) => {
            state.assignments = [];
        },
    },
});

export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    setAssignments,
    clearAssignments,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
