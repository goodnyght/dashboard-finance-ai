import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !session) {
      navigate("/login");
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return session ? <>{children}</> : null;
};

export default ProtectedRoute;
