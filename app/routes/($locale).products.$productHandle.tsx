import {useRef, Suspense, useState} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {
  defer,
  type MetaArgs,
  redirect,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData, Await, useNavigate} from '@remix-run/react';
import {
  getSeoMeta,
  Money,
  ShopPayButton,
  VariantSelector,
  getSelectedProductOptions,
  UNSTABLE_Analytics as Analytics,
  Image,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import type {
  ProductQuery,
  ProductVariantFragmentFragment,
} from 'storefrontapi.generated';

import {Heading, Section, Text} from '~/components/Text';
import {Link} from '~/components/Link';
import {Button} from '~/components/Button';
import {AddToCartButton} from '~/components/AddToCartButton';
import {Skeleton} from '~/components/Skeleton';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {ProductGallery} from '~/components/ProductGallery';
import {IconCaret, IconCheck, IconClose} from '~/components/Icon';
import {ImageGallery} from '~/components/ImageGallery';
import Carousel from '~/components/Carouse';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import type {Storefront} from '~/lib/type';
import {routeHeaders} from '~/data/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import productdetails from '~/components/productdeatils';
export const headers = routeHeaders;

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  if (!product.selectedVariant) {
    throw redirectToFirstVariant({product, request});
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deferred query resolves, the UI will update.
  const variants = context.storefront.query(VARIANTS_QUERY, {
    variables: {
      handle: productHandle,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  const recommended = getRecommendedProducts(context.storefront, product.id);

  // TODO: firstVariant is never used because we will always have a selectedVariant due to redirect
  // Investigate if we can avoid the redirect for product pages with no search params for first variant
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  return defer({
    variants,
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

function redirectToFirstVariant({
  product,
  request,
}: {
  product: ProductQuery['product'];
  request: Request;
}) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const firstVariant = product!.variants.nodes[0];
  for (const option of firstVariant.selectedOptions) {
    searchParams.set(option.name, option.value);
  }

  url.search = searchParams.toString();

  return redirect(url.href.replace(url.origin, ''), 302);
}

export default function Product() {
  const {product, shop, recommended, variants, storeDomain} =
    useLoaderData<typeof loader>();
  const {media, title, vendor, descriptionHtml} = product;
  console.log('product: ', media.nodes);
  const previewImage =media.nodes.map((item)=>{
    console.log('item: ', item.previewImage);
    return item.previewImage
  })
  console.log('dd: ', previewImage);

  const {shippingPolicy, refundPolicy} = shop;
  console.log('refundPolicy: ', refundPolicy);
  const [activeTab, setActiveTab] = useState('profile');
  const selectedVariant = product?.selectedVariant!;

  const isOutOfStock = !selectedVariant?.availableForSale;

  const openTab = (tabName: any) => {
    setActiveTab(tabName);
  };
  let slides = [
    "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
    "https://wallpapercave.com/wp/wp3386769.jpg",
    "https://wallpaperaccess.com/full/809523.jpg",
    "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
  ];
  return (
    <>
   <div className="w-[60%] m-auto pt-11">
      <Carousel slides={slides} />
    </div>


      <div className="mt-64">
        <div className="md:flex md:flex-row gap-8 flex flex-col bg-green mx-auto justify-center items-center w-[80%] ">
          <ImageGallery images={previewImage} />

          <div className="w-[60%]">
            <div className="w-[75%]">
              <div>
                <h1 className="text-2xl font-bold text-gray-800  text-justify px-1">
                  {title}
                </h1>
                {descriptionHtml && (
                  <div className="text-gray-600 mt-4">
                    <div
                      className="prose dark:prose-invert"
                      dangerouslySetInnerHTML={{__html: descriptionHtml}}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-row gap-4 justify-items-start mt-4">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <div className="text-blue-800">
                  <h1>2 reviews</h1>
                </div>
              </div>
              <div className="flex flex-row gap-4 justify-items-start mt-4">
                <span className="text-lg font-medium text-gray-900 line-through dark:text-white">
                  ₹1500
                </span>
                <span className="ms-3 text-4xl font-medium text-green-700 dark:text-white">
                  {product.selectedVariant?.price.amount}
                </span>
              </div>
              <div className="flex flex-row gap-4 justify-items-start mt-4">
                <span className="bg-blue-100 text-blue-800 text-xs w-20 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  -12% off
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center mt-4 py-2">
                <div className="space-x-2">
                  <label
                    htmlFor="quantity-input"
                    className="text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                </div>
                <div>
                  <button
                    type="button"
                    id="decrement-button"
                    className="bg-gray-200 space-x-2 w-12 hover:bg-gray-300 text-gray-800 font-semibold p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    -
                  </button>

                  <input
                    type="text"
                    id="quantity-input"
                    className="text-center w-12 border-none text-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    value="1"
                  />

                  <button
                    type="button"
                    id="increment-button"
                    className="bg-gray-200 w-12 hover:bg-gray-300 text-gray-800 font-semibold p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="md:hidden block">
                <h1>jeikd</h1>
              </div>
              <div className="md:block hidden">
                {refundPolicy && (
                  <div className="md:flex md:flex-row  flex  flex-col gap-4 mt-4 w-[100%]">
                    <div className="flex flex-row gap-2 justify-center items-center w-[25%]  ">
                      <div className="gap-4">
                        <svg
                          width="37"
                          height="37"
                          viewBox="0 0 37 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="18.5849"
                            cy="18.5019"
                            r="18.3095"
                            fill="#E3F9EB"
                          />
                          <g clipPath="url(#clip0_4095_29686)">
                            <path
                              d="M22.4542 14.6302C22.4542 13.604 22.0465 12.6198 21.3209 11.8941C20.5952 11.1684 19.611 10.7607 18.5847 10.7607C17.5584 10.7607 16.5742 11.1684 15.8486 11.8941C15.1229 12.6198 14.7152 13.604 14.7152 14.6302H10.8457V24.304C10.8457 24.8171 11.0495 25.3092 11.4124 25.6721C11.7752 26.0349 12.2673 26.2387 12.7805 26.2387H24.389C24.9021 26.2387 25.3942 26.0349 25.757 25.6721C26.1199 25.3092 26.3237 24.8171 26.3237 24.304V14.6302H22.4542ZM18.5847 12.0506C19.2689 12.0506 19.925 12.3224 20.4088 12.8061C20.8926 13.2899 21.1644 13.9461 21.1644 14.6302H16.005C16.005 13.9461 16.2768 13.2899 16.7606 12.8061C17.2444 12.3224 17.9005 12.0506 18.5847 12.0506Z"
                              fill="#0A8637"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4095_29686">
                              <rect
                                width="15.478"
                                height="15.478"
                                fill="white"
                                transform="translate(10.8457 10.7607)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="">
                        <div className="font-semibold">
                          <h1>Free shiping</h1>
                        </div>
                        <div className="font-light">
                          <h1>Start from 300</h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <div className="gap-4">
                        <svg
                          width="38"
                          height="37"
                          viewBox="0 0 38 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="18.9755"
                            cy="18.5927"
                            r="18.3095"
                            fill="#FFE5D5"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.003 12.915C12.64 12.915 12.3457 13.2093 12.3457 13.5723V18.1031H12.3544H12.3632H12.3721H12.3812H12.3905H12.3999H12.4094H12.4191H12.429H12.439H12.4491H12.4594H12.4698H12.4804H12.4911H12.502H12.513H12.5242H12.5355H12.5469H12.5585H12.5703H12.5821H12.5942H12.6063H12.6186H12.631H12.6436H12.6563H12.6692H12.6822H12.6953H12.7086H12.722H12.7355H12.7492H12.763H12.7769H12.791H12.8052H12.8195H12.834H12.8486H12.8633H12.8782H12.8932H12.9083H12.9236H12.939H12.9545H12.9701H12.9859H13.0018H13.0178H13.034H13.0502H13.0666H13.0831H13.0998H13.1166H13.1335H13.1505H13.1676H13.1849H13.2022H13.2197H13.2374H13.2551H13.273H13.2909H13.309H13.3273H13.3456H13.364H13.3826H13.4013H13.4201H13.439H13.458H13.4771H13.4964H13.5158H13.5352H13.5548H13.5745H13.5943H13.6143H13.6343H13.6544H13.6747H13.695H13.7155H13.7361H13.7568H13.7775H13.7984H13.8194H13.8405H13.8617H13.8831H13.9045H13.926H13.9476H13.9693H13.9912H14.0131H14.0351H14.0572H14.0795H14.1018H14.1242H14.1467H14.1694H14.1921H14.2149H14.2378H14.2608H14.2839H14.3071H14.3304H14.3538H14.3773H14.4008H14.4245H14.4482H14.4721H14.496H14.5201H14.5442H14.5684H14.5927H14.6171H14.6415H14.6661H14.6907H14.7155H14.7403H14.7652H14.7902H14.8153H14.8404H14.8657H14.891H14.9164H14.9419H14.9675H14.9931H15.0188H15.0447H15.0706L15.0965 18.1031H15.1226H15.1487H15.1749H15.2012H15.2276H15.254H15.2805H15.3071H15.3338H15.3605H15.3873H15.4142H15.4412H15.4682H15.4953H15.5225H15.5497H15.577H15.6044H15.6319H15.6594H15.687H15.7146H15.7424H15.7702H15.798H15.826H15.854H15.882H15.9101H15.9383H15.9666H15.9949H16.0233H16.0517H16.0802H16.1088H16.1374H16.1661H16.1948H16.2236H16.2525H16.2814H16.3104H16.3394H16.3685H16.3976H16.4268H16.4561H16.4854H16.5148H16.5442H16.5737H16.6032H16.6328H16.6624H16.6921H16.7218H16.7516H16.7815H16.8113H16.8413H16.8713H16.9013H16.9314H16.9615H16.9917H17.0219H17.0521H17.0824H17.1128H17.1432H17.1736H17.2041H17.2346H17.2652H17.2958H17.3265H17.3572H17.3879H17.4187H17.4495H17.4803H17.5112H17.5422H17.5731H17.6041H17.6352H17.6662H17.6973H17.7285H17.7597H17.7909H17.8221H17.8534H17.8847H17.9161H17.9474H17.9788H18.0103H18.0417H18.0732H18.1048H18.1363H18.1679H18.1995H18.2311H18.2628H18.2945H18.3262H18.3579H18.3897H18.4215H18.4533H18.4851H18.517H18.5489H18.5808H18.6127H18.6446H18.6766H18.7086H18.7406H18.7726H18.8047H18.8367H18.8688H18.9009H18.933H18.9651H18.9973H19.0294H19.0616H19.0938H19.126H19.1582H19.1904H19.2226H19.2549H19.2871H19.3194H19.3517H19.384H19.4163H19.4486H19.4809H19.5132H19.5455H19.5779H19.6102H19.6426H19.6749H19.7073H19.7396H19.772H19.8044H19.8367H19.8691H19.9015H19.9339H19.9662H19.9986H20.031H20.0634H20.0957H20.1281H20.1605H20.1929H20.2252H20.2576H20.29H20.3223H20.3547H20.387H20.4193H20.4517H20.484H20.5163L20.5486 18.1031H20.5809H20.6132H20.6455H20.6778H20.71H20.7423H20.7745H20.8067H20.839H20.8712H20.9033H20.9355H20.9677H20.9998H21.032H21.0641H21.0962H21.1283H21.1603H21.1924H21.2244H21.2564H21.2884H21.3204H21.3523H21.3843H21.4162H21.4481H21.4799H21.5118H21.5436H21.5754H21.6072H21.6389H21.6706H21.7023H21.734H21.7656H21.7973H21.8289H21.8604H21.8919H21.9235H21.9549H21.9864H22.0178H22.0492H22.0805H22.1119H22.1431H22.1744H22.2056H22.2368H22.268H22.2991H22.3302H22.3612H22.3923H22.4232H22.4542H22.4851H22.5159H22.5468H22.5776H22.6083H22.639H22.6697H22.7003H22.7309H22.7614H22.7919H22.8224H22.8528H22.8832H22.9135H22.9438H22.974H23.0042H23.0343H23.0644H23.0945H23.1245H23.1544H23.1843H23.2142H23.244H23.2737H23.3034H23.3331H23.3627H23.3922H23.4217H23.4512H23.4806H23.5099H23.5392H23.5684H23.5976H23.6267H23.6557H23.6847H23.7137H23.7426H23.7714H23.8001H23.8288H23.8575H23.8861H23.9146H23.9431H23.9715H23.9998H24.0281H24.0563H24.0844H24.1125H24.1405H24.1685H24.1964H24.2242H24.2519H24.2796H24.3072H24.3348H24.3623H24.3897H24.417H24.4443H24.4715H24.4986H24.5257H24.5527H24.5796H24.6064H24.6332H24.6599H24.6865H24.713H24.7395H24.7659H24.7922H24.8184H24.8446H24.8707H24.8967H24.9226H24.9485H24.9742H24.9999H25.0255H25.051H25.0765H25.1018H25.1271H25.1523H25.1774H25.2024H25.2273H25.2522H25.277H25.3016H25.3262H25.3507H25.3752H25.3995H25.4237H25.4479H25.4719H25.4959H25.5198H25.5436H25.5673H25.5909H25.6065V13.5723C25.6065 13.2093 25.3122 12.915 24.9492 12.915H13.003ZM25.6065 18.7604H25.5909H25.5673H25.5436H25.5198H25.4959H25.4719H25.4479H25.4237H25.3995H25.3752H25.3507H25.3262H25.3016H25.277H25.2522H25.2273H25.2024H25.1774H25.1523H25.1271H25.1018H25.0765H25.051H25.0255H24.9999H24.9742H24.9485H24.9226H24.8967H24.8707H24.8446H24.8184H24.7922H24.7659H24.7395H24.713H24.6865H24.6599H24.6332H24.6064H24.5796H24.5527H24.5257H24.4986H24.4715H24.4443H24.417H24.3897H24.3623H24.3348H24.3072H24.2796H24.2519H24.2242H24.1964H24.1685H24.1405H24.1125H24.0844H24.0563H24.0281H23.9998H23.9715H23.9431H23.9146H23.8861H23.8575H23.8288H23.8001H23.7714H23.7426H23.7137H23.6847H23.6557H23.6267H23.5976H23.5684H23.5392H23.5099H23.4806H23.4512H23.4217H23.3922H23.3627H23.3331H23.3034H23.2737H23.244H23.2142H23.1843H23.1544H23.1245H23.0945H23.0644H23.0343H23.0042H22.974H22.9438H22.9135H22.8832H22.8528H22.8224H22.7919H22.7614H22.7309H22.7003H22.6697H22.639H22.6083H22.5776H22.5468H22.5159H22.4851H22.4542H22.4232H22.3923H22.3612H22.3302H22.2991H22.268H22.2368H22.2056H22.1744H22.1431H22.1119H22.0805H22.0492H22.0178H21.9864H21.9549H21.9235H21.8919H21.8604H21.8289H21.7973H21.7656H21.734H21.7023H21.6706H21.6389H21.6072H21.5754H21.5436H21.5118H21.4799H21.4481H21.4162H21.3843H21.3523H21.3204H21.2884H21.2564H21.2244H21.1924H21.1603H21.1283H21.0962H21.0641H21.032H20.9998H20.9677H20.9355H20.9033H20.8712H20.839H20.8067H20.7745H20.7423H20.71H20.6778H20.6455H20.6132H20.5809H20.5486L20.5163 18.7604H20.484H20.4517H20.4193H20.387H20.3547H20.3223H20.29H20.2576H20.2252H20.1929H20.1605H20.1281H20.0957H20.0634H20.031H19.9986H19.9662H19.9339H19.9015H19.8691H19.8367H19.8044H19.772H19.7396H19.7073H19.6749H19.6426H19.6102H19.5779H19.5455H19.5132H19.4809H19.4486H19.4163H19.384H19.3517H19.3194H19.2871H19.2549H19.2226H19.1904H19.1582H19.126H19.0938H19.0616H19.0294H18.9973H18.9651H18.933H18.9009H18.8688H18.8367H18.8047H18.7726H18.7406H18.7086H18.6766H18.6446H18.6127H18.5808H18.5489H18.517H18.4851H18.4533H18.4215H18.3897H18.3579H18.3262H18.2945H18.2628H18.2311H18.1995H18.1679H18.1363H18.1048H18.0732H18.0417H18.0103H17.9788H17.9474H17.9161H17.8847H17.8534H17.8221H17.7909H17.7597H17.7285H17.6973H17.6662H17.6352H17.6041H17.5731H17.5422H17.5112H17.4803H17.4495H17.4187H17.3879H17.3572H17.3265H17.2958H17.2652H17.2346H17.2041H17.1736H17.1432H17.1128H17.0824H17.0521H17.0219H16.9917H16.9615H16.9314H16.9013H16.8713H16.8413H16.8113H16.7815H16.7516H16.7218H16.6921H16.6624H16.6328H16.6032H16.5737H16.5442H16.5148H16.4854H16.4561H16.4268H16.3976H16.3685H16.3394H16.3104H16.2814H16.2525H16.2236H16.1948H16.1661H16.1374H16.1088H16.0802H16.0517H16.0233H15.9949H15.9666H15.9383H15.9101H15.882H15.854H15.826H15.798H15.7702H15.7424H15.7146H15.687H15.6594H15.6319H15.6044H15.577H15.5497H15.5225H15.4953H15.4682H15.4412H15.4142H15.3873H15.3605H15.3338H15.3071H15.2805H15.254H15.2276H15.2012H15.1749H15.1487H15.1226H15.0965L15.0706 18.7604H15.0447H15.0188H14.9931H14.9675H14.9419H14.9164H14.891H14.8657H14.8404H14.8153H14.7902H14.7652H14.7403H14.7155H14.6907H14.6661H14.6415H14.6171H14.5927H14.5684H14.5442H14.5201H14.496H14.4721H14.4482H14.4245H14.4008H14.3773H14.3538H14.3304H14.3071H14.2839H14.2608H14.2378H14.2149H14.1921H14.1694H14.1467H14.1242H14.1018H14.0795H14.0572H14.0351H14.0131H13.9912H13.9693H13.9476H13.926H13.9045H13.8831H13.8617H13.8405H13.8194H13.7984H13.7775H13.7568H13.7361H13.7155H13.695H13.6747H13.6544H13.6343H13.6143H13.5943H13.5745H13.5548H13.5352H13.5158H13.4964H13.4771H13.458H13.439H13.4201H13.4013H13.3826H13.364H13.3456H13.3273H13.309H13.2909H13.273H13.2551H13.2374H13.2197H13.2022H13.1849H13.1676H13.1505H13.1335H13.1166H13.0998H13.0831H13.0666H13.0502H13.034H13.0178H13.0018H12.9859H12.9701H12.9545H12.939H12.9236H12.9083H12.8932H12.8782H12.8633H12.8486H12.834H12.8195H12.8052H12.791H12.7769H12.763H12.7492H12.7355H12.722H12.7086H12.6953H12.6822H12.6692H12.6563H12.6436H12.631H12.6186H12.6063H12.5942H12.5821H12.5703H12.5585H12.5469H12.5355H12.5242H12.513H12.502H12.4911H12.4804H12.4698H12.4594H12.4491H12.439H12.429H12.4191H12.4094H12.3999H12.3905H12.3812H12.3721H12.3632H12.3544H12.3457V25.5186C12.3457 25.8816 12.64 26.1758 13.003 26.1758H24.9492C25.3122 26.1758 25.6065 25.8816 25.6065 25.5186V18.7604Z"
                            fill="#FF6100"
                          />
                          <rect
                            x="16.0469"
                            y="11.0156"
                            width="1.74738"
                            height="3.8034"
                            rx="0.873691"
                            fill="#FAB083"
                          />
                          <rect
                            x="20.1582"
                            y="11.0156"
                            width="1.74738"
                            height="3.8034"
                            rx="0.873691"
                            fill="#FAB083"
                          />
                        </svg>
                      </div>
                      <div className="px-3">
                        <div className="font-semibold">
                          <h1>15 days return</h1>
                        </div>
                        <div className="font-light">
                          <h1>Return within 15 days</h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <div className="gap-4">
                        <svg
                          width="37"
                          height="38"
                          viewBox="0 0 37 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="18.6591"
                            cy="18.789"
                            r="18.3095"
                            fill="#DBEBFF"
                          />
                          <g clipPath="url(#clip0_4095_29704)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.5528 12.0926L20.4528 12.7663C20.6989 12.9505 20.958 13.0448 21.265 13.0619L22.3875 13.1244C23.0596 13.1617 23.6055 13.6198 23.759 14.2752L24.0155 15.3698C24.0856 15.6692 24.2235 15.908 24.4477 16.1184L25.2674 16.8877C25.7582 17.3484 25.882 18.0502 25.5783 18.651L25.0711 19.6543C24.9324 19.9287 24.8846 20.2002 24.921 20.5055L25.0545 21.6218C25.1344 22.2902 24.7781 22.9073 24.1593 23.1723L23.1258 23.6149C22.8432 23.736 22.632 23.9132 22.4637 24.1705L21.8484 25.1114C21.4799 25.6748 20.8103 25.9185 20.1659 25.7237L19.0898 25.3985C18.7955 25.3096 18.5198 25.3096 18.2254 25.3985L17.1493 25.7237C16.5049 25.9185 15.8353 25.6748 15.4669 25.1114L14.8516 24.1705C14.6832 23.9132 14.472 23.736 14.1894 23.6149L13.1559 23.1723C12.5371 22.9073 12.1808 22.2901 12.2607 21.6217L12.3941 20.5054C12.4306 20.2001 12.3828 19.9286 12.2441 19.6542L11.7369 18.6509C11.4332 18.0502 11.557 17.3484 12.0478 16.8877L12.8675 16.1183C13.0917 15.9079 13.2296 15.6691 13.2997 15.3698L13.5561 14.2752C13.7096 13.6197 14.2555 13.1617 14.9277 13.1243L16.0501 13.0619C16.3571 13.0448 16.6162 12.9505 16.8624 12.7662L17.7624 12.0925C18.3013 11.6892 19.0139 11.6892 19.5528 12.0926Z"
                              fill="#2276DA"
                            />
                            <path
                              d="M21.9054 22.0365C23.6987 20.2431 23.6986 17.3356 21.9053 15.5423C20.1119 13.749 17.2044 13.7491 15.4111 15.5424C13.6178 17.3358 13.6179 20.2433 15.4112 22.0366C17.2046 23.8299 20.1121 23.8298 21.9054 22.0365Z"
                              fill="#2276DA"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M18.0835 19.1753L20.209 17.0286C20.4606 16.7745 20.8711 16.7738 21.1244 17.0258C21.3778 17.2777 21.3786 17.687 21.1272 17.9406C20.2653 18.8105 19.4092 19.6862 18.5434 20.5521C18.2902 20.8052 17.8796 20.8052 17.6264 20.5521L16.1899 19.1155C15.9367 18.8624 15.9367 18.4518 16.1899 18.1986C16.443 17.9455 16.8536 17.9455 17.1068 18.1986L18.0835 19.1753Z"
                              fill="#ECEFF1"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4095_29704">
                              <rect
                                width="15.1154"
                                height="15.1154"
                                fill="white"
                                transform="translate(11.0996 11.2314)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="px-3">
                        <div className="font-semibold">
                          <h1>Quailty</h1>
                        </div>
                        <div className="font-light">
                          <h1>Quality assurance</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-4 justify-items-start mt-6">
                {isOutOfStock ? (
                  <button
                    type="button"
                    className="text-gray-500 bg-gray-200 border border-gray-300 cursor-not-allowed hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-none text-sm py-2.5 px-5 me-2 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    disabled
                  >
                    Sold out
                  </button>
                ) : (
                  <>
                    <AddToCartButton
                      lines={[
                        {
                          merchandiseId: selectedVariant.id!,
                          quantity: 1,
                        },
                      ]}
                      variant="primary"
                      data-test="add-to-cart"
                      className="text-blue-700 bg-white border border-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-none text-sm py-2.5 px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <Text
                        as="span"
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Add Cart</span> <span>·</span>{' '}
                      </Text>
                    </AddToCartButton>

                    {!isOutOfStock && (
                      <ShopPayButton
                        width="120%"
                        variantIds={[selectedVariant?.id!]}
                        storeDomain={storeDomain}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" mt-4 mb-4 border-b border-gray-200 dark:border-gray-700 w-[80%] ml-10">
            <ul
              className="flex flex-wrap -mb-px text-lg font-medium text-center"
              id="default-tab"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4  rounded-t-lg ${
                    activeTab === 'profile'
                      ? 'bg-white-100 border-blue-500  text-blue-900 '
                      : ' text-gray-400'
                  }`}
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected={activeTab === 'profile'}
                  onClick={() => openTab('profile')}
                >
                  Description
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'dashboard'
                      ? 'bg-white-100 border-blue-500  text-blue-900'
                      : ' text-gray-400'
                  }`}
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected={activeTab === 'dashboard'}
                  onClick={() => openTab('dashboard')}
                >
                  Dashboard
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4  rounded-t-lg ${
                    activeTab === 'review'
                      ? 'bg-white-100 border-blue-500  text-blue-900 '
                      : ' text-gray-400'
                  }`}
                  id="review-tab"
                  data-tabs-target="#review"
                  type="button"
                  role="tab"
                  aria-controls="review"
                  aria-selected={activeTab === 'review'}
                  onClick={() => openTab('review')}
                >
                  Review
                </button>
              </li>
            </ul>
          </div>
          <div id="default-tab-content">
            <div
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
                activeTab !== 'profile' ? 'hidden' : ''
              }`}
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <p className=" w-[80%] text-base text-gray-500 dark:text-gray-400 ml-10  flex flex-wrap justify-start">
                . PROFILEE PROFILEE PROFILEE will toggle the visibility of this
                one for the next. The tab JavaScript swaps classes to control
                the content visibility and styling. . PROFILEE another tab will
                toggle the visibility of this one for the next. The tab
                JavaScript swaps classes to control the content visibility and
                styling. . Clicking another tab will toggle the visibility of
                this one for the next. The tab JavaScript swaps classes to
                control the content visibility and styling.
              </p>
            </div>
            <div
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
                activeTab !== 'dashboard' ? 'hidden' : ''
              }`}
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <p className=" w-[80%] text-base text-gray-500 dark:text-gray-400 ml-10  flex flex-wrap justify-start">
                . dashboard dashboard dashboard dashboard toggle the visibility
                of this one for the next. The tab JavaScript swaps classes to
                control the content visibility and styling. . Clicking another
                tab will toggle the visibility of this one for the next. The tab
                JavaScript swaps classes to control the content visibility and
                styling. . Clicking another tab will toggle the visibility of
                this one for the next. The tab JavaScript swaps classes to
                control the content visibility and styling.
              </p>
            </div>
            <div
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
                activeTab !== 'review' ? 'hidden' : ''
              }`}
              id="review"
              role="tabpanel"
              aria-labelledby="review-tab"
            >
              <p className=" w-[80%] text-base text-gray-500 dark:text-gray-400 ml-10  flex flex-wrap justify-start">
                . review review review review review the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling. . Clicking another tab will
                toggle the visibility of this one for the next. The tab
                JavaScript swaps classes to control the content visibility and
                styling. . Clicking another tab will toggle the visibility of
                this one for the next. The tab JavaScript swaps classes to
                control the content visibility and styling.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<Skeleton className="h-32" />}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommended}
        >
          {(products) => (
            <ProductSwimlane title="Related Products" products={products} />
          )}
        </Await>
      </Suspense>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: product.selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: product.selectedVariant?.id || '',
              variantTitle: product.selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}


const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const VARIANTS_QUERY = `#graphql
  query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

async function getRecommendedProducts(
  storefront: Storefront,
  productId: string,
) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  mergedProducts.splice(originalProduct, 1);

  return {nodes: mergedProducts};
}
