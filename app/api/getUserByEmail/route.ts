import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/app/lib/utils';
import { Users } from "@/app/lib/models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await connectToDB();
            const { email } = req.body;

            const user = await Users.findOne({ where: { email } });

            if (user) {
                res.status(200).json({ user });
                console.log(user.id);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error fetching user", error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
