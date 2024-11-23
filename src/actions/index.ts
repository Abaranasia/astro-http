import { getGreeting } from './getGreeting.action';
import { getPostLikes } from './posts/get-likes.action';
import { updateLikes } from './posts/update-likes.action';

export const server = {
    getGreeting,
    getPostLikes,
    updateLikes,
}