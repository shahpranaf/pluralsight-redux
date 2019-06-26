import React from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount() {
    const { courses, loadAuthors, loadCourses, authors } = this.props;
    if (courses.length === 0) {
      loadCourses().catch(err => {
        alert("Loading courses failed" + err);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(err => {
        alert("Loading authors failed" + err);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <h2> Courses</h2>
            <button
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course{" "}
            </button>
            <CourseList courses={this.props.courses} />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func,
  authors: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

const mapStateChange = state => {
  console.log(state);
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     createCourse: course => dispatch(courseActions.createCourse(course))
//   };
// };

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
};

export default connect(
  mapStateChange,
  mapDispatchToProps
)(CoursesPage);
