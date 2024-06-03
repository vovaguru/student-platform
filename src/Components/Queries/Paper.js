import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { AiFillBook } from "react-icons/ai";
import axios from "../../config/api/axios";

const Paper = () => {
  const { setPaper, paperList, user } = useContext(UserContext);

  const [papers, setPapers] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [recommendsByInternal, setRecommendsByInternal] = useState([]);
  const [internal, setInternal] = useState([]);

  useEffect(() => {
    const fetchInternal = async () => {
      const response = await axios.get("/internal/student/" + user._id)
        .then(res => setInternal(res.data));

    };
    fetchInternal();
    console.log(internal);
  }, [user]);

  useEffect(() => {
    const getallPapers = async () => {
      const response = await axios.get("/paper/manage/" + user._id)
        .then((res) => {
          setPapers(res.data)
          const likedCategories = papers
            .filter(paper => paper.likedBy.length > 0)
            .map(paper => paper.category);
          setRecommends(res.data
            .filter(paper => likedCategories.includes(paper.category))
            .filter(paper => paperList.map(paper => paper.paper).includes(paper.paper) === false));
          const categories = internal
            .filter(grade => grade.marks.total >= 70)
            .map(grade => {
              const paper = papers.find(p => p.paper === grade.paper.paper);
              return paper ? paper.category : null;
            })
            .filter(category => category !== null);

            setRecommendsByInternal(res.data
              .filter(paper => categories.includes(paper.category))
              .filter(paper => paperList.map(paper => paper.paper).includes(paper.paper) === false))

        });
    };
    getallPapers();

  }, []);

  return (
    <main className="paper">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-xl font-bold text-primary decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-3xl">
        Мои дисциплины
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

      <h2 className="mb-2 mt-3 whitespace-break-spaces  font-bold text-primary decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-3xl">
        Мои рекомендации на основе предпрочтений
      </h2>
      {recommends.length ? (
        <section className="pt-4 lg:columns-2">
          {recommends.map((paper, index) => (
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

      <h2 className="mb-2 mt-3 whitespace-break-spaces  font-bold text-primary decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-3xl">
        Мои рекомендации на основе оценок
      </h2>
      {recommendsByInternal.length ? (
        <section className="pt-4 lg:columns-2">
          {recommendsByInternal.map((paper, index) => (
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
