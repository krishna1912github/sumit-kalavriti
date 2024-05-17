import {Image} from '@shopify/hydrogen';
import React, {useState} from 'react';

import logo from '~/assets/logo.svg';
import {Input} from '~/components/Input';
export default function sigup() {
  const [signup, setSignup] = useState(true);
  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <div className="relative w-1/2 h-full flex justify-center items-center  bg-orange-500  ">
        <div className="absolute w-72 h-56 top-[180px] left-[184px] shadow-2xl ">
          <Image
            src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
            alt="Decorative Showpiece"
            className="rounded-xl w-64 h-56"
          />
        </div>
        <div className="absolute w-72 h-56 top-[250px] left-[360px] rounded-lg shadow-2xl">
          <Image
            src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
            alt="Decorative Showpiece"
            className="rounded-xl w-72 h-56"
          />
        </div>

        <div className="absolute w-72 h-56 top-[320px] left-[210px] shadow-2xl">
          <Image
            src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
            alt="Decorative Showpiece"
            className="rounded-xl w-72 h-56 shadow-2xl"
          />
        </div>
        <div
          className="mt-[800px] mx-2.5 -
        
         items-center text-justify mb-10 text-white text-sm py-20 "
        >
          © 2023 Copyright reserved by Kalavriti Private Limited
        </div>
      </div>

      {signup && (
        <div className="w-1/2 h-full flex flex-col justify-between py-12 bg-white ">
          <div className="flex items-center justify-center">
            <img src={logo} alt="" />
          </div>

          <div className="px-20 text-center ">
            <h2 className="font-semibold text-2xl mb-2">Sign Up</h2>
            <p className="text-sm text-gray-600 mb-10">
              Please provide your details to Create Free Account
            </p>
            <div className="mb-6 ">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-1 text-start"
              >
                Name
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm "
              />
            </div>
            <div className="mb-6 ">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-1 text-start"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email Address"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm "
              />
              <div className="absolute top-[-5px] bottom-0 right-[100px]  flex items-center ps-3.5 pointer-events-none">
                <svg
                  width="20"
                  height="17"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2443 0.760742H2.62996C2.02673 0.760742 1.4482 0.996873 1.02165 1.41719C0.595102 1.8375 0.355469 2.40757 0.355469 3.00199V10.4728C0.355469 11.0672 0.595102 11.6373 1.02165 12.0576C1.4482 12.4779 2.02673 12.714 2.62996 12.714H13.2443C13.8475 12.714 14.426 12.4779 14.8526 12.0576C15.2791 11.6373 15.5188 11.0672 15.5188 10.4728V3.00199C15.5188 2.40757 15.2791 1.8375 14.8526 1.41719C14.426 0.996873 13.8475 0.760742 13.2443 0.760742ZM13.2443 2.2549L8.3162 5.59436C8.20095 5.65993 8.07021 5.69445 7.93712 5.69445C7.80403 5.69445 7.67329 5.65993 7.55804 5.59436L2.62996 2.2549H13.2443Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-10">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-1 text-start"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
              <div className="absolute top-[190px] bottom-0 right-[100px]  flex items-center ps-3.5 pointer-events-none">
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5432 6.7019C15.8941 5.29417 14.9434 4.0464 13.7584 3.04701L15.7955 1.00994L14.8448 0.0585938L12.6324 2.269C11.4078 1.56067 10.0158 1.19342 8.60124 1.20545C3.56232 1.20545 1.24913 5.41193 0.659238 6.7019C0.580052 6.87477 0.539063 7.06268 0.539062 7.25282C0.539062 7.44296 0.580052 7.63087 0.659238 7.80374C1.30834 9.21147 2.25907 10.4592 3.44408 11.4586L1.40768 13.4957L2.35769 14.4457L4.57011 12.2353C5.79465 12.9436 7.18664 13.3109 8.60124 13.2988C13.6402 13.2988 15.9533 9.09236 16.5432 7.8024C16.6223 7.62972 16.6632 7.44205 16.6632 7.25215C16.6632 7.06225 16.6223 6.87457 16.5432 6.7019V6.7019ZM4.57011 7.25215C4.56883 6.51217 4.77161 5.78616 5.15614 5.15394C5.54067 4.52172 6.09206 4.00775 6.74972 3.66855C7.40737 3.32934 8.14581 3.17802 8.88388 3.23123C9.62194 3.28444 10.331 3.5401 10.9332 3.97013L9.95771 4.94567C9.54818 4.69869 9.07947 4.56707 8.60124 4.56473C7.88849 4.56473 7.20493 4.84786 6.70094 5.35185C6.19696 5.85584 5.91382 6.5394 5.91382 7.25215C5.91616 7.73038 6.04778 8.19909 6.29476 8.60862L5.31923 9.58415C4.83211 8.90413 4.57015 8.08864 4.57011 7.25215V7.25215ZM8.60124 11.2833C7.76474 11.2832 6.94926 11.0213 6.26923 10.5342L7.24476 9.55862C7.6543 9.8056 8.123 9.93723 8.60124 9.93957C9.31399 9.93957 9.99754 9.65643 10.5015 9.15244C11.0055 8.64845 11.2887 7.96489 11.2887 7.25215C11.2863 6.77391 11.1547 6.30521 10.9077 5.89567L11.8832 4.92014C12.3133 5.52234 12.5689 6.23144 12.6222 6.96951C12.6754 7.70757 12.524 8.44601 12.1848 9.10367C11.8456 9.76132 11.3317 10.3127 10.6994 10.6972C10.0672 11.0818 9.34122 11.2845 8.60124 11.2833V11.2833Z"
                    fill="#374957"
                  />
                </svg>
              </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md shadow">
              Sign in
            </button>
          </div>

          <div className="text-center text-sm pb-4">
            <p>
              Don't have an account?{' '}
              <a href="#" className="text-orange-500 hover:underline">
                SignIn
              </a>
            </p>
          </div>

          <div className="text-center text-white text-xs bg-gray-900 py-2">
            © 2023 Copyright reserved by Kalavriti Private Limited
          </div>
        </div>
      )}
    </div>
  );
}
