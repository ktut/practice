// Mock data service using async/await and functional programming paradigms

const MOCK_DELAY = 500; // Simulate network delay

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Manager' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Developer' },
  { id: 5, name: 'Eve Wilson', email: 'eve@example.com', role: 'Designer' },
];

// Simulate delay using Promise
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Functional programming: pure function to transform user data
const transformUser = (user) => ({
  ...user,
  displayName: `${user.name} (${user.role})`,
  initials: user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase(),
});

// Functional programming: sort function
const sortByName = (users) => 
  [...users].sort((a, b) => a.name.localeCompare(b.name));

// Main service functions using async/await
export const fetchUsers = async (options = {}) => {
  const { role, sort = true } = options;
  
  try {
    await delay(MOCK_DELAY);
    
    // Functional composition: transform -> filter -> sort
    let users = mockUsers.map(transformUser);
    
    // Filter by role if specified
    if (role) {
      users = users.filter((user) => user.role === role);
    }
    
    return sort ? sortByName(users) : users;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

export const fetchUserById = async (id) => {
  try {
    await delay(MOCK_DELAY / 2);
    
    const user = mockUsers.find((u) => u.id === id);
    
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    
    return transformUser(user);
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

export const createUser = async (userData) => {
  try {
    await delay(MOCK_DELAY);
    
    const newUser = {
      id: Math.max(...mockUsers.map((u) => u.id)) + 1,
      ...userData,
    };
    
    mockUsers.push(newUser);
    return transformUser(newUser);
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

// Functional programming: get unique roles
export const getAvailableRoles = () => 
  [...new Set(mockUsers.map((user) => user.role))].sort();


