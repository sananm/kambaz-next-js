'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import * as client from './client';
import ModulesControls from './ModulesControl';
import { FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';
import LessonControlButtons from './LessonControlButtons';
import ModuleControlButtons from './ModuleControlButtons';
import { setModules, addModule, editModule, updateModule, deleteModule } from './reducer';
import { useSelector, useDispatch } from 'react-redux';

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState('');
  // const addModule = () => {
  //   setModules([
  //     ...modules,
  //     { _id: uuidv4(), name: moduleName, course: cid, lessons: [] },
  //   ]);
  //   setModuleName('');
  // };

  // const deleteModule = (moduleId: string) => {
  //   setModules(modules.filter((m) => m._id !== moduleId));
  // };

  // const editModule = (moduleId: string) => {
  //   setModules(
  //     modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)),
  //   );
  // };
  // const updateModule = (module: any) => {
  //   setModules(modules.map((m) => (m._id === module._id ? module : m)));
  // };

  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const modules = await client.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };
    fetchModules();
  }, [cid, dispatch]);

  const handleAddModule = async () => {
    try {
      const newModule = await client.createModule(cid as string, { name: moduleName });
      dispatch(addModule(newModule));
      setModuleName('');
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await client.deleteModule(cid as string, moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  const handleUpdateModule = async (module: any) => {
    try {
      const updatedModule = await client.updateModule(cid as string, module);
      dispatch(updateModule(updatedModule));
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  return (
    <div className='wd-modules'>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={handleAddModule}
      />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className='rounded-0' id='wd-modules'>
        {(modules || []).map((module: any) => (
            <ListGroupItem
              key={module._id}
              className='wd-module p-0 mb-5 fs-5 border-gray'
            >
              <div className='wd-title p-3 ps-2 bg-secondary'>
                <BsGripVertical className='me-2 fs-3' />{' '}
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className='w-50 d-inline-block'
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value }),
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateModule({ ...module, editing: false });
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={handleDeleteModule}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {module.lessons && (
                <ListGroup className='wd-lessons rounded-0'>
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id}
                      className='wd-lesson p-3 ps-1'
                    >
                      <BsGripVertical className='me-2 fs-3' /> {lesson.name}{' '}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
