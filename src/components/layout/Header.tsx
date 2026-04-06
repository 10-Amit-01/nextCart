import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import SearchBar from "../SearchBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

export default function Header() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between px-8 py-4 max-w-screen-2xl mx-auto font-inter tracking-tight">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-12">
          <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">
            NexCart
          </span>

          <div className="hidden md:flex items-center gap-8">
            <NavLink
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600"
                    : "text-slate-600 dark:text-slate-400 hover:text-blue-500"
                }`
              }
              to="/"
            >
              Shop
            </NavLink>
            <NavLink
              className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-500 transition-colors duration-200"
              to="#"
            >
              Categories
            </NavLink>
          </div>
        </div>

        <SearchBar />

        {/* Action Icons */}
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-blue-600 transition-colors h-auto w-auto p-2"
          >
            <span className="material-symbols-outlined">Cart</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:text-blue-600 transition-colors h-auto w-auto p-2"
          >
            <span className="material-symbols-outlined">favorite</span>
          </Button>

          {isLoggedIn ? (
            /* Logged-in: show avatar / name + logout */
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user?.name ?? "Account"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-sm border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            /* Not logged-in: show Login button */
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

