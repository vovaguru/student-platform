import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { AiFillBook } from "react-icons/ai";

const Paper = () => {
  const { setPaper, paperList } = useContext(UserContext);

  return (
    <main className="paper">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-primary decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Дисциплины
      </h2>
      {paperList.length ? (
        <section className="pt-4 lg:columns-2">
          {paperList.map((paper, index) => (
            <Link to={paper.paper} key={index} onClick={() => setPaper(paper)}>
              <article className="mb-4 flex items-center whitespace-break-spaces rounded-md  bg-primary dark:bg-slate-950/80 dark:hover:bg-slate-950/50 dark:hover:text-slate-300 lg:p-4 ">
                <AiFillBook className="text-[3rem] lg:text-[4rem] text-white" />
                <div className=" text-white">
                  <h3 className="px-1 text-xl line-clamp-1 font-semibold lg:px-2 lg:text-2xl">
                    {paper.paper}
                  </h3>
                  <p className="px-2 text-sm font-medium lg:text-base ">
                    {paper.year}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <p className="text-lg">Список доступных занятий пуст.</p>
      )}
    </main>
  );
};

export default Paper;
