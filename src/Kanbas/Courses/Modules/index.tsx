import React, { useEffect, useState } from "react";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
// import * as db from "../../Database";

import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { useSelector, useDispatch } from "react-redux";
import GreenCheckmark from "./GreenCheckmark";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");

  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };


    // Check if the user has FACULTY role
    const isFaculty = currentUser?.role === "FACULTY";

return (
      <div>
      
        <ModulesControls　
        setModuleName={setModuleName} 
        moduleName={moduleName} 
        addModule={createModuleForCourse} />

      <br /><br /><br /><br />

<ul id="wd-modules" className="list-group rounded-0">
          {modules
          // .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li key={module._id} 
              className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
            {isFaculty && <BsGripVertical className="me-2 fs-3" /> }
            <RxTriangleDown className="me-2 fs-4"/>

              {!module.editing && module.name}
              { module.editing && (
                <input className="form-control w-50 d-inline-block"
                  onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                  onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveModule({ ...module, editing: false });
                 }
               }}
              defaultValue={module.name}/>
            )}

            {/* Show ModuleControlButtons only if user is FACULTY */}
            {isFaculty && (
              <ModuleControlButtons moduleId={module._id}
                                    deleteModule={(moduleId) => removeModule(moduleId)}
                                    editModule={(moduleId) => dispatch(editModule(moduleId))} />
            )}

            {/* If user is not FACULTY, only show GreenCheckmark */}
            {!isFaculty && (<div className="float-end"><GreenCheckmark /></div> )}
            
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li key={lesson._id}
                      className="wd-lesson list-group-item p-3 ps-1">
                    {isFaculty && <BsGripVertical className="me-2 fs-3" /> } {lesson.name} 
                    
                    {/* Show LessonControlButtons only if user is FACULTY */}
                    {isFaculty && <LessonControlButtons />}

                    {/* If user is not FACULTY, only show GreenCheckmark */}
                    {!isFaculty && (<div className="float-end"><GreenCheckmark /></div> )}


                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
  </ul>

      </div>
  );}
  
  