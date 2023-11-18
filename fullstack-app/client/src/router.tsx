import React from "react";
import { Route, Routes } from "react-router";

import Header from "./layouts/Header";
import AboutSite from "./pages/AboutSitePage";
import AuthPage from "./pages/AuthPage";
import CoursesPage from "./pages/CoursesPage";
import ModulesPage from "./pages/ModulesPage";
import LessonsPage from "./pages/LessonPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/api/about-site" element={<AboutSite />} />
        <Route path="/api/auth" element={<AuthPage />} />
        <Route path="/api/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId/modules" element={<ModulesPage />} />
        <Route path="/courses/:courseId/modules/:moduleId/lessons" element={<LessonsPage />}/>
      </Route>
    </Routes>
  );
}
