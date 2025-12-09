import React, { useState, useCallback, useMemo } from 'react';
import { useMockData, useAvailableRoles } from './hooks/useMockData';
import './App.css';

const UserCard = React.memo(({ user }) => (
  <div className="user-card" data-testid={`user-card-${user.id}`}>
    <div className="user-avatar">{user.initials}</div>
    <div className="user-info">
      <h3 className="user-name">{user.name}</h3>
      <p className="user-email">{user.email}</p>
      <span className="user-role">{user.role}</span>
    </div>
  </div>
));

UserCard.displayName = 'UserCard';

const UserList = React.memo(({ users, loading, error }) => {
  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div className="empty">No users found</div>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
});

UserList.displayName = 'UserList';

const App = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const roles = useAvailableRoles();
  
  const mockDataOptions = useMemo(() => ({
    role: selectedRole || undefined
  }), [selectedRole]);
  
  const { data: users, loading, error, refetch } = useMockData(mockDataOptions);

  const handleRoleChange = useCallback((event) => {
    setSelectedRole(event.target.value);
  }, []);

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const roleFilterProps = useMemo(() => ({
    value: selectedRole,
    onChange: handleRoleChange,
    'aria-label': 'Filter by role'
  }), [selectedRole, handleRoleChange]);

  const stats = useMemo(() => ({
    total: users.length,
    byRole: users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {})
  }), [users]);

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>User Directory</h1>
        <div className="controls">
          <select {...roleFilterProps} className="role-filter">
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button onClick={handleRefresh} className="refresh-button">
            Refresh
          </button>
        </div>
        <div className="stats">
          <span>Total: {stats.total}</span>
          {Object.entries(stats.byRole).map(([role, count]) => (
            <span key={role}>{role}: {count}</span>
          ))}
        </div>
      </header>
      <UserList users={users} loading={loading} error={error} />
    </main>
  );
};

export default App;
