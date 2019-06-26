import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { newCourse } from "../../../tools/mockData";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  loadAuthors,
  loadCourses,
  authors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(err => {
        alert("Loading courses failed" + err);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(err => {
        alert("Loading authors failed" + err);
      });
    }
  }, [props.course]);

  const handleChange = event => {
    const { name, value } = event.target;

    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  };

  const handleSave = event => {
    event.preventDefault();
    setSaving(true);
    saveCourse(course)
      .then(data => {
        toast.success("Course saved");
        history.push("/courses");
      })
      .catch(err => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  };

  return courses.length === 0 && authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func,
  authors: PropTypes.array,
  course: PropTypes.object.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const getCourseBySlug = (courses, slug) => {
  return courses.find(course => course.slug === slug) || null;
};

const mapStateChange = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  console.log(ownProps);
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     createCourse: course => dispatch(courseActions.createCourse(course))
//   };
// };

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

export default connect(
  mapStateChange,
  mapDispatchToProps
)(ManageCoursePage);
