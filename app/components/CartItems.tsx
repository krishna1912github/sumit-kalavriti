import {Image} from '@shopify/hydrogen';

export function CartItem() {
  return (
    <section className="w-full">
      <div className="p-12">
        <div className="flex flex-wrap shadow w-full items-center justify-center p-4">
          <div className="w-full px-4">
            <p className="text-lg font-semiBold">My cart </p>
            <p className="text-[#50576B] text-sm my-2">Product</p>
          </div>
          <div className="flex w-full flex-wrap gap-4  p-4">
            <div className="w-full border-t border-gray-300"></div>
            <div className="w-full p-4 h-[28vh] flex gap-4 flex items-center">
              <Image
                width={'20vw'}
                height={'10vh'}
                src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
                className="object-cover object-center w-[10vw] h-[20vh]"
                alt={'banner'}
              />
              <div>
                <p className="">
                  boAt Rockerz 450 Bluetooth On Ear Headphones with Mic, Upto 15
                  Hours Playback, 40MM Drivers, Padded Ear Cushions, Integrated
                  Controls and Dual Modes(Luscious Black)
                </p>
                <p className="font-semibold text-gray-300">
                  Mrp:<s> $ 3000</s> Discount : (20%)
                </p>
                <p className="font-bold text-lg">Price: $ 2000</p>
                <p className="text-sm">Qty: 2</p>
              </div>
              <div className="flex gap-2 my-2 justify-start">
                <button className="px-3 h-6 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                  -
                </button>
                <p>3</p>
                <button className="px-3 h-6 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                  +
                </button>
                <button className="px-3 h-6 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                  dlt
                </button>
              </div>
            </div>
            <div className="my-2 w-full border-t border-gray-300"></div>
            <div className="w-full p-4 h-[28vh] flex gap-4 flex items-center">
              <Image
                width={'20vw'}
                height={'10vh'}
                src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
                className="object-cover object-center w-[10vw] h-[20vh]"
                alt={'banner'}
              />
              <div>
                <p>
                  boAt Rockerz 450 Bluetooth On Ear Headphones with Mic, Upto 15
                  Hours Playback, 40MM Drivers, Padded Ear Cushions, Integrated
                  Controls and Dual Modes(Luscious Black)
                </p>
                <p className="font-semibold text-gray-300">
                  Mrp:<s> $3000</s> Discount : (20%)
                </p>
                <p className="font-bold text-lg">Price: $ 2000</p>
                <p className="text-sm">Qty: 2</p>
              </div>
              <div className="flex gap-2 my-2 justify-start">
                <button className="px-3 h-6 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                  -
                </button>
                <p>3</p>
                <button className="px-3 h-6 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                  +
                </button>
                <button className="px-3 h-6 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                  dlt
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end flex-col items-end gap-2 p-4">
            <button className="w-1/4 font-semibold border-dashed border-2 border-gray-400 p-3 flex justify-between my-2">
              <p>Total</p>
              <p>$200</p>
            </button>
            <button className="w-1/5 p-3 bg-[#022753] text-white font-normal rounded ">
              Pay 1450
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
