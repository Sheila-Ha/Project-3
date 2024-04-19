import { useQuery } from "@apollo/client";
import { FIND_USERS } from "../graphql/query";

export default function Profile() {
  const { loading, error } = useQuery(FIND_USERS);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen">Error: {error.message}</div>;

  // Temporary hard-coded data. TODO: Replace with actual user data
  const user = {
    id: 1,
    name: "OliveLoaf23",
    level: 8,
    avatar: "https://picsum.photos/200",
    badges: ["Newcomer 👋", "Adventurer 🌄", "Explorer 🔭"],
    bio: "Lover of nature and all things outdoors.",
    joinDate: "2021-04-22",
    missionsCompleted: 236,
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="relative">
						<img
							className="w-32 h-32 mb-4 rounded-full"
							src={user.avatar}
							alt={`${user.name}'s avatar`}
						/>
            {/* Can later update this to reflect status */}
            <span className="absolute bottom-6 right-3 block h-6 w-6 rounded-full ring-2 ring-white bg-green-400"></span>
          </div>
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <div className="text-center mb-4">
            <p className="text-gray-700 font-medium">Level: {user.level}</p>
            <p className="text-gray-500 text-sm">Joined: {user.joinDate}</p>
            <p className="text-gray-500 text-sm">
              Missions Completed: {user.missionsCompleted}
            </p>
          </div>
          <div className="w-full">
            <h2 className="text-lg font-bold text-left w-full">Badges</h2>
            <div className="flex justify-start flex-wrap">
              {user.badges.map((badge, index) => (
                <span
                  key={index}
                  className="bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold m-1 shadow-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg w-full mt-4 shadow-inner">
            <h2 className="text-lg font-bold mb-2">Bio</h2>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}