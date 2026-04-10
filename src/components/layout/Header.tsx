import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import { logout } from "@/api/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutAction } from "@/store/slices/authSlice";
import { toggleTheme } from "@/store/slices/themeSlice";

export default function Header() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.theme.theme);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { mutateAsync: logoutMutation, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: () => {
      dispatch(logoutAction());
      setIsMobileMenuOpen(false);
    },
    onError: () => {
      dispatch(logoutAction());
      setIsMobileMenuOpen(false);
    },
  });

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none border-b border-transparent dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 max-w-screen-2xl mx-auto font-inter tracking-tight">
        {/* Left Side: Menu Toggle (Mobile) + Logo + Desktop Nav */}
        <div className="flex items-center gap-3 md:gap-10">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:text-blue-600 dark:hover:text-blue-400 transition-colors h-auto w-auto p-1.5 -ml-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>

          <NavLink
            to="/"
            className="text-xl md:text-2xl font-bold tracking-tighter text-slate-900 dark:text-slate-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            NexCart
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            <NavLink
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 pb-0.5"
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

        {/* Center: Desktop Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-6 lg:mx-10">
          <SearchBar />
        </div>

        {/* Right Side: Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4 text-slate-600 dark:text-slate-400">
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors h-auto w-auto p-1.5 sm:p-2"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 sm:w-5 sm:h-5" />
            ) : (
              <Moon className="w-5 h-5 sm:w-5 sm:h-5" />
            )}
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user?.name || "User profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    (user?.name?.charAt(0).toUpperCase() ?? "U")
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user?.name ?? "Account"}
                </span>
              </div>
              <NavLink to={"/cart"}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-blue-600 transition-colors h-auto w-auto p-1.5 sm:p-2 relative"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  {totalQuantity > 0 && (
                    <span className="absolute top-0 right-0 sm:right-0 sm:top-0 h-4 min-w-[16px] px-1 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </Button>
              </NavLink>
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors hidden sm:inline-flex"
                onClick={handleLogout}
              >
                {isPending ? "Logging out..." : "Logout"}
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 hidden sm:inline-flex"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)] flex flex-col animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-4">
            {/* Search Bar for Mobile */}
            <div className="w-full">
              <SearchBar />
            </div>

            {/* Nav Links */}
            <div className="flex flex-col space-y-1">
              <NavLink
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`
                }
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </NavLink>
              <NavLink
                className="px-4 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                to="#"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </NavLink>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>

            {/* Mobile Auth/Account Actions */}
            <div className="px-4 pb-2">
              {isLoggedIn ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user?.name || "User profile"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        (user?.name?.charAt(0).toUpperCase() ?? "U")
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {user?.name ?? "Account"}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {user?.email ?? "user@example.com"}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900"
                    onClick={handleLogout}
                  >
                    {isPending ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
