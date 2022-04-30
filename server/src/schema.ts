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

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
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
    priority: { type: GraphQLInt },
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
      resolve(parent, args) {
        encryptPassword(args.password).then((data) => {
          let user = new User({
            email: args.email,
            username: args.username,
            password: data,
          });
          return user.save();
        });
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          const error = {
            code: 403,
            message: "User does not exist",
          };
          throw new Error(errorName.USER_NOT_FOUND);
        }
        const IsMatch = await comparePassword(args.password, user.password);
        console.log(IsMatch);
        if (IsMatch) {
          return { ...user };
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
        priority: { type: new GraphQLNonNull(GraphQLInt) },
        isCompleted: { type: new GraphQLNonNull(GraphQLBoolean) },
        projectId: { type: GraphQLID },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let task = new Task({
          name: args.name,
          priority: args.priority,
          isCompleted: args.isCompleted,
          projectId: args.projectId,
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
