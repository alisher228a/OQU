import Link from "next/link";
import { fetchSubjectById } from "../lib/data";

const NIS = async () => {
  const math = await fetchSubjectById("677a8ce506262591917c44fe") || {};
  const eng = await fetchSubjectById("677a8d0206262591917c44ff") || {};

  return (
    <section>
      <div className="flex justify-center items-center flex-col min-h-screen py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Выберите предмет для обучения
        </h1>
        <div className="mt-10 w-full max-w-3xl flex flex-row gap-4">
          <Link href={`nis/${math.id}`} className="w-full">
            <button
              className="bg-blue-500 text-white w-full py-20 rounded-lg text-2xl hover:bg-blue-600 transition duration-300">
              Математика
            </button>
          </Link>
          <Link href={`nis/${math.id}`} className="w-full">
            <button
              className="bg-orange-400 text-white w-full py-20 rounded-lg text-2xl hover:bg-orange-500 transition duration-300">
              Английский Язык
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NIS;
