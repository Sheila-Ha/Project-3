import { LogInSignUpMutation } from "./logIn-signUp-resolver.js";
import { TriggerMyMissionMutation } from "./trigger-my-mission-resolver.js";
import { FunFactQuery } from "./fun-fact-resolver.js";
import { LeaderBoardQuery } from "./leaderboard-resolver.js";
import { CurrentMissionQuery } from "./current-mission-resolver.js";
import { UpdateImageProfileUrl } from "./update-image-resolver.js";
import { UserProfileInfoQuery } from "./user-profile-resolver.js";
import { ChangePasswordMutation } from "./changePasswordResolver.js";
import { ChangeEmailMutation } from "./changeEmailResolver.js";
// import { ChangeLocationMutation } from "./changeLocationResolver.js";
import {
  User,
  Activities,
  Explore_Level,
  Mission_Activities,
  Mission_Types,
  Current_Mission,
} from "../models/index.js";

// Define the resolvers object
export const resolvers = {
  Query: {
    ...FunFactQuery,
    ...LeaderBoardQuery,
    ...CurrentMissionQuery,
    ...UserProfileInfoQuery,
    async findUsers() {
      return User.findAll();
    },

    async loginUser(parent, args, req) {
      return req.user;
    },

    async getAllExploreLevels() {
      return Explore_Level.findAll();
    },

    async getUserMissionActivities(parent, args) {
      return Mission_Activities.findAll();
    },

    async getAllMissionTypes() {
      return Mission_Types.findAll();
    },

    async getAllActivities() {
      return Activities.findAll();
    },

    async getAllMissionActivities() {
      return Mission_Activities.findAll();
    },

    async getUserMissionActivities(parent, { userId }) {
      return Mission_Activities.findAll({ userId: userId });
    },

    async getUserExploreLevel(parent, { id }) {
      return User.findOne({ id: id });
    },

    async getCurrentMission() {
      return Current_Mission.findAll();
    },
  },
// Define the Mutation object
  Mutation: {
    ...LogInSignUpMutation,
    ...TriggerMyMissionMutation,
    ...ChangePasswordMutation,
    ...ChangeEmailMutation,
    ...UpdateImageProfileUrl,
    //...ChangeLocationMutation,
    addActivity: async (parent, { name, description, missionTypeId }) => {
      // Create a new activity
      return Activities.create({ name, description, missionTypeId });
    },
    updateActivity: async (parent, { id, isComplete }) => {
      // Update the activity by its id
      await Activities.update(
        { isComplete: isComplete },
        { where: { id: id } }
      );
    },
    updateCurrentMission: async (parent, { id, isComplete }) => {
      // Update the current mission by its id
      await Current_Mission.update(
        { isComplete: isComplete },
        { where: { id: id } }
      );
    },
    deleteCurrentMission: async (parent, { id }) => {
      // Delete the current mission by its id
      return Current_Mission.destroy({ where: { id: id } });
    },
    updateUserLevel: async (parent, { id, exploreLevelId }) => {
      // Update the user's exploreLevelId
      await User.update(
        { exploreLevelId: exploreLevelId },
        { where: { id: id } }
      );
    },
    updateUserPoints: async (parent, { id, currentNumExpPoints }) => {
      // Update the user's currentNumExpPoints
      await User.update(
        { currentNumExpPoints: currentNumExpPoints },
        { where: { id: id } }
      );
    },
  },
};
