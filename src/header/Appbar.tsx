import React, { useState, useContext, Fragment, useEffect } from "react";
import {
  Disclosure,
  Menu,
  Transition,
  Switch,
  MenuButton,
} from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Black from "../assets/images/black.png";
import White from "../assets/images/white.png";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react";
import { format } from "date-fns";
import { fr, es, enUS } from "date-fns/locale";
import { ThemeContext } from "../context/theme";

const Appbar: React.FC = () => {
  useLocation();
  const { theme, setTheme } = useContext(ThemeContext);
  const authenticated = !!localStorage.getItem("authToken");
  const [enabled, setEnabled] = useState(false);
  const { t, i18n } = useTranslation();

  const [currLng, setCurrLng] = useState(() => {
    const storedLng = localStorage.getItem("preferredLanguage");
    return storedLng || i18n.language;
  });

  useEffect(() => {
    const storedLng = localStorage.getItem("preferredLanguage");
    if (storedLng) {
      i18n.changeLanguage(storedLng);
    }
  }, [i18n]);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrLng(lng);
    localStorage.setItem("preferredLanguage", lng);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    try {
      setTheme(newTheme);
      setEnabled(!enabled);

      if (
        (theme === "light" && newTheme !== "dark") ||
        (theme === "dark" && newTheme !== "light")
      ) {
        throw new Error("Theme did not toggle correctly");
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    }
  };

  useEffect(() => {
    setEnabled(theme === "dark");
  }, [theme]);

  const getLanguageName = (lng: string) => {
    switch (lng) {
      case "en":
        return "English";
      case "es":
        return "Español";
      case "fr":
        return "Français";
      default:
        return "English";
    }
  };

  const formatDate = (date: Date, dateFormat: string) => {
    switch (i18n.language) {
      case "fr":
        return format(date, dateFormat, { locale: fr });
      case "es":
        return format(date, dateFormat, { locale: es });
      default:
        return format(date, dateFormat, { locale: enUS });
    }
  };

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, "dd MMMM yyyy HH:mm:ss");

  return (
    <Disclosure
      as="nav"
      className={`border-b ${theme === "dark" ? "dark" : ""}`}
    >
      {() => (
        <div className="max-w-screen-1xl mx-10">
          <div className="flex h-20 items-center mx-4 justify-between">
            <div className="flex items-center">
              <Link to="/">
                <div className="flex-shrink-0">
                  {theme === "dark" ? (
                    <img className="h-28 p-1" src={White} alt="Recipe Finder" />
                  ) : (
                    <img className="h-28 p-1" src={Black} alt="Recipe Finder" />
                  )}
                </div>
              </Link>
            </div>

            <div className="flex items-center justify-center flex-1">
              <h2
                className={`${theme === "dark" ? "dark:text-white" : "text-black"} font-mono`}
              >
                {t("Current Date and Time")}: {formattedDate}
              </h2>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Menu as="div" className="relative">
                <div>
                  <MenuButton
                    className={`inline-flex justify-center items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold font-mono shadow-sm ring-1 ring-inset ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <span className="text-blue-600 mr-2">&#10003;</span>
                    {getLanguageName(currLng)}
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={`absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 overflow-y-auto ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
                  >
                    <div className="py-1 font-mono font-bold">
                      {["en", "es", "fr"].map((lng) => (
                        <Menu.Item key={lng}>
                          {() => (
                            <button
                              className={`${
                                currLng === lng
                                  ? "bg-blue-100 text-blue-900 dark:bg-gray-600 dark:text-blue-100"
                                  : "text-gray-700 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-700"
                              } block w-full text-left px-4 py-2 text-sm`}
                              onClick={() => handleLanguageChange(lng)}
                            >
                              {getLanguageName(lng)}
                              {currLng === lng && (
                                <span className="float-right">&#10003;</span>
                              )}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <Switch
                checked={enabled}
                onChange={toggleTheme}
                className={`${enabled ? "bg-slate-600" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out`}
              >
                <span
                  className={`${enabled ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 ring-1 ring-inset`}
                >
                  {enabled ? (
                    <MoonIcon className="text-gray-800" />
                  ) : (
                    <SunIcon className="text-yellow-500" />
                  )}
                </span>
              </Switch>

              <Menu as="div" className="relative ml-5">
                <div>
                  <Menu.Button className="rounded-full bg-transparent p-1 text-gray-400 hover:text-blue-600">
                    <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={`${
                      enabled
                        ? "dark:bg-gray-900 dark:text-white"
                        : "bg-white text-gray-700 transition-all duration-300"
                    } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  >
                    {authenticated ? (
                      <Link
                        className="block px-4 py-2 text-sm font-mono transition-all duration-300 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                        to="/logout"
                      >
                        {t("Sign-Out")}
                      </Link>
                    ) : (
                      <>
                        <Link
                          className="block px-4 py-2 text-sm font-mono transition-all duration-300 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                          to="/user/sign-in"
                        >
                          {t("Sign-In")}
                        </Link>
                        <Link
                          className="block px-4 py-2 text-sm font-mono transition-all duration-300 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                          to="/sign-up"
                        >
                          {t("Sign-Up")}
                        </Link>
                      </>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
};

export default Appbar;
