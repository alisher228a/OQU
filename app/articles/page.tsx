import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchUnitById } from '@/app/lib/data';

const Posts = async () => {
  const postsList = await fetchPosts();

  const fetchUnitsForPosts = async (posts: any[]) => {
    const unitsMap = {};
    for (const post of posts) {
      if (post.unitId) {
        const unit = await fetchUnitById(post.unitId);
        unitsMap[post.id] = unit?.name || 'No unit available';
      }
    }
    return unitsMap;
  };

  const unitsMap = await fetchUnitsForPosts(postsList);

  return (
    <section className="font-sans flex-col flex items-center overflow-hidden py-20">
      <div className="max-container px-4 w-full">
        <br />
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(postsList) && postsList.length > 0 ? (
            postsList.map((postItem) => (
              <div
                key={postItem.id}
                className="p-0 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-[300px] w-full">
                  <Image
                    src={postItem.img.startsWith('/') ? postItem.img : `${postItem.img}`}
                    alt="Фото для поста"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-5 flex flex-col">
                  <p className="text-sm text-gray-500 mb-2">
                    {unitsMap[postItem.id] || 'Loading...'}
                  </p>
                  <p className="text-lg flex-1">
                    <a
                      href={`/articles/${postItem.id}`}
                      className="hover:underline"
                    >
                      {postItem.desc}
                    </a>
                  </p>
                </div>
                <div className="flex justify-between items-center p-5 rounded-b-lg border-t">
                  <div className="text-sm text-gray-500">
                    {new Date(postItem.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="ml-2">{postItem.views} просмотров</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Статей нет</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Posts;
