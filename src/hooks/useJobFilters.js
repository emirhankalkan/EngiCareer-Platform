import { useState, useMemo } from 'react';

/**
 * useJobFilters Hook
 * Handles filtering logic for the Job Listing page.
 * 
 * @param {Array} jobs - The initial list of jobs from Mock Data
 * @returns {Object} - Filtered jobs and filter control functions
 */
export const useJobFilters = (jobs, initialFilters = {}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filters, setFilters] = useState({
    types: [], 
    locations: [], 
    skills: [], 
    positions: [],
    ...initialFilters // Merge provided defaults
  });

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // 1. Text Search (Title or Company)
      const searchMatch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Location Text Inputs
      const locationTextMatch = locationFilter 
        ? job.location.toLowerCase().includes(locationFilter.toLowerCase()) 
        : true;

      // 3. Checkbox Filters (Type)
      const typeMatch = filters.types.length === 0 || filters.types.includes(job.type);

      // 4. Checkbox Filters (Location category)
      const locCheckboxMatch = filters.locations.length === 0 || 
        filters.locations.some(loc => job.location.includes(loc));

      // 5. Skills Filter
      const skillMatch = filters.skills.length === 0 || 
        filters.skills.some(skill => job.skills.includes(skill));

      // 6. Positions Filter (New) - fuzzy match against Title
      const positionMatch = filters.positions.length === 0 || 
        filters.positions.some(pos => job.title.toLowerCase().includes(pos.toLowerCase()));

      return searchMatch && locationTextMatch && typeMatch && locCheckboxMatch && skillMatch && positionMatch;
    });
  }, [jobs, searchQuery, locationFilter, filters]);

  // Toggle Checkbox Helper
  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const currentList = prev[category];
      const newList = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      
      return { ...prev, [category]: newList };
    });
  };

  return {
    filteredJobs,
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    filters,
    toggleFilter
  };
};
