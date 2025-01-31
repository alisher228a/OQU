// pages/api/units.js

import connectToDB from '@/app/lib/utils';
import Units from '@/app/lib/models';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Connect to the database
      await connectToDB();

      // Fetch all units from the database
      const units = await Units.find().sort({ createdAt: -1 });

      // Return units as a response
      res.status(200).json(units);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch units!" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
