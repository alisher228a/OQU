"use client"

import Link from "next/link";
import { SetStateAction, useState } from "react";
import Notification from '../components/Notification';
import { useRouter } from 'next/navigation';

const UserForm = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordcheck, setPasswordCheck] = useState("");
    const [image, setImage] = useState<File | null>(null);
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

    const regex_special = /[^A-Za-z0-9]/;
    const regex_upper = /[A-Z]/;

    // Validate form fields before submitting
    if (!name || !email || !password || !passwordcheck) {
        triggerNotification('Необходимо заполнить все поля');
        return;
    }
    if (password !== passwordcheck) {
        triggerNotification('Пароли не совпадают');
        return;
    }
    if (password.length < 6) {
        triggerNotification('Пароль должен содержать минимум 6 символов');
        return;
    }
    if (!regex_special.test(password)) {
        triggerNotification('Пароль должен содержать специальные символы (!@#$ и тд.)');
        return;
    }
    if (!regex_upper.test(password)) {
        triggerNotification('Пароль должен содержать прописные буквы');
        return;
    }

    // Check if image is selected before appending to FormData
    if (!image) {
        triggerNotification('Необходимо загрузить изображение');
        return;
    }

    // Prepare FormData with user input
    const data = new FormData();
    data.append('name', name);
    data.append('surname', surname);
    data.append('email', email);
    data.append('password', password);
    data.append('file', image);  // Ensure the file is correctly added

    try {
        // Check if the email already exists
        const resUserExists = await fetch('/api/userExists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();

        if (user) {
            triggerNotification('Пользователь с такой почтой уже существует');
            return;
        }

        // Make the registration request
        const res = await fetch('/api/register', {
            method: "POST",
            body: data,
        });

        const dataResponse = await res.json();
        console.log("Registration response:", dataResponse);

        if (res.ok) {
            router.push("/dashboard");
        } else {
            triggerNotification(dataResponse.message || 'Ошибка регистрации');
            console.log("User registration failed:", dataResponse.message);
        }

    } catch (error) {
        console.log("Error during registration:", error);
        triggerNotification('Ошибка при регистрации');
    }
};


    return (
        <div className="flex min-h-screen items-start justify-center bg-gray-50 mt-5 pb-10">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 mt-[100px]">
                <h2 className="text-3xl font-bold text-center mb-6">Регистрация</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                            Имя
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            placeholder="Введите ваше имя"
                        />
                    </div>
                    <div>
                        <label htmlFor="surname" className="block text-lg font-medium text-gray-700">
                            Фамилия
                        </label>
                        <input
                            onChange={(e) => setSurname(e.target.value)}
                            type="text"
                            id="surname"
                            className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            placeholder="Введите вашу фамилию"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                            Почта
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            placeholder="Введите вашу почту"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                            Пароль
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            placeholder="Придумайте пароль"
                        />
                    </div>
                    <div>
                        <label htmlFor="password_check" className="block text-lg font-medium text-gray-700">
                            Повторите пароль
                        </label>
                        <input
                            onChange={(e) => setPasswordCheck(e.target.value)}
                            type="password"
                            id="password_check"
                            className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            placeholder="Напишите пароль еще раз"
                        />
                    </div>
                    <div className="flex flex-col items-left space-y-4">
                        <div className="relative">
                            <input
                                type="file"
                                id="img"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                                className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 text-lg rounded-xl hover:bg-blue-600 transition"
                    >
                        Зарегистрироваться
                    </button>
                </form>
                <p className="text-center text-lg text-gray-600 mt-5">
                    Уже есть аккаунт?{' '}
                    <Link href="/login" className="underline">
                        Войти
                    </Link>
                </p>
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

export default UserForm;
