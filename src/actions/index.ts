import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { getGreeting } from './getGreeting.action';

export const server = {
    getGreeting,
}