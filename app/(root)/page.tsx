import LocalSearch from "@/components/search/LocalSearch";
import { buttonVariants } from "@/components/ui/button";
import ROUTES from "@/constant/routes";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "What is state management in React?",
    description:
      "State management in React refers to the process of managing the state of a component or application. It involves keeping track of the data that changes over time and ensuring that the UI reflects those changes.",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "State Management" },
      { _id: "3", name: "JavaScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "What is the difference between React and Angular?",
    description:
      "React and Angular are both popular front-end frameworks, but they have some key differences. React is a library that focuses on building UI components, while Angular is a full-fledged framework that provides a complete solution for building web applications.",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Angular" },
      { _id: "3", name: "Frontend" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 15,
    answers: 8,
    views: 200,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  // `LocalSearch` writes the typed value to the URL as `?query=...`.
  const { query } = await searchParams;
  const normalizedQuery = Array.isArray(query)
    ? (query[0] ?? "")
    : (query ?? "");

  // Filtering uses the URL value, so a URL update causes fresh matching results.
  const filteredQuestions = questions.filter((question) =>
    question.title
      .toLocaleLowerCase()
      .includes(normalizedQuery.toLocaleLowerCase()),
  );

  return (
    <>
      <section
        className="w-full flex flex-col-reverse sm:flex-row 
      justify-between gap-4 sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link
          href={ROUTES.ASK_QUESTION}
          className={buttonVariants({
            className:
              "primary-gradient min-h-[46px] px-4 py-3 text-light-900!",
          })}
        >
          Ask a Question
        </Link>
      </section>
      <section className="mt-11 ">
        {/* The client search input updates `query`; this server page renders the matches. */}
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
