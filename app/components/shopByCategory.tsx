import clsx from 'clsx';
import {Image} from '@shopify/hydrogen';

import type {CollectionContentFragment} from 'storefrontapi.generated';
import {Heading, Text} from '~/components/Text';
import {Link} from '~/components/Link';

import {ProductCategoryCards} from './productCategoryCard';
type HeroProps = CollectionContentFragment & {
  height?: 'full';
  top?: boolean;
  loading?: HTMLImageElement['loading'];
};

const object = {
  nodes: [
    {
      id: 'gid://shopify/Collection/276668186680',
      title: 'Freestyle Collection',
      handle: 'freestyle',
      image: {
        altText:
          'A snowboarder stands atop a snowy mountain holding his snowboard with the back facing the camera. The snowboard artwork reads Hydrogen, in a script font.',
        width: 2500,
        height: 3155,
        url: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/collections/image_95.png?v=1655330932',
      },
    },
    {
      id: 'gid://shopify/Collection/387214442552',
      title: 'Backcountry Collection',
      handle: 'backcountry',
      image: {
        altText:
          'A skier hikes up a mountain through the snow with skis over their shoulder.',
        width: 2500,
        height: 2500,
        url: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/collections/full.png?v=1654902705',
      },
    },
    {
      id: 'gid://shopify/Collection/387216703544',
      title: 'Thermals and Layers',
      handle: 'thermals-and-layers',
      image: {
        altText: null,
        width: 1368,
        height: 1368,
        url: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/collections/Thermals_and_Layers_9788d424-97c0-48ad-bf93-d41a1f668d33.png?v=1654901598',
      },
    },
    {
      id: 'gid://shopify/Collection/387216769080',
      title: 'Insulated and Puffy Jackets',
      handle: 'insulated-and-puffy-jackets',
      image: {
        altText: null,
        width: 1368,
        height: 1368,
        url: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/collections/Puffys_and_Jackets_74a42540-4d17-406c-85b8-1ae93656957c.png?v=1654901592',
      },
    },
  ],
};
export function ShopByCategory() {
  return (
    <Link to={`/collections/`} prefetch="viewport">
      <section className="mt-8  p-4">
        <p className="text-[40px] font-bold my-6">Shop by category</p>
        <div className="flex align-item-center">
          <div className=" p-4 w-4/12  text-center sm:px-8 md:px-12  text-contrast">
            <div
              style={{
                background:
                  'linear-gradient(204.79deg, #BAD3B8 22.04%, #DCF5E2 90.53%)',
              }}
              className="p-6 "
            >
              <p className="text-normal text-black font-semibold my-6">
                Shop for wide range of unique collections of handmade products
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="rounded-full overflow-hidden w-20 h-20 md:w-32 md:h-32 lg:w-30 lg:h-30">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
                    alt="banner"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="rounded-full overflow-hidden w-20 h-20 md:w-32 md:h-32 lg:w-30 lg:h-30">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
                    alt="banner"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="rounded-full overflow-hidden w-20 h-20 md:w-32 md:h-32 lg:w-30 lg:h-30">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
                    alt="banner"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="rounded-full overflow-hidden w-20 h-20 md:w-32 md:h-32 lg:w-30 lg:h-30">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
                    alt="banner"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-10/12">
            <ProductCategoryCards collections={object} />
          </div>
        </div>
      </section>
    </Link>
  );
}
