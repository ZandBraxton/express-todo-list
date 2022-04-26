import {
  graphql,
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLID,
} from "graphql";

import { User } from "./models/user";
import { Task } from "./models/tasks";
import { Project } from "./models/projects";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    hash: { type: GraphQLString },
  }),
});

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    priority: { type: GraphQLInt },
    completed: { type: GraphQLBoolean },
    project: {
      type: ProjectType,
      resolve(parent, args) {},
    },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {},
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data/db
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //code to get data/db
      },
    },

    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data/db
      },
    },
  },

  //   fields: () => ({
  //     users: {
  //       type: new GraphQLList(UserType),
  //       resolve: () => {
  //         //   query database
  //         getUsers: async () => await User.find({}).exec();
  //       },
  //     },
  //   }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        hash: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username,
          email: args.email,
          hash: args.hash,
        });
        return user.save();
      },
    },

    addTask: {
      type: TaskType,
      args: {
        name: { type: GraphQLString },
        priority: { type: GraphQLInt },
        completed: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        let task = new Task({
          name: args.name,
          priority: args.priority,
          completed: args.completed,
        });
        return task.save();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
