import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/styles.css";
import { NavLink } from "react-router-dom";
import Card from "../components/CardCourses";
import Loader from "../components/Loader";

export interface Course {
  _id: string;
  title: string;
  description: string;
  materials: string[];
  comments: string[];
  image: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          "http://localhost:3000/api/courses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Ошибка получения списка курсов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="back-loader">
        <Loader />;
      </div>
    );
  }

  return (
    <div
      className="courses-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/phoneCourse.jpg)`,
      }}
    >
      <h1>Оберіть курс:</h1>
      <div className="card-deck">
        {courses.map((course) => (
          <NavLink key={course._id} to={`/courses/${course._id}/modules`}>
            <Card dataImage={course.image}>
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text">{course.description}</p>
              <p className="card-text">
                <span className="card-materials">Матеріали:</span>{" "}
                <span className="card-materials-text">
                  {course.materials.join(", ")}
                </span>
              </p>
            </Card>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
