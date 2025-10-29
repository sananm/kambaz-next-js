import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database/assignments.json";
import { v4 as uuidv4 } from "uuid";

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
            const newAssignment: any = {
                _id: uuidv4(),
                title: assignment.title,
                description: assignment.description ?? "",
                dueDate: assignment.dueDate ?? assignment.availableUntil,
                completed: !!assignment.completed,
                course: assignment.course ?? assignment.courseId ?? assignment.courseId,
            };
            state.assignments = [...state.assignments, newAssignment];
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
