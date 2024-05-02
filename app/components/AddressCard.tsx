export function AddressCard() {
  return (
    <section className="w-full">
      <div className="p-12">
        <div className="shadow flex flex-wrap gap-6 h-[40vh] items-center p-4">
          <div className="w-[20vw] p-4 h-[28vh] bg-[#F3F9FF] border-[0.5px] shadow">
            <p className="font-bold">Home</p>
            <p className="font-semibold">Sumit sharma</p>
            <p className="font-normal">Amit gram gumaniwala</p>
            <p className="font-normal">picode: 249204</p>
            <p className="font-normal">mobile: 8126273523</p>
            <div className="flex items-center gap-2 p-4 justify-center">
              <button className="px-8 text-blue rounded bg-white border-[0.5px] py-1 border-black">
                Edit
              </button>
              <button className="px-8 text-blue rounded bg-white border-[0.5px] py-1 border-black">
                Select
              </button>
            </div>
          </div>
          <div className="w-[20vw] p-4 h-[28vh] bg-[#F3F9FF] border-[0.5px] shadow">
            <p className="font-bold">Home</p>
            <p className="font-semibold">Sumit sharma</p>
            <p className="font-normal">Amit gram gumaniwala</p>
            <p className="font-normal">picode: 249204</p>
            <p className="font-normal">mobile: 8126273523</p>
            <div className="flex items-center gap-2 p-4 justify-center">
              <button className="px-8 text-blue rounded bg-white border-[0.5px] py-1 border-black">
                Edit
              </button>
              <button className="px-8 text-blue rounded bg-white border-[0.5px] py-1 border-black">
                Select
              </button>
            </div>
          </div>
          <div className="flex w-[20vw] p-4 border-dashed  h-[28vh] bg-[#F3F9FF]  border-black border-[0.5px] shadow  justify-center">
            <button className="text-blue-600 font-bold">
              + Add new Address
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
