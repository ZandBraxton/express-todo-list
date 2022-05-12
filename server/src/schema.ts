import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull,
} from "graphql";
const GraphQlDate = require("graphql-date");
import { encryptPassword, comparePassword } from "./utils/bcryptGen";
import { User } from "./models/user";
import { Task } from "./models/tasks";
import { errorName } from "./constants/errors";
import { getToken } from "./utils/isAuth";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    date: { type: GraphQlDate },
    isCompleted: { type: GraphQLBoolean },
    user: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return [User.findById(parent.userId)];
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    me: {
      type: UserType,
      resolve(parent, args, req) {
        if (req.isAuth) {
          return User.findById(req.userId);
        }
      },
    },

    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },

    task: {
      type: new GraphQLList(TaskType),
      args: { userId: { type: GraphQLID } },
      resolve: async (parent, args, req) => {
        const tasks = await Task.find({ userId: req.userId });
        return tasks;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context, info) => {
        let user = new User({
          email: args.email,
          username: args.username,
          password: await encryptPassword(args.password),
        });
        try {
          const regUser = await user.save();
          const token = getToken(regUser);
          return { ...regUser.toJSON(), token };
        } catch (err) {
          if (err.keyPattern.email === 1) {
            const error = {
              code: 403,
              message: "Email already exists",
            };
            throw new Error(errorName.EMAIL_ALREADY_EXISTS);
          }

          if (err.keyPattern.username === 1) {
            const error = {
              code: 403,
              message: "User already exists",
            };
            throw new Error(errorName.USER_ALREADY_EXISTS);
          }
        }
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context, info) => {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          const error = {
            code: 403,
            message: "User does not exist",
          };
          throw new Error(errorName.USER_NOT_FOUND);
        }
        const IsMatch = await comparePassword(args.password, user.password);
        if (IsMatch) {
          const token = getToken(user);
          return { ...user.toJSON(), token };
        } else {
          const error = {
            code: 403,
            message: "Password does not match",
          };
          throw new Error(errorName.PASSWORD_NOT_MATCH);
        }
      },
    },

    addTask: {
      type: TaskType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQlDate) },
        isCompleted: { type: GraphQLBoolean },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let task = new Task({
          name: args.name,
          date: args.date,
          isCompleted: args.isCompleted,
          userId: args.userId,
        });
        return task.save();
      },
    },

    editTask: {
      type: TaskType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQlDate) },
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        let task: any = await Task.findByIdAndUpdate(args.id);
        (task.name = args.name), (task.date = args.date), task.save();
        return task;
      },
    },

    deleteTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        return Task.findByIdAndDelete(args.id);
      },
    },

    completedTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        let task: any = await Task.findByIdAndUpdate(args.id);
        (task.isCompleted = !task.isCompleted), task.save();
        return task;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
