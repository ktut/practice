// Custom hook using async/await and functional programming
import { useState, useEffect, useCallback } from 'react';
import { fetchUsers, getAvailableRoles } from '../services/mockDataService';

export const useMockData = (options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { role, sort } = options;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const users = await fetchUsers({ role, sort });
      setData(users);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [role, sort]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refetch: loadData };
};

export const useAvailableRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const availableRoles = await Promise.resolve(getAvailableRoles());
        setRoles(availableRoles);
      } catch (err) {
        console.error('Failed to load roles:', err);
      }
    };
    loadRoles();
  }, []);

  return roles;
};


