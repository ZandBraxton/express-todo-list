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
  GraphQLNonNull,
} from "graphql";
import { encryptPassword, comparePassword } from "./utils/bcryptGen";
import { User } from "./models/user";
import { Task } from "./models/tasks";
import { Project } from "./models/projects";
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

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return [User.findById(parent.userId)];
      },
    },
  }),
});

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    priority: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    user: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return [User.findById(parent.userId)];
      },
    },
    project: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return [Project.findById(parent.projectId)];
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
        console.log(req.isAuth);
        console.log(req.userId);
        if (req.isAuth) {
          return User.findById(req.userId);
        }
        // if (context.loggedIn) {
        //   console.log("Hello");
        //   return context;
        // } else {
        //   const error = {
        //     code: 403,
        //     message: "User does not exist",
        //   };
        //   console.log("yup");
        //   throw new Error(errorName.USER_NOT_FOUND);
        // }
      },
    },

    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data/db
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //code to get data/db
        return User.find({});
      },
    },

    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data/db
        return Task.findById(args.id);
      },
    },

    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data/db
        return Project.findById(args.id);
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
        // if (user) {
        //   const error = {
        //     code: 403,
        //     message: "User already exists",
        //   };
        //   throw new Error(errorName.USER_ALREADY_EXISTS);
        // }
        try {
          const regUser = await user.save();
          const token = getToken(regUser);
          return { ...regUser.toJSON(), token };
        } catch (err) {
          const error = {
            code: 403,
            message: "User does not exist",
          };
          throw new Error(errorName.PASSWORD_NOT_MATCH);
        }

        // encryptPassword(args.password).then((data) => {
        //   let user = new User({
        //     email: args.email,
        //     username: args.username,
        //     password: data,
        //   });
        //   user.save();
        //   const token = getToken(user);

        //   return { ...user, token };
        // });
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

    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let project = new Project({
          name: args.name,
          description: args.description,
          userId: args.userId,
        });
        return project.save();
      },
    },

    addTask: {
      type: TaskType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        priority: { type: new GraphQLNonNull(GraphQLString) },
        isCompleted: { type: GraphQLBoolean },
        // projectId: { type: GraphQLID },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        console.log(args);
        let task = new Task({
          name: args.name,
          priority: args.priority,
          isCompleted: args.isCompleted,
          userId: args.userId,
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
