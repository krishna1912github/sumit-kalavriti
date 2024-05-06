import clsx from 'clsx';
import {MediaFile, Image} from '@shopify/hydrogen';
import type {
  MediaImage,
  Media,
  Video as MediaVideo,
} from '@shopify/hydrogen/storefront-api-types';

import type {CollectionContentFragment} from 'storefrontapi.generated';
import {Heading, Text} from '~/components/Text';
import {Link} from '~/components/Link';

type HeroProps = CollectionContentFragment & {
  height?: 'full';
  top?: boolean;
  loading?: HTMLImageElement['loading'];
};

/**
 * Hero component that renders metafields attached to collection resources
 **/
export function Hero({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  spreadSecondary,
  top,
}: HeroProps) {
  return (
    <Link to={`/collections/${handle}`} prefetch="viewport">
      <section className="flex h-[70vh] align-item-center">
        <div className="flex relative flex-col justify-center items-center w-4/12 p-4 text-center sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast bg-[#006466]">
          <div className="absolute top-0 bg-[#C30E29] w-full p-2">
            <p className="font-bold text-[38px]">Deal of the day</p>
          </div>
          {heading?.value && (
            <p className="py-4 text-[70px] text-white  italianno-font">
              Paintings
            </p>
          )}
          {byline?.value && (
            <Text format width="narrow" className="py-2" as="p" size="lead">
              Unique range of handmade specially crafted home decor products
            </Text>
          )}
          <button className="border border-dotted my-4 border-white bg-[#0C8481] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            20% off on every product
          </button>
          <button className="my-4 bg-[#fff] hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            20% off on every product
          </button>
        </div>
        <div className="w-10/12">
          <img
            src="/banner.png"
            alt="banner"
            className="object-cover w-full object-center h-[70vh]"
          />
        </div>
      </section>
    </Link>
  );
}
