import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Clients).values([
		{id: 1, name: 'Rolo', age: 38, isActive: true},
		{id: 2, name: 'Ann', age: 23, isActive: true},
		{id: 3, name: 'Sergei', age: 43, isActive: true},
		{id: 4, name: 'Alphonse', age: 31, isActive: true},
		{id: 5, name: 'Katherine', age: 28, isActive: false},
	])

}
