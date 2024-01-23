import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutAuth } from "../pages/auth";
import { LayoutDashboard } from "../pages/dashboard/components";
import { useAuthStore } from "../hooks";

// import { ViewHome } from "../components/home/ViewHome";
// import { useAuthStore } from "../hooks";
// import { Dashboard } from "../components/dashboard/Dashboard";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return (
      <div class="text-center">
        <div
          class="spinner-border"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LayoutAuth />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LayoutDashboard />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
