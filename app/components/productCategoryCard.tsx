import {Image} from '@shopify/hydrogen';

import type {HomepageFeaturedCollectionsQuery} from 'storefrontapi.generated';
import {Heading, Section} from '~/components/Text';
import {Grid} from '~/components/Grid';
import {Link} from '~/components/Link';

type FeaturedCollectionsProps = HomepageFeaturedCollectionsQuery & {
  title?: string;
  [key: string]: any;
};

export function ProductCategoryCards({
  collections,
  title = 'Collections',
  ...props
}: FeaturedCollectionsProps) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections) return null;

  const collectionsWithImage = collections.nodes.filter((item) => item.image);

  return (
    <div className="text-center overflow-hidden ">
      <div className="flex flex-wrap gap-2 ">
        {collectionsWithImage.map((collection) => (
          <Link
            key={collection.id}
            to={`/collections/${collection.handle}`}
            className="flex justify-center"
          >
            <div className="text-center m-4">
              {collection?.image && (
                <div className="overflow-hidden w-40 h-40 mb-2">
                  <Image
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    sizes="(max-width: 32em) 100vw, 33vw"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <p className="text-sm font-bold">Madhubani</p>
              <p className="text-xs font-bold text-[#A1A1A1] ">Madhubani</p>
            </div>
          </Link>
        ))}
        {collectionsWithImage.map((collection) => (
          <Link
            key={collection.id}
            to={`/collections/${collection.handle}`}
            className="flex justify-center"
          >
            <div className="text-center m-4">
              {collection?.image && (
                <div className="overflow-hidden w-40 h-40 mb-2">
                  <Image
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    sizes="(max-width: 32em) 100vw, 33vw"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <p className="text-sm font-bold">Madhubani</p>
              <p className="text-xs text-[#A1A1A1] font-bold">Madhubani</p>
            </div>
          </Link>
        ))}
      </div>
      <button className="text-center font-bold text-blue-600 my-4">
        Explore More
      </button>
    </div>
  );
}
