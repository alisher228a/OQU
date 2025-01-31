import { fetchUnitsBySubjectId, fetchPostsByUnitId, fetchSubjectById } from "@/app/lib/data";
import Link from "next/link";

type Unit = {
  _id: string;
  name: string;
};

type Post = {
  title: string;
  desc: string; 
};

const Nis = async ({ params }: { params: { subjectId: string, unitid: string } } ) => {
  const { subjectId, unitid } = params;
  console.log(unitid);
  
  // Fetch the subject and its units
  const subject = await fetchSubjectById(subjectId);
  const units: Unit[] = await fetchUnitsBySubjectId(subject._id);

  // Fetch posts for each unit
  const postsData: { [key: string]: Post[] } = {};
  for (const unit of units) {
    const posts = await fetchPostsByUnitId(unit.id); // Use _id for fetching posts
    postsData[unit.id] = posts; 
  }

  // Find the specific unit based on unitId
  const selectedUnit = units.find((unit) => unit.id === unitid);

  if (!selectedUnit) {
    return <p>Unit not found</p>; // If no unit is found for the provided unitId
  }

  return (
    <section className="font-sans flex-col flex items-center overflow-hidden py-24">
      <div className="max-container px-4 w-full">
        <div className="flex max-h-full overflow-y-scroll">
          <div className="w-1/4 bg-white p-4">
            <h2 className="text-xl font-bold">{subject.name}</h2>
            <p className="text-gray-500 mt-3">{units.length} Юнитов</p>
            <ul className="mt-6 space-y-6 text-lg">
              {Array.isArray(units) && units.length > 0 ? (
                units.map((unit) => (
                  <Link href={`/nis/${subject._id}/${unit._id}`} key={unit._id}>
                    <div
                      className={`hover:bg-gray-100 py-3 px-4 mb-2 rounded-lg hover:cursor-pointer ${unit.id === unitid ? 'bg-primary-main hover:bg-primary-main text-white' : ''}`}
                    >
                      <li className="font-medium">{unit.name}</li>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Нету юнитов</p>
              )}
            </ul>
          </div>
          <div className="w-3/4 p-6 flex flex-col gap-4 flex-1 bg-gray-50 rounded-2xl">
            {/* Render only the selected unit's card */}
            <div className="space-y-4">
              <UnitCard
                title={selectedUnit.name}
                mastery="0%"
                posts={postsData[selectedUnit._id]} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type UnitCardProps = {
  title: string;
  mastery: string;
  posts?: Post[]; 
  nextUp?: boolean;
};

const UnitCard: React.FC<UnitCardProps> = ({ title, mastery, posts, nextUp }) => {
  return (
    <div className={`mb-4 p-4 rounded-lg border shadow-sm ${nextUp ? "bg-blue-50" : "bg-white"}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-500 text-sm">Unit mastery: {mastery}</p>
      </div>
      <ul className="mt-2 space-y-1">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <li key={index} className="text-gray-700 text-sm">
              <Link className="hover:underline" href={`/articles/${post.id}`}>{post.desc}</Link> 
            </li>
          ))
        ) : (
          <p>Нету уроков</p>
        )}
      </ul>
    </div>
  );
};

export default Nis;
