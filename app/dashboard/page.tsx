"use client";

import Button from "@/components/Button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="max-w-screen-lg mx-auto px-4 pt-32 h-[570px]">
      <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <img
            src={session?.user?.image}
            alt="User Avatar"
            className="h-24 w-24 rounded-full mr-6"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-3">
              Добро пожаловать, <span className="text-primary-main">{session?.user?.name}</span>!
            </h1>
            <p className="text-gray-500">{session?.user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600"
        >
          Выйти
        </button>
      </div>

      <main className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Информация о пользователе</h2>
        <div className="text-gray-700 space-y-4">
          <div className="flex items-center">
            <span className="font-medium w-32">Имя:</span>
            <span>{session?.user?.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-32">Почта:</span>
            <span>{session?.user?.email}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
