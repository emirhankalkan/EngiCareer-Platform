import { useState, useMemo } from 'react';
import { calculateMatchScore } from '../utils/matchingAlgorithm';

export const useJobFilters = (jobs, initialFilters = {}, userProfile = null) => {
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
    const filtered = jobs.filter(job => {
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

    // F-REQ-031 & F-REQ-032: Calculate Match Score and Sort
    const withScores = filtered.map(job => ({
        ...job,
        matchScore: userProfile ? calculateMatchScore(userProfile, job) : (job.matchScore || 0)
    }));

    return withScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }, [jobs, searchQuery, locationFilter, filters, userProfile]);

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

  const clearAllFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setFilters({
      types: [],
      locations: [],
      skills: [],
      positions: []
    });
  };

  return {
    filteredJobs,
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    filters,
    toggleFilter,
    clearAllFilters
  };
};
