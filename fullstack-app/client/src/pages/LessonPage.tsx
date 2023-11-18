import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Quiz from "../components/Quize";
import Loader from "../components/Loader";

interface Lesson {
  _id: string;
  title: string;
  content: string;
}

interface Course {
  _id: string;
  title: string;
}

interface Module {
  _id: string;
  title: string;
}

const LessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const { courseId, moduleId } = useParams<{
    courseId: string;
    moduleId: string;
  }>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [quizzes, setQuizzes] = useState([]);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

 useEffect(() => {
   const fetchCourseAndModuleDetails = async () => {
     try {
       const courseResponse = await axios.get<Course>(
         `http://localhost:3000/api/courses/${courseId}`
       );
       const moduleResponse = await axios.get<Module>(
         `http://localhost:3000/api/courses/${courseId}/modules/${moduleId}`
       );
       setCourse(courseResponse.data);
       setModule(moduleResponse.data);
     } catch (error) {
       console.error("Ошибка получения данных курса или модуля:", error);
     } finally {
       setLoading(false);
     }
   };

   const fetchData = async () => {
     try {
       const response = await axios.get<Lesson[]>(
         `http://localhost:3000/api/courses/${courseId}/modules/${moduleId}/lessons`
       );
       
       setLessons(response.data);
       setTotalPages(response.data.length);
     } catch (error) {
       console.error("Ошибка получения списка уроков:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchCourseAndModuleDetails();
   fetchData();
 }, [courseId, moduleId, currentPage]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/courses/${courseId}/modules/${moduleId}/quizzes`
        );
        setQuizzes(response.data);
      } catch (error) {
        console.error("Ошибка получения списка тестов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [courseId, moduleId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setShowQuiz(false);
  };

  const isLastPage = currentPage === totalPages;

  const lessonsToShow = lessons.filter(
    (lesson, index) => index + 1 === currentPage
  );

  const handleShowQuiz = () => {
    setShowQuiz(true);
    setCurrentPage(0);
  };

  if (loading) {
    return (
      <div className="back-loader">
        <Loader />;
      </div>
    );
  }

  return (
    <>
      <div className="head-leson">
        <p className="head-leson__title">
          &#127968; Курс: {course?.title || ""} / Модуль: {module?.title || ""}{" "}
          / Заняття: {lessonsToShow[0]?.title || ""}
        </p>
      </div>
      <div className="container-lesson">
        <div className="zui-pager">
          <ol className="btn-group">
            <li
              className="btn-group__item"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <i className="i-chevron-left"></i>
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page, index) => (
                <li key={index} className="btn-group__item">
                  <button
                    className={`btn btn--basic ${
                      page === currentPage ? "current" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    <span>{page}</span>
                  </button>
                  
                </li>
              )
            )}

            <li className="btn-group__item" onClick={handleShowQuiz}>
              <button className="btn btn--basic">
                <span>Тест</span>
              </button>
            </li>
                    
            <li
              className="btn-group__item"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {isLastPage ? (
                <span>
                  <i className="i-chevron-right"></i>
                </span>
              ) : (
                <i className="i-chevron-right"></i>
              )}
            </li>
          </ol>
        </div>
        <hr className="hr-lesson"/>
        <ul>
          {lessonsToShow.map((lesson) => (
            <li className="lesson" key={lesson._id}>
              <h2 className="lesson__title">{lesson.title}</h2>
              <p className="lesson__content">{lesson.content}</p>
            </li>
          ))}
          {showQuiz && <Quiz moduleId={moduleId || ""} quizzes={quizzes} />}
        </ul>
      </div>
    </>
  );
};

export default LessonsPage;
