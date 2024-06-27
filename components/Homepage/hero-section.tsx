import Link from 'next/link';
import styles from '@/app/styles.module.css';
import { getHomePage } from '@/lib/shopify/queries/homepage';

export default async function HeroSection() {
  const data = await getHomePage();
  const homepage = data.metaobjects.nodes[0].fields.reverse();

  return (
    <section>
      <div className="h-screen w-screen">
        <div className="relative h-[61%] w-full ">
          <div className="absolute top-0 h-full w-full">
            <video
              autoPlay
              loop
              muted
              style={{
                objectFit: 'cover',
                zIndex: -1,
                objectPosition: 'center',
                pointerEvents: 'none'
              }}
              width="100%"
              height="100%"
              controls
              preload="none"
              className="video-noControlPanel h-full"
            >
              <source src={homepage[0].reference.sources[0].url} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="mx-auto my-10 flex max-w-[15rem] flex-col items-center gap-5 text-center">
          <h1 className="text-5xl font-bold">{homepage[1].value}</h1>
          <p className="text-lg">{homepage[2].value}</p>
          <Link href="#" className={`${styles.buttonBlack} block w-fit`}>
            Shop all
          </Link>
        </div>
      </div>
    </section>
  );
}
