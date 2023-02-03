import { Entity, Schema } from 'redis-om';

import client from '../config/redis.config.js'

class Post extends Entity {}

const postSchema = new Schema(
  Post,
  {
    username: {
      type: "string",
    },
    post_text: {
      type: "string",
    },
    post_date: {
      type: "date",
      sortable: true
    },
  }
);

const postRepository = client.fetchRepository(postSchema)
await postRepository.createIndex()

export default postRepository
