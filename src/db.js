import Dexie from 'dexie';

export const db = new Dexie('notesDb');
db.version(1).stores({
  notes: '++id, title, createdAt, updatedAt'
});

// Add some initial data if the database is empty
db.on('populate', async () => {
  await db.notes.add({
    title: 'Welcome Note',
    content: '<p>Welcome to your new note-taking app!</p>',
    createdAt: new Date(),
    updatedAt: new Date()
  });
});

export default db;