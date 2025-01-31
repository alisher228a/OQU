"use client";

import React, { useState } from "react";
import {Button} from "@radix-ui/themes";
import Link from "next/link";

const sliderData = [
  {
    title: "НИШ",
    abbreviation: "Назарбаев Интеллектуальные Школы",
    description:
      "НИШ — это сеть образовательных учреждений, основанных по инициативе Первого Президента Казахстана. Цель школ НИШ — подготовить высококвалифицированных выпускников, способных стать лидерами в научной, технической и гуманитарной сферах.",
    points: [
      "Двухязычное обучение: Акцент на казахский, русский и английский языки.",
      "Углублённая подготовка: Программы фокусируются на математике, естественных науках и инженерии.",
      "Международный опыт: Использование учебных планов, основанных на международных стандартах.",
      "Современная инфраструктура: Высокотехнологичные лаборатории и ресурсы.",
    ],
    image: "/nis.jpg", 
    path_edu: "/nis",
    path_info: "/nis_info",
  },
  {
    title: "БИЛ",
    abbreviation: "Білім-Инновация Лицей",
    description:
      "БИЛ - лицей с акцентом на языки (английский и турецкий), академическую подготовку и воспитание. Готовит к международным экзаменам (SAT, IELTS). Развивает лидерские качества и дисциплину через внеклассные активности.",
    points: [
      "Основное внимание уделяется академической успеваемости, дисциплине и воспитанию.",
      "Активное участие в республиканских и международных олимпиадах по математике, физике, химии и биологии.",
      "Акцент на личностное развитие и лидерские качества.",
      "Организация внеклассных мероприятий, конкурсов и проектов для разностороннего развития учеников.",
    ],
    image: "/bil.png", 
    path_edu: "/bil",
    path_info: "/bil_info",
  },
  {
    title: "РФМШ",
    abbreviation: "Республиканская Физико-Математическая Школа",
    description:
      "РФМШ - школа с углубленным изучением математики, физики и информатики. Готовит учеников к олимпиадам и поступлению в топовые вузы. Отличается высоким уровнем преподавания и строгим отбором. Есть интернат для иногородних.",
    points: [
      "Специализируется на углубленном изучении математики, физики и информатики.",
      "Подготавливает учащихся к участию в олимпиадах и конкурсах по робототехнике",
      "Предоставляет интернат для иногородних учеников.",
      "Выпускники часто поступают в ведущие вузы Казахстана и мира.",
    ],
    image: "/physmath.jpg", 
    path_edu: "/physmath",
    path_info: "/physmath_info",
  },
];

const SliderBlock = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto relative">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {sliderData.map((item, index) => (
              <div key={index} className="min-w-full flex items-center">
                <div className="w-[500px] h-[350px] ml-8 mr-8">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <div className="w-[600px] pl-8">
                  <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
                  <h5 className="text-gray-500 mb-2">{item.abbreviation}</h5>
                  <p>{item.description}</p>
                  <br />
                  <h5>Основные особенности:</h5>
                  <ul className="list-decimal">
                    {item.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                  <br />
                  <Link
                    href={item.path_info}
                    className="relative inline-block text-primary-main group">
                    Узнать больше про {item.title}
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary-main scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                  <br /><br />
                  <div className="hover:cursor-pointer">
                    <a href={item.path_edu}>
                    <Button 
                    variant="solid"
                    size="4"
                    className="hover:cursor-pointer"
                  >
                    {`Начать обучение в ${item.title}`}
                    </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 z-10"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 z-10"
        >
          ❯
        </button>

        <div className="flex justify-center mt-6">
          {sliderData.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-2 ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SliderBlock;
