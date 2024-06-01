import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiUserThin, PiStudentThin } from "react-icons/pi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const keys = {
  "username": "Имя пользователя",
  "name": "Имя",
  "email": "Электронная почта",
  "department": "Кафедра",
  "role": "Роль",
  "course": "Группа",
  "achievements": "Достижения",
  "publications": "Публикации",
};

const Profile = () => {
  const { user } = React.useContext(UserContext);
  const [profile, setProfile] = React.useState({});
  const [studentInfo, setStudentInfo] = React.useState({});
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const getProfile = async () => {
    const response = await axios.get(`${user.userType}/${user._id}`);
    setProfile(response.data);
    if (user.role === "student") {
      setStudentInfo(response.data);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, [user]);

  const handleUpdateStudentInfo = async (e) => {
    e.preventDefault();
    const student = user;
    const index = student._id;
    try {
      const response = await axios.patch("/student/" + student._id, {
        id: user._id,
        ...studentInfo,
      });
      toast.success(response.data.message);
      setError("");
      getProfile();
    } catch (err) {
      setError(err);
    }
  };

  const handleFormChange = (e) => {
    setStudentInfo({
      ...studentInfo,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <main className="flex w-full flex-col justify-center md:w-fit">
      {profile.name ? (
        <>
          <div className=" my-4 flex w-full justify-center overflow-auto dark:border-slate-500 dark:p-[1px]">
            {user.userType === "staff" ? (
              <PiUserThin className="m-2 rounded-full border-2 border-slate-900 p-1 text-6xl dark:border-slate-300 md:p-2 md:text-9xl lg:text-[12rem]" />
            ) : (
              <PiStudentThin className="m-2 rounded-full border-2 border-slate-900 p-1 text-6xl font-light dark:border-slate-300 md:p-2 md:text-9xl lg:text-[12rem]" />
            )}
            <div className="flex flex-col items-start justify-center">
              <h2 className=" whitespace-break-spaces text-3xl font-bold text-primary decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                {user?.name}
              </h2>
              <p className="text-lg capitalize sm:text-xl md:text-2xl">
                {user?.role}
              </p>
            </div>
          </div>
          <div className=" w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
            <table className="w-full ">
              <tbody>
                {Object.keys(profile).map((key, index) => (
                  <tr
                    key={index}
                    className="border-t first:border-t-0 border-slate-400 last:border-b-0 "
                  >
                    <th className="bg-slate-900 p-4 text-base capitalize text-slate-100">
                      {keys[key]}
                    </th>
                    <td className="px-4 py-2">{
                      ["achievements", "publications"].includes(key) ?
                        (
                          profile[key].split(",").map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        ) : profile[key]
                    }</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {user.role === "student" && (
              <form className="p-5">
                <label htmlFor="achievements">Достижения:</label>
                <input
                  className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
                  type="text"
                  name="achievements"
                  id="achievements"
                  value={studentInfo.achievements}
                  onChange={(e) => handleFormChange(e)}
                />
                <label htmlFor="publications">Публикации:</label>
                <input
                  className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
                  type="text"
                  name="publications"
                  id="publications"
                  value={studentInfo.publications}
                  onChange={(e) => handleFormChange(e)}
                />
                <button
                  className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
                  type="submit"
                  onClick={(e) => handleUpdateStudentInfo(e)}
                >
                  Сохранить
                </button>
              </form>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Profile;
