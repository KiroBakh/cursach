import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Course } from "../pages/CoursesPage";
import axios from "axios";


export default function NavigationHeader() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          "http://localhost:3000/api/courses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Ошибка получения списка курсов:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/api/about-site">
          Про сайт
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/link">
          Посилання
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink
          className="nav-link dropdown-toggle"
          to="/api/courses"
          role="button"
          data-bs-toggle="dropdown"
        >
          Курси
        </NavLink>
        <ul className="dropdown-menu bg-dark">
          {courses.map((course) => (
            <li key={course._id}>
              <NavLink
                className="dropdown-item"
                to={`/courses/${course._id}/modules`}
              >
                {course.title}
              </NavLink>
              <hr className="dropdown-divider bg-light" />
            </li>
          ))}
        </ul>
      </li>
    </>
  );
}
