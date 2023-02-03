import { Entity, Schema } from 'redis-om';

import client from '../config/redis.config.js'

class User extends Entity {}

const userSchema = new Schema(
  User,
  {
    username: {
      type: "string",
    },
    password: {
      type: "string",
    }
  }
);

const userRepository = client.fetchRepository(userSchema)
await userRepository.createIndex()

export default userRepository

