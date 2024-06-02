import React from "react";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import axios from "../../config/api/axios";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";

const InternalStudent = () => {
  const { user } = React.useContext(UserContext);
  const [internal, setInternal] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchInternal = async () => {
      try {
        const response = await axios.get("/internal/student/" + user._id);
        setInternal(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchInternal();
  }, [user]);

  return (
    <main className="internal">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-primary decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Моя успеваемость
      </h2>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
      {internal.length ? (
        <section className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
          <table className="w-full ">
            <TableHeader
              AdditionalHeaderClasses={"first:text-left"}
              Headers={[
                "Дисциплина",
                "Итог за лекции",
                "Итог за семинары",
                "Итог за контрольные",
                "Итог за посещаемость",
                "Общая оценка",
              ]}
            />
            <tbody className="text-left">
              {internal?.map((paper, index) => (
                <tr
                  key={index}
                  className="border-t-[1px] border-violet-500 first:border-none"
                >
                  <td className="p-2 text-left">{paper.paper.paper}</td>
                  <td className="p-2 text-center">{paper.marks.test}</td>
                  <td className="p-2 text-center">{paper.marks.seminar}</td>
                  <td className="p-2 text-center">{paper.marks.assignment}</td>
                  <td className="p-2 text-center">{paper.marks.attendance}</td>
                  <td className="p-2 text-center">
                    {paper.marks.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default InternalStudent;
