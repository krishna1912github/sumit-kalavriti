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
  console.log({spreadSecondary});
  return (
    <Link to={`/collections/${handle}`} prefetch="viewport">
      <section className="flex h-[70vh] align-item-center">
        <div className="w-4/12 p-4 text-center sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast bg-[#006466]">
          {heading?.value && (
            <Heading format as="h2" size="display" className="max-w-md py-4">
              Home Dear
            </Heading>
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
        <div className="w-10/12 h-[70vh]">
          <Image
            width={'100vw'}
            height={'100vh'}
            src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
            className="object-cover object-center h-[70vh]"
            alt={'banner'}
          />{' '}
        </div>
      </section>
    </Link>
  );
}

type SpreadMediaProps = {
  data: Media | MediaImage | MediaVideo;
  loading?: HTMLImageElement['loading'];
  sizes: string;
};

function SpreadMedia({data, loading, sizes}: SpreadMediaProps) {
  return (
    <MediaFile
      data={data}
      className="block object-cover w-full h-full"
      mediaOptions={{
        video: {
          controls: false,
          muted: true,
          loop: true,
          playsInline: true,
          autoPlay: true,
          previewImageOptions: {src: data.previewImage?.url ?? ''},
        },
        image: {
          loading,
          crop: 'center',
          sizes,
          alt: data.alt || '',
        },
      }}
    />
  );
}
