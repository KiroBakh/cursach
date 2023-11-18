import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/styles.css";
import Loader from "../components/Loader";

interface Module {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const ModulesPage: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const { courseId } = useParams<{ courseId: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get<Module[]>(
          `http://localhost:3000/api/courses/${courseId}/modules`
        );
        setModules(response.data);
        if (response.data.length > 0) {
          setActiveModule(response.data[0]._id);
        }
      } catch (error) {
        console.error("Ошибка получения списка модулей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [courseId]);

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId === activeModule ? null : moduleId);
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
      <div className="module-page">
      <div className="optionsModule">
        {modules.map((module) => (
          <div
            key={module._id}
            className={`optionModule ${
              activeModule === module._id ? "activeModule" : ""
            }`}
            style={{
              backgroundImage: `url(${module.image})`,
            }}
            onClick={() => handleModuleClick(module._id)}
          >
            <NavLink to={`/courses/${courseId}/modules/${module._id}/lessons`}>
              <div className="shadowModule"></div>
              <div className="labelModule">
                <div className="infoModule">
                  <div className="mainModule">{module.title}</div>
                  <div className="subModule">{module.description}</div>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
        </div>
        </div>
    </>
  );
};

export default ModulesPage;
