import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

import Form from '../components/Form';

export default function Home() {
  const [imgUrl, setImgUrl] = useState('');

  return (
    <div>
      <Head>
        <title>OpenAI Generate Image</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <section className="showcase">
          <Form setImg={setImgUrl} />
        </section>

        {imgUrl && (
          <section className="image">
            <div className="image-container">
              <h2 className="msg" />
              <Image alt="" height={400} id="image" src={imgUrl} width={400} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
