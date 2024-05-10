

export const categoryProducts = () => {
  return (
    <div className="bg-red-0 h-52 w-full">
      <div className="mt-5 h-20 bg-indigo-200 text-center">Banner image</div>
      <div className="mt-4 flex-col bg-red-200">
        <div>Bread cums</div>
        <div className="flex justify-between gap-8">
          <div>showing results</div>
          <div className="flex flex-row">short by dropdown</div>
        </div>
        <div className="mt-5 border-t border-gray-500"></div>
      </div>

      <div className="mt-10 flex">
        <div className="w-1/4">
          <div className="flex flex-col gap-5">
            <div className="h-20 bg-yellow-100">
              <div className="flex flex-row justify-between">
                <div className="bg-green-200">filter</div>
                <div className="bg-green-200">filter</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="bg-yellow-200">filter 2</div>
                <div className="bg-yellow-200">filter 2</div>
              </div>
            </div>

            <div className="h-20 bg-blue-100">
              <div className="w-full">
                <div className="bg-green-200">Price</div>
                <div className="bg-yellow-200">Price-bar</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 bg-orange-200">
          <div>block1</div>
          <div>block2</div>
        </div>
      </div>
      <div className="mt-5 h-20 bg-indigo-200"></div>
    </div>
  );
};
