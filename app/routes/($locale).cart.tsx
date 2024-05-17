// import {
//   defer,
//   type MetaArgs,
//   type LoaderFunctionArgs,
// } from '@shopify/remix-oxygen';
// import {Suspense} from 'react';
// import {Await, useLoaderData} from '@remix-run/react';

import {CartItem} from '~/components/CartItems';
// import {ProductSwimlane} from '~/components/ProductSwimlane';
// import {seoPayload} from '~/lib/seo.server';
// import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';

// export async function loader({params, context}: LoaderFunctionArgs) {
//   const {language, country} = context.storefront.i18n;

//   if (
//     params.locale &&
//     params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
//   ) {
//     // If the locale URL param is defined, yet we still are on `EN-US`
//     // the the locale param must be invalid, send to the 404 page
//     throw new Response(null, {status: 404});
//   }

//   const {shop, hero} = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
//     variables: {handle: 'freestyle'},
//   });

//   const seo = seoPayload.home();

//   return defer({
//     shop,
//     primaryHero: hero,
//     // These different queries are separated to illustrate how 3rd party content
//     // fetching can be optimized for both above and below the fold.
//     featuredProducts: context.storefront.query(
//       HOMEPAGE_FEATURED_PRODUCTS_QUERY,
//       {
//         variables: {
//           /**
//            * Country and language properties are automatically injected
//            * into all queries. Passing them is unnecessary unless you
//            * want to override them from the following default:
//            */
//           country,
//           language,
//         },
//       },
//     ),
//     secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
//       variables: {
//         handle: 'backcountry',
//         country,
//         language,
//       },
//     }),
//     featuredCollections: context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
//       variables: {
//         country,
//         language,
//       },
//     }),
//     tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
//       variables: {
//         handle: 'winter-2022',
//         country,
//         language,
//       },
//     }),
//     seo,
//   });
// }

// export default function CartPage() {
//   const {
//     primaryHero,
//     secondaryHero,
//     tertiaryHero,
//     featuredCollections,
//     featuredProducts,
//   } = useLoaderData<typeof loader>();
//   return (
//     <>
//       <CartItem />
//       {featuredProducts && (
//         <Suspense>
//           <Await resolve={featuredProducts}>
//             {({products}) => {
//               if (!products?.nodes) return <></>;
//               return (
//                 <ProductSwimlane
//                   products={products}
//                   title="Featured Products"
//                   count={4}
//                 />
//               );
//             }}
//           </Await>
//         </Suspense>
//       )}
//     </>
//   );
// }

// const COLLECTION_CONTENT_FRAGMENT = `#graphql
//       fragment CollectionContent on Collection {
//         id
//         handle
//         title
//         descriptionHtml
//         heading: metafield(namespace: "hero", key: "title") {
//           value
//         }
//         byline: metafield(namespace: "hero", key: "byline") {
//           value
//         }
//         cta: metafield(namespace: "hero", key: "cta") {
//           value
//         }
//         spread: metafield(namespace: "hero", key: "spread") {
//           reference {
//             ...Media
//           }
//         }
//         spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
//           reference {
//             ...Media
//           }
//         }
//       }
//       ${MEDIA_FRAGMENT}
//     ` as const;

// const HOMEPAGE_SEO_QUERY = `#graphql
//       query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
//       @inContext(country: $country, language: $language) {
//         hero: collection(handle: $handle) {
//           ...CollectionContent
//         }
//         shop {
//           name
//           description
//         }
//       }
//       ${COLLECTION_CONTENT_FRAGMENT}
//     ` as const;

// const COLLECTION_HERO_QUERY = `#graphql
//       query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
//       @inContext(country: $country, language: $language) {
//         hero: collection(handle: $handle) {
//           ...CollectionContent
//         }
//       }
//       ${COLLECTION_CONTENT_FRAGMENT}
//     ` as const;

// // @see: https://shopify.dev/api/storefront/current/queries/products
// export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
//       query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
//       @inContext(country: $country, language: $language) {
//         products(first: 8) {
//           nodes {
//             ...ProductCard
//           }
//         }
//       }
//       ${PRODUCT_CARD_FRAGMENT}
//     ` as const;

// // @see: https://shopify.dev/api/storefront/current/queries/collections
// export const FEATURED_COLLECTIONS_QUERY = `#graphql
//       query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
//       @inContext(country: $country, language: $language) {
//         collections(
//           first: 4,
//           sortKey: UPDATED_AT
//         ) {
//           nodes {
//             id
//             title
//             handle
//             image {
//               altText
//               width
//               height
//               url
//             }
//           }
//         }
//       }
//     ` as const;

import {Await} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
} from '@shopify/remix-oxygen';
import {
  CartForm,
  type CartQueryDataReturn,
  UNSTABLE_Analytics as Analytics,
} from '@shopify/hydrogen';

import {isLocalPath} from '~/lib/utils';
import {Cart} from '~/components/Cart';
import {useRootLoaderData} from '~/root';

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const [formData, customerAccessToken] = await Promise.all([
    request.formData(),
    context.customerAccount.getAccessToken(),
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

export default function CartRoute() {
  const rootData = useRootLoaderData();
  console.log('rootData: ', rootData);
  // @todo: finish on a separate PR
  return (
    <>
      <div>
        <Await resolve={rootData?.cart}>
          {(cart) => <Cart layout="page" cart={cart} />}
        </Await>
      </div>
      <Analytics.CartView />
    </>
  );
}
