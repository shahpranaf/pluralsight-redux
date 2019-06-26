import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderCourseForm(args) {
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render Add course header", () => {
  const { getByText } = renderCourseForm();
  /* No need to assert. It will do automatically. Its not precise.
   Do only when you are sure there is only one coccurrence of it */
  getByText("Add Course");
});

it("should label save button as 'Save' when not saving", () => {
  const { getByText } = renderCourseForm();
  /* No need to assert. It will do automatically. Its not precise.
     Do only when you are sure there is only one coccurrence of it */
  getByText("Save");
});

it("should label save button as 'Saving...' when saving", () => {
  const { getByText } = renderCourseForm({ saving: true });
  /* No need to assert. It will do automatically. Its not precise.
     Do only when you are sure there is only one coccurrence of it */
  getByText("Saving...");
});
