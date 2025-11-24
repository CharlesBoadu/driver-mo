import { CircleEllipsisIcon } from "lucide-react";

const Pagination = (props) => {
  const { handleNextPage, handlePrevPage, currentPage, setCurrentPage } = props;

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleAddNewNumber = () => {};

  return (
    <div className="mb-5">
      <div className="flex w-full flex-col justify-center">
        <ul className="m-auto mb-4 inline-flex w-fit items-center space-x-1 rtl:space-x-reverse">
          {/* <li>
                        <button
                            type="button"
                            className="flex w-[12vw] justify-center rounded border-2 border-white-light px-3.5 py-2 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-[#191e3a] dark:text-white-light dark:hover:border-primary md:w-full"
                            onClick={handleFirstPage}
                        >
                            First
                        </button>
                    </li> */}
          <li>
            <button
              type="button"
              className="flex w-[10vw] justify-center rounded border-2 border-white-light px-3.5 py-2 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-[#191e3a] dark:text-white-light dark:hover:border-primary md:w-full"
              onClick={handlePrevPage}
            >
              Prev
            </button>
          </li>
          <li>
            <button
              type="button"
              className={
                currentPage == 1
                  ? `flex w-[10vw] justify-center rounded border-2 border-primary px-3.5 py-2 font-semibold text-primary transition dark:border-primary dark:text-white-light md:w-full`
                  : `flex w-[10vw] justify-center rounded border-2 border-white-light px-3.5 py-2 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-[#191e3a] dark:text-white-light dark:hover:border-primary md:w-full`
              }
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
          </li>
          <li>
            <button
              type="button"
              className={
                currentPage == 2
                  ? `flex w-[10vw] justify-center rounded border-2 border-primary px-3.5 py-2 font-semibold text-primary transition dark:border-primary dark:text-white-light md:w-full`
                  : `flex w-[10vw] justify-center rounded border-2 border-white-light px-3.5 py-2 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-[#191e3a] dark:text-white-light dark:hover:border-primary md:w-full`
              }
              // onClick={() => setCurrentPage(2)}
            >
              2
            </button>
          </li>
          <li>
            <button
              type="button"
              className={
                currentPage == 3
                  ? `flex w-[10vw] justify-center rounded border-2 border-primary px-3.5 py-2 font-semibold text-primary transition dark:border-primary dark:text-white-light md:w-full`
                  : `flex w-[10vw] justify-center rounded border-2 border-white-light px-3.5 py-2 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-[#191e3a] dark:text-white-light dark:hover:border-primary md:w-full`
              }
              // onClick={() => setCurrentPage(3)}
            >
              3
            </button>
          </li>
          {currentPage > 3 && (
            <li key={currentPage} className="flex flex-row">
              {currentPage > 4 && (
                <div className="flex flex-col justify-end px-2 font-bold">
                  <CircleEllipsisIcon />
                </div>
              )}
              <button
                type="button"
                className={`flex w-[10vw] justify-center rounded border-2 border-primary px-3.5 py-2 font-semibold text-primary transition dark:border-primary dark:text-white-light md:w-full ${
                  currentPage === currentPage
                    ? "border-primary text-primary"
                    : "hover:border-primary hover:text-primary"
                } dark:border-[#191e3a] dark:text-white-light dark:hover:border-primary`}
                onClick={() => setCurrentPage(currentPage)}
              >
                {currentPage}
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              className="flex w-[10vw] justify-center rounded border-2 border-white-light px-3.5 py-2 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-[#191e3a] dark:text-white-light dark:hover:border-primary md:w-full"
              onClick={handleNextPage}
            >
              Next
            </button>
          </li>
          {/* <li>
                        <button
                            type="button"
                            className="flex w-[12vw] justify-center rounded border-2 border-white-light px-3.5 py-2 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-[#191e3a] dark:text-white-light dark:hover:border-primary md:w-full"
                        >
                            Last
                        </button>
                    </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
