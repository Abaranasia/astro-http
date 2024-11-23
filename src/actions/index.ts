import { getGreeting } from './getGreeting.action';
import { getPostLikes } from './posts/get-likes.action';

export const server = {
    getGreeting,
    getPostLikes,
}