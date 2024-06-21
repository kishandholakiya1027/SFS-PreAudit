import "./App.css";
import AdminProtectedRoutes from "./protectedroutes/AdminProtectedRoutes";
import ClientDashboard from "./components/ClientDashboard";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountantProject from "./pages/AccountantProject";
import ReviewerProjectMain from "./pages/ReviewerProjectMain";
import PreAuditDocumentaion from "./pages/PreAuditDocumentaion";
// import PreAuditDocumentaion from "./pages/PreAuditDocumantation";
// import Organization from "./pages/PreAuditDocumantation/Organization";
// import Environmental from "./pages/PreAuditDocumantation/Environmental";
// import SocialLabour from "./pages/PreAuditDocumantation/SocialLabour";
// import ChainOfCustody from "./pages/PreAuditDocumantation/ChainOfCustody";
import CompanyDetails from "./pages/AuditSchedule/CompanyDetails";
import AuditorDetails from "./pages/AuditSchedule/AuditorDetails";
import AuditSchedule from "./pages/AuditSchedule/index";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <AdminProtectedRoutes>
          <Main />
        </AdminProtectedRoutes>
      ),
      children: [
        {
          path: "/pre_audit/dashboard",
          element: <ClientDashboard />,
        },
        {
          path: "/pre_audit/project",
          element: <AccountantProject />,
        },
        {
          path: "/pre_audit/project/:id",
          element: <ReviewerProjectMain />,
          children: [
            {
              path: "/pre_audit/project/:id/review",
              element: <PreAuditDocumentaion />,
              // children: [
              //   {
              //     path: "/pre_audit/project/:id/review/organisation",
              //     element: <Organization />,
              //   },
              //   {
              //     path: "/pre_audit/project/:id/review/environmental",
              //     element: <Environmental />,
              //   },
              //   {
              //     path: "/pre_audit/project/:id/review/social_and_labour",
              //     element: <SocialLabour />,
              //   },
              //   {
              //     path: "/pre_audit/project/:id/review/chain_of_custody",
              //     element: <ChainOfCustody />,
              //   },
              // ],
            },
            {
              path: "/pre_audit/project/:id/scheduling",
              element: <AuditSchedule />,
              children: [
                {
                  path: "/pre_audit/project/:id/scheduling/company_details",
                  element: <CompanyDetails />,
                },
                {
                  path: "/pre_audit/project/:id/scheduling/auditor_details",
                  element: <AuditorDetails />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
