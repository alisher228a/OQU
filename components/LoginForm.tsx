"use client"
import Link from "next/link";
import { SetStateAction, useState } from "react";
import Notification from '../components/Notification';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/dashboard' });
    };


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const res = await signIn('credentials', {
                email, password, redirect:false
            });

            if (res.error){
                triggerNotification('Неверные учетные данные')
                return;
            }

            router.replace('/dashboard')
        } catch (error) {
            console.log(error)
        }
    };

    return (
    <div className="flex h-screen items-center justify-center bg-gray-50 mt-5">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-4xl font-bold text-center mb-8">Войти</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Почта
                </label>
                <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                placeholder="Введите ваш почту"
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
                className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                placeholder="Введите ваш пароль"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-4 text-lg rounded-xl hover:bg-blue-600 transition">
                Войти
            </button>
            </form>
            <div className="flex items-center justify-center space-x-2 mt-5 mb-5">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-lg font-semibold text-gray-600">ИЛИ</span>
            <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <button
                onClick={handleGoogleSignIn}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 text-lg rounded-xl flex items-center justify-center space-x-4 hover:border-gray-400 transition">
                <Image
                    src="/google.png"
                    alt="Фото для поста"
                    width={30}
                    height={30}
                  />
            <span>Войти с Google</span>
            </button>
            <p className="text-center text-lg text-gray-600 mt-6">
            Не имеется аккаунт?{' '}
            <Link href="/register" className="underline">
                Зарегистрироваться
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
        </div>)
        
};

export default LoginForm;