import { getGreeting } from './getGreeting.action';
import { getPostLikes } from './posts/get-posts-likes.action';

export const server = {
    getGreeting,
    getPostLikes,
}