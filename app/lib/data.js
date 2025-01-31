import { connectToDB } from "./utils";
import { Posts, Units, Subjects, Users } from "./models";
import { ObjectId } from 'mongodb';

export const fetchPostsBy6 = async () => {
    try {
      await connectToDB();
      const posts = await Posts.find()
        .sort({ updatedAt: -1 })
        .limit(6); 
  
      return posts;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch posts!");
    }
  };

export const fetchPosts = async () => {
    try {
        await connectToDB();
        const posts = await Posts.find().sort({ createdAt: -1 });

        return posts;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const fetchUnits = async () => {
  try {
      await connectToDB();
      const units = await Units.find();
      console.log(units);

      return units;
  } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch units!");
  }
};

export const fetchUnitsBySubjectId = async (subjectId) => {
  try {
      await connectToDB();

      const objectId = new ObjectId(subjectId); 
      const units = await Units.find({ subjectId: objectId });

      return units;
  } catch (err) {
      console.error("Error fetching units:", err);
      throw new Error("Failed to fetch units!");
  }
};

export const fetchSubjectById = async (id) => {
  try {
      await connectToDB();

      const subject = await Subjects.findById(id);

      return subject;
  } catch (err) {
      console.error("Error fetching units:", err);
      throw new Error("Failed to fetch units!");
  }
};

export const fetchPostsByUnitId = async ( unitId ) => {
  try {
      await connectToDB();

      const objectId = new ObjectId(unitId); 
      const posts = await Posts.find({ unitId: objectId });

      return posts;
  } catch (err) {
      console.error("Error fetching units:", err);
      throw new Error("Failed to fetch units!");
  }
};


export const fetchPostById = async (id) => {
  try {
      const post = await Posts.findById(id);

      if (!post) {
          throw new Error(`No Post found with id: ${id}`);
      }

      return post;
  } catch (error) {
      console.error("Error fetching post by ID:", error);
      return null; 
  }
};

export const fetchUnitById = async (id) => {
    try {
        const unit = await Units.findById(id);
  
        if (!unit) {
            throw new Error(`No unit found with id: ${id}`);
        }
  
        return unit;
    } catch (error) {
        console.error("Error fetching unit by ID:", error);
        return null; 
    }
  };