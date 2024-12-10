import { Types } from "mongoose";
import { connectDB, mongoClient } from "../config/connectDB";
import Discussion from "../model/Discussion";
import Room from "../model/Room";
import User from "../model/User";
import { discussions, users, rooms } from "./constants";

const seed = async (destroy: boolean) => {
  try {
    await connectDB();

    await User.deleteMany();
    await Room.deleteMany();
    await Discussion.deleteMany();
    if (destroy) return console.log("all data cleaned-up successfully.");
    // user creation
    const createdUsers = await User.insertMany(users);
    console.log("user seeded successfully.");

    // room creation
    const createdRooms = await Room.insertMany(rooms);
    console.log("rooms seeded successfully.");

    // discussion creation
    const createdDiscussion = await Discussion.insertMany(discussions);
    console.log("discussions seeded successfully.");

    /*
     * connecting users, rooms, and discussions with each other
     * WARN: Highly coupled
     */

    console.log("connecting users, rooms, and discussions with each other.");
    // associating rooms 1,2,3 to user1 & user2
    (createdUsers[0].rooms as Types.ObjectId[]).push(createdRooms[0]._id);
    (createdUsers[0].rooms as Types.ObjectId[]).push(createdRooms[1]._id);
    (createdUsers[1].rooms as Types.ObjectId[]).push(createdRooms[2]._id);

    // associating admins to corresponding rooms
    createdRooms[0].admin = createdUsers[0]._id;
    createdRooms[1].admin = createdUsers[0]._id;
    createdRooms[2].admin = createdUsers[1]._id;

    // adding participents
    (createdRooms[0].participents as Types.ObjectId[]).push(
      createdUsers[0]._id,
    );
    (createdRooms[1].participents as Types.ObjectId[]).push(
      createdUsers[0]._id,
    );
    (createdRooms[2].participents as Types.ObjectId[]).push(
      createdUsers[1]._id,
    );

    // associating discussion to each room
    createdRooms[0].discussion = createdDiscussion[0]._id;
    createdRooms[1].discussion = createdDiscussion[1]._id;
    createdRooms[2].discussion = createdDiscussion[2]._id;

    // associating sender to each message
    createdDiscussion[0].chat[0].sender = createdUsers[0]._id;
    createdDiscussion[0].chat[1].sender = createdUsers[0]._id;
    createdDiscussion[1].chat[0].sender = createdUsers[0]._id;
    createdDiscussion[1].chat[1].sender = createdUsers[0]._id;
    createdDiscussion[2].chat[0].sender = createdUsers[1]._id;

    // associating room_id to discussion
    createdDiscussion[0].room = createdRooms[0]._id;
    createdDiscussion[1].room = createdRooms[1]._id;
    createdDiscussion[2].room = createdRooms[2]._id;

    // associating admin_id to discussion
    createdDiscussion[0].admin = createdUsers[0]._id;
    createdDiscussion[1].admin = createdUsers[0]._id;
    createdDiscussion[2].admin = createdUsers[1]._id;

    await Promise.all([
      createdUsers[0].save(),
      createdUsers[1].save(),

      createdDiscussion[0].save(),
      createdDiscussion[1].save(),
      createdDiscussion[2].save(),

      createdRooms[0].save(),
      createdRooms[1].save(),
      createdRooms[2].save(),
    ]);
  } catch (error) {
    console.error("Error while seeding: ", error);
  } finally {
    await mongoClient?.disconnect();
  }
};

const args = process.argv;
seed(args.includes("--destroy"));
