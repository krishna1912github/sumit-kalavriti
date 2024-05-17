/* eslint-disable jsx-a11y/anchor-is-valid */
import {Image} from '@shopify/hydrogen';

export default function categoryProducts() {
  function toggleDropdown() {
    const dropdownMenu: any = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('hidden');
  }
  return (
    <div>
      <div>
        <img
          src="app/assets/productCategory.png"
          alt=""
          className=" w-full object-center h-[30vh] object-fill"
        />
      </div>
      <div className=" flex-col p-11">
        <nav className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-base font-medium text-blue-400 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-blue-300 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="inline-flex items-center text-base font-medium text-blue-400 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
                >
                  products
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-blue-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-base font-medium md:ms-2">
                  madhubani
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg text-gray-700 font-medium">
            Showing results (19)
          </div>
          <div className="flex flex-row text-gray-700">
            <button
              onClick={toggleDropdown}
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium border- border-b-gray-400 rounded-md "
            >
              Sort by:Date
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15l-6-6h12l-6 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              id="dropdownMenu"
              className="hidden absolute right-0 w-56 mt-2 origin-bottom-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Earnings
                </a>
              </div>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-500"></div>
      </div>
    </div>
  );
}
