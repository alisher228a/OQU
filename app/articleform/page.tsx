"use client"

import { SetStateAction, useState } from "react";
import Notification from '../../components/Notification';
import { useRouter } from 'next/navigation';

const ArticleForm = () => {

    const [desc, setDesc] = useState("");
    const [explanation, setExplanation] = useState("");
    const [img, setImg] = useState<File | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const router = useRouter();
    
    const triggerNotification = (message: SetStateAction<string>) => {
        setNotificationMessage(message);
        setShowNotification(true);
    
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!desc || !explanation || !img) {
            triggerNotification('Необходимо заполнить все поля');
            return;
        }

        // Prepare FormData
        const data = new FormData();
        data.append('desc', desc);
        data.append('explanation', explanation);
        data.append('file', img);  // Ensure the file is added to the FormData

        try {
            const res = await fetch('/api/articleCreate', {
                method: 'POST',
                body: data, // No need to set Content-Type for FormData, browser handles it
            });

            if (res.ok) {
                router.push("/articles");
            } else {
                console.log("Post creation failed");
                triggerNotification('Ошибка при создании статьи');
            }
        } catch (error) {
            console.log("Error during creation:", error);
            triggerNotification('Ошибка при создании статьи');
        }
    };

    return (
        <div className="flex min-h-screen items-start justify-center bg-gray-100 mt-10">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 mt-[100px]">
                <h2 className="text-3xl font-bold text-center mb-6">Написать статью</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="desc" className="block text-lg font-medium text-gray-700">
                            Название
                        </label>
                        <input
                            onChange={(e) => setDesc(e.target.value)}
                            type="text"
                            id="desc"
                            className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            placeholder="Введите название статьи"
                        />
                    </div>
                    <div>
                        <label htmlFor="explanation" className="block text-lg font-medium text-gray-700">
                            Текст статьи
                        </label>
                        <textarea
                            onChange={(e) => setExplanation(e.target.value)}
                            id="description"
                            className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            placeholder="Введите текст статьи"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="img" className="block text-lg font-medium text-gray-700">
                            Фото статьи
                        </label>
                        <input
                            type="file"
                            id="img"
                            accept="image/*"
                            onChange={(e) => setImg(e.target.files?.[0] ?? null)}  // Ensure the file is selected
                            className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 text-lg rounded-xl hover:bg-blue-600 transition"
                    >
                        Загрузить
                    </button>
                </form>
            </div>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type="error"
                    onClose={() => setShowNotification(false)}
                />
            )}
        </div>
    );
};

export default ArticleForm;
