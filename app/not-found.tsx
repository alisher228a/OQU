// File: pages/404.js
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">🚧</h1>
        <p className="mt-4 text-lg text-gray-600">
          Упс! Страницы либо не существует, либо идут работы над ее добавлением!
        </p>
        <Link href="/" className="mt-6 inline-block rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 transition duration-200">
            Домой
        </Link>
      </div>
    </div>
  );
}
