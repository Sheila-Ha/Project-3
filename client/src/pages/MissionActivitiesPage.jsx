import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USER_MISSION_BY_MISSION_ID,
  GET_USER_MISSION_ACTIVITIES,
} from "../graphql/query";
import { UPDATE_ACTIVITY, UPDATE_CURRENT_MISSION, DELETE_CURRENT_MISSION } from "../graphql/mutation/index.js";

function MissionActivitiesPage() {
  const { missionId } = useParams();

  const [updateActivity] = useMutation(UPDATE_ACTIVITY);
  const [updateMission] = useMutation(UPDATE_CURRENT_MISSION);
  const [deleteMission] = useMutation(DELETE_CURRENT_MISSION);
  const [activities, setActivities] = useState([]);
  const [missionStatus, setMissionStatus] = useState(false);
  const [saveResult, setSaveResult] = useState(null);

  // Get current mission by ID
  const { loading, error, data } = useQuery(GET_USER_MISSION_BY_MISSION_ID, {
    variables: { missionId: parseInt(missionId) },
  });
  const currentMission = data?.getCurrentMissionByMissionId;

  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(GET_USER_MISSION_ACTIVITIES, {
    variables: { missionId: parseInt(missionId) },
  });

  useEffect(() => {
    if (!loading && currentMission) {
      setMissionStatus(currentMission.isComplete);
    }
    if (!loading2 && data2) {
      setActivities(data2.getCurrentMissionActivities);
    }
  }, [loading, currentMission, loading2, data2]);

  if (loading || loading2) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (error2) return <p>Error : {error2.message}</p>;

  function handleCheckboxChange(event) {
    const activityId = event.target.name;
    const isChecked = event.target.checked;
    // Find the activity by ID and update the complete field
    setActivities((prevActivities) => {
      return prevActivities.map((activity) => {
        if (activity.id === activityId) {
          return { ...activity, isComplete: isChecked };
        } else {
          return activity;
        }
      });
    });
  }

  async function handleSaveClick() {
    try {
      // Update the activities
      activities.forEach(async (activity) => {
        await updateActivity({
          variables: {
            id: parseInt(activity.id),
            isComplete: Boolean(activity.isComplete),
          },
        });
      });
      // Update the mission isComplete field
      const isMissionComplete = activities.every((activity) => activity.isComplete);
      await updateMission({
        variables: {
          id: parseInt(currentMission.id),
          isComplete: isMissionComplete,
        },
      });
      setMissionStatus(isMissionComplete);
      setSaveResult("Data saved.");

      // After activities are saved, check to see if they are all checked off.
      var checkComplete = true;
      activities.forEach(async (activity) => {
        if(!(activity.isComplete)){
          checkComplete = false;
          return;
        } 
      });

      if (checkComplete)
        setSaveResult("Mission Complete! Congratulations!");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteClick() {
    if (window.confirm("Are you sure you want to delete this mission?")) {
      try {
        await deleteMission({
          variables: {
            id: parseInt(currentMission.id),
          },
        });
        // Go back to homepage
        window.location.href = "/";
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="flex flex-col h-screen gap-4 p-4 overflow-hidden">
      <div className="px-4">
        <h2 className="my-4">
          {currentMission.name} - {currentMission.points} points
        </h2>
        <p>{currentMission.description}</p>
        {missionStatus ? <p className="my-4 font-bold">MISSION COMPLETE!</p> : null}
        <ul>
          {activities?.map((activity) => (
            <li key={activity.id}>
              {/* // Display the checkbox and activity name */}
              <input
                type="checkbox"
                name={activity.id}
                id={activity.id}
                checked={activity.isComplete || false}
                onChange={handleCheckboxChange}
              />
              <span className="mx-2">
                {/* // Display the activity name and image */}
                <label htmlFor={activity.id}>
                  {activity.image && (
                    <img src={activity.image} alt={activity.name} />
                  )}
                  {activity.name}
                </label>
              </span>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="px-4 py-2 my-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 w-fit"
          onClick={handleSaveClick}
        >
          Save
        </button>
        <button
          type="submit"
          className="px-4 py-2 m-4 font-bold text-white bg-red-500 rounded hover:bg-red-700 w-fit"
          onClick={handleDeleteClick}
        >
          Delete Mission
        </button> <span className="pl-4 font-bold">{saveResult}</span>
        <p>
          <a href="/">&lt; Back to Home</a>
        </p>
      </div>
    </div>
  );
}
export default MissionActivitiesPage;
