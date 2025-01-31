import Image from 'next/image';
import React from 'react';
import { fetchPostById, fetchUnitById } from '@/app/lib/data';
import { StarIcon, UserIcon } from '@heroicons/react/24/solid';

const PostDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const post = await fetchPostById(id);
  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Пост не найден
      </div>
    );
  }
  const post_explanation = post.explanation;

  post.views = (post.views || 0) + 1;
  await post.save();

  const unit = await fetchUnitById(post.unitId);

  return (
    <section className="max-w-screen-lg mx-auto px-4 my-[115px]">
      <div className="grid gap-10 items-center">
        <div className="relative w-full h-64 md:h-96">
            <Image
            src={post.img}
            alt={post.desc}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            className="rounded-lg"
            />
        </div>
        </div>
        <div className="flex mt-5">
          <h1 className="text-2xl md:text-4xl font-bold text-left">
            {post.desc}
          </h1>
        </div>
        <p className='text-lg text-gray-500 mt-5 hover:underline hover:cursor-pointer w-max '>
          {unit.name || 'Loading...'}
        </p>
      <div className="text-gray-700 text-base md:text-lg">
        {typeof post_explanation === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: post_explanation }} />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: post_explanation.join('<br>'),
            }}
          />
        )}
      </div>
      <div className="flex sm:flex-row flex-wrap justify-between items-center mt-6 border-t pt-6 text-gray-500 text-sm md:text-base">
        <p>{new Date(post.updatedAt).toLocaleDateString('ru-RU')}</p>
        <div className="flex items-center">
          <p>{post.views} просмотров</p>
        </div>
      </div>
    </section>
  );
};

export const dynamicParams = true;

export default PostDetails;
