import React from 'react';
import {Button} from "@radix-ui/themes";
import SparklesText from "@/components/ui/sparkles-text";
import Link from 'next/link';

const Cover = () => {
  return (
    <section className="relative bg-gradient-to-r h-screen flex items-center justify-between px-16">
      {/* Left Side Text */}
      <div className="text-left max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Поступи в престижные школы НИШ, РФМШ, БИЛ вместе с <span className='text-primary-main'>Orken</span>
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Orken предоставляет большое количество бесплатных видео-уроков, материалов, пробных тестов и рекомендаций!
        </p>
       <Link href="/nis">
       <Button 
          variant="solid"
          size="4"
          className='hover:cursor-pointer'
        >
          Начать обучение в НИШ</Button>
        </Link>
      </div>

      <div className="w-1/2 flex justify-center">
        <img 
          src="/happy_ai_children.png" 
          alt="Orken Education" 
          className="object-cover rounded-3xl max-h-[500px]"
        />
      </div>
    </section>
  );
};

export default Cover;
