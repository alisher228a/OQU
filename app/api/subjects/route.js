import { Subjects } from '@/app/lib/models';
import { connectToDB } from '@/app/lib/utils';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectToDB();

    const subject = await Subjects.findById(id);

    console.log(subject);

    if (!subject) {
      return res.status(404).json({ error: `Subject with ID ${id} not found` });
    }

    return res.status(200).json(subject);
  } catch (error) {
    console.error('Error fetching subject:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
