import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Inicio from './pages/dashboard';
import Classes from './pages/classes';
import Class from './pages/class';
import CreateClass from './pages/create-class';
import CreateCase from './pages/create-case';
import CreatePuzzle from './pages/create-puzzle';
import ImportCases from './pages/import-cases';
import Cases from './pages/cases';
import Puzzles from './pages/puzzles';
import Login from './pages/login';
import VisaoAluno from './pages/simulator';
import VisaoAlunoResp from './pages/simulatorAnswer';
import SelectUni from './pages/case-library/select-uni';
import SelectSubject from './pages/case-library/select-subject';
import SelectCase from './pages/case-library/select-case';
import Sidebar from './components/lateral-menu'
import EditCase from './pages/case';
import EditPuzzle from './pages/puzzle';

const Routes: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/",
      element: <Sidebar />,
      children: [
        {
          path: "/dashboard",
          element: <Inicio />,
        },
        {
          path: "/classes",
          element: <Classes />
        },
        {
          path: "/class/:code",
          element: <Class />
        },
        {
          path: "/case/:uuid",
          element: <EditCase />
        },
        {
          path: "/puzzle/:uuid",
          element: <EditPuzzle />
        },
        {
          path: "/create-class",
          element: <CreateClass />
        },
        {
          path: "/import-cases",
          element: <ImportCases />
        },
        {
          path: "/create-case",
          element: <CreateCase />
        },
        {
          path: "/cases",
          element: <Cases />
        },
        {
          path: "/library",
          element: <SelectUni />
        },
        {
          path: "/library/:nome",
          element: <SelectSubject />
        },
        {
          path: "/library/:nome/:tema",
          element: <SelectCase />
        },
        {
          path: "/puzzles",
          element: <Puzzles />
        },
        {
          path: "/create-puzzle",
          element: <CreatePuzzle />
        },
        {
          path: "/simulator",
          element: <VisaoAluno />
        },
        {
          path: "/simulator-answer",
          element: <VisaoAlunoResp />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Routes;