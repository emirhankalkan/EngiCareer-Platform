/**
 * calculateMatchScore
 * F-REQ-031: Adayın iş ilanına uygunluk puanı (Match Score) hesaplanmalıdır.
 * 
 * @param {Object} candidate - Candidate profile data
 * @param {Object} job - Job posting data
 * @returns {number} - Calculated match score (0-100 capped)
 */
export const calculateMatchScore = (candidate, job) => {
    if (!candidate || !job) return 0;
    
    let score = 0;
    const candidateSkills = candidate.skills || [];
    const jobSkills = job.skills || [];

    // 1. Technology Match (Base Score: 10-100)
    // Formula: (Matched Skills / Required Skills) * 100
    const matchedSkills = candidateSkills.filter(skill => 
        jobSkills.some(jobSkill => jobSkill?.toLowerCase() === skill?.toLowerCase())
    );
    
    if (jobSkills.length > 0) {
        const technologyMatchScore = (matchedSkills.length / jobSkills.length) * 100;
        score += technologyMatchScore;
    } else {
        score += 100; 
    }

    // 2. Sector Match (+20 points)
    if (candidate.sector && job.sector && candidate.sector === job.sector) {
        score += 20;
    }

    // 3. City Match (+10 points)
    if (job.location && candidate.city && job.location.toLowerCase().includes(candidate.city.toLowerCase())) {
        score += 10;
    }

    // Round and Cap at 100
    return Math.min(100, Math.max(0, Math.round(score)));
};
