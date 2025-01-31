import React from "react";

const features = [
  {
    title: "Персонализированное обучение",
    description:
      "Каждый ученик занимается в своём собственном темпе, сначала восполняя пробелы в понимании материала, а затем углубляя свои знания.",
    icon: "/google.png", 
  },
  {
    title: "Проверенные материалы",
    description:
      "Библиотека состоит из созданных экспертами уроков по математике, естественным наукам, истории и другим предметам. Все они бесплатны для учащихся и учителей.",
    icon: "/google.png", 
  },
  {
    title: "Инструменты для расширения возможностей учителей",
    description:
      "Orken поможет учителям выявить пробелы в знаниях учеников и составить индивидуальный план для каждого учащегося.",
    icon: "/google.png",
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-20">
          В чём особенность <span className="text-primary-main">Orken?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6">
                <img src={feature.icon} alt={feature.title} className="w-full" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
