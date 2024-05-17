import {Image} from '@shopify/hydrogen';

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const [formData, customerAccessToken] = await Promise.all([
    request.formData(),
    // context.customerAccount.getAccessToken(),
  ]);

  const {action, inputs} = CartForm.getFormInput(formData);
  invariant(action, 'No cartAction defined');

  let status = 200;
  let result: CartQueryDataReturn;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate:
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
        // customerAccessToken,
      });
      break;
    default:
      invariant(false, `${action} cart action is not defined`);
  }

  /**
   * The Cart ID may change after each mutation. We need to update it each time in the session.
   */
  const cartId = result.cart.id;
  const headers = cart.setCartId(result.cart.id);

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string' && isLocalPath(redirectTo)) {
    status = 303;
    headers.set('Location', redirectTo);
  }

  const {cart: cartResult, errors, userErrors} = result;
  console.log('result: ', result.cart);


  headers.append('Set-Cookie', await context.session.commit());

  return json(
    {
      cart: cartResult,
      userErrors,
      errors,
    },
    {status, headers},
  );
}

export async function loader({context}: LoaderFunctionArgs) {
  const {cart} = context;
  return json(await cart.get());
}
export function Checkout() {
  return (
    <section className="w-full">
      <div className="p-12">
        <div className="flex flex-wrap shadow w-full items-center justify-center">
          <div className="flex w-full lg:w-1/2 flex-wrap gap-6  p-4">
            <div className="w-full p-4 h-[28vh] flex gap-4">
              <Image
                width={'35vw'}
                height={'10vh'}
                src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
                className="object-cover object-center w-[20vw]"
                alt={'banner'}
              />
              <div>
                <p className="">
                  boAt Rockerz 450 Bluetooth On Ear Headphones with Mic, Upto 15
                  Hours Playback, 40MM Drivers, Padded Ear Cushions, Integrated
                  Controls and Dual Modes(Luscious Black)
                </p>
                <p className="font-bold text-lg text-gray-300">
                  <s>$ 3000</s>
                </p>
                <p className="font-bold text-lg">$ 2000</p>
                <div className="flex gap-2 my-2 justify-start">
                  <button className="px-3 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                    -
                  </button>
                  <p>3</p>
                  <button className="px-3 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full p-4 h-[28vh] flex gap-4">
              <Image
                width={'35vw'}
                height={'10vh'}
                src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
                className="object-cover object-center w-[20vw]"
                alt={'banner'}
              />
              <div>
                <p className="">
                  boAt Rockerz 450 Bluetooth On Ear Headphones with Mic, Upto 15
                  Hours Playback, 40MM Drivers, Padded Ear Cushions, Integrated
                  Controls and Dual Modes(Luscious Black)
                </p>
                <p className="font-bold text-lg text-gray-300">
                  <s>$ 3000</s>
                </p>
                <p className="font-bold text-lg">$ 2000</p>
                <div className="flex gap-2 my-2 justify-start">
                  <button className="px-3 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                    -
                  </button>
                  <p>3</p>
                  <button className="px-3 bg-[#CBCBCB] rounded bg-white border-[0.5px] border-black">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-l border-gray-300 mx-3 h-[50vh]"></div>
          <div className="flex lg:w-1/3 p-4 border-black">
            <div className="w-full">
              <p className="font-semibold my-3">Gift Card / Discount code</p>
              <div className="flex w-full">
                <div className="bg-[#E3FCEC] flex items-center rounded w-full justify-center text-[#A5A4A4]">
                  54312344
                </div>
                <button className="p-3 bg-[#022753] text-white font-normal rounded ">
                  Apply
                </button>
              </div>
              <div className="p-2 text-[#4A5568]">
                <div className="flex justify-between my-2">
                  <p>Cart Total</p>
                  <p>$1223</p>
                </div>
                <div className="flex justify-between my-2">
                  <p>Discount</p>
                  <p>$1223</p>
                </div>
                <div className="flex justify-between my-2">
                  <p>Price</p>
                  <p>$3000</p>
                </div>
                <div className="flex justify-between my-2">
                  <p>Coupon</p>
                  <p>$200</p>
                </div>
                <div className="flex justify-between my-2">
                  <p>Tax</p>
                  <p>$200</p>
                </div>
                <div className="flex justify-between my-2">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="my-2 border-t border-gray-300"></div>
                <div className="bg-[#9EDDB5] border border-gray-300 text-center p-2 rounded">
                  <p className="text-[#0A8637 text-sm">
                    You saved 750 on this order
                  </p>
                </div>
                <div className="flex text-lg font-bold justify-between my-2">
                  <p>Total</p>
                  <p>$ 399</p>
                </div>
                <button className="w-full p-3 bg-[#022753] text-white font-normal rounded ">
                  Pay 1450
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
