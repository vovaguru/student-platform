import React, { useContext } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";

const Header = () => {
  const { setUser, setPaperList } = useContext(UserContext);
  const logout = () => {
    setUser("");
    setPaperList([]);
    localStorage.clear();
    toast.info("Logged Out");
  };
  return (
    <header className="absolute top-0 flex w-full justify-between bg-primary text-slate-50 dark:bg-[#005857] ">
      <Link
        to="/dash"
        className="ml-4 flex items-center gap-2 px-3 py-1 text-2xl font-semibold sm:text-3xl"
      >
        <FaUniversity className="m-1" />
        {/* <h1 className="m-0 pr-1 font-spectral text-slate-50 decoration-violet-500 decoration-[3px] underline-offset-[3px] hover:underline">
          Цифровой профиль студента
        </h1> */}
      </Link>
      <Link
        to="./"
        className="text-md m-2 mr-4 flex items-center rounded-md p-[7px] font-semibold duration-200 hover:bg-red-700 hover:text-slate-100"
        onClick={() => logout()}
      >
        <p>&nbsp;Выйти&nbsp;&nbsp;</p>
        <FiLogOut className="text-xl" />
      </Link>
    </header>
  );
};

export default Header;
