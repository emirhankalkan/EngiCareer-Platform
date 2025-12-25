/**
 * MOCK DATA SERVICE
 * Simulates a PostgreSQL database response for the Job & Internship Platform.
 * 
 * This file contains:
 * 1. USERS: Candidates and Company profiles
 * 2. JOBS: Detailed job listings with technical skill requirements
 * 3. APPLICATIONS: Tracking of candidate applications to jobs
 */

// --- 1. USERS (Candidates & Companies) ---
export const USERS = [
  {
    id: 1,
    role: 'candidate',
    name: 'Ali Yılmaz',
    title: 'Junior Software Engineer',
    skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    experience: 'Junior',
    location: 'Eskişehir',
    about: 'Bilgisayar Mühendisliği öğrencisi. Full stack web geliştirme üzerine odaklanıyorum.'
  },
  {
    id: 10,
    role: 'candidate',
    name: 'Zeynep Çelik',
    title: 'UI/UX Designer',
    skills: ['Figma', 'Adobe XD', 'React', 'Tailwind CSS'],
    experience: 'Mid',
    location: 'Ankara',
    about: 'Kullanıcı odaklı dijital deneyimler tasarlayan tutkulu bir tasarımcıyım.'
  },
  {
    id: 11,
    role: 'candidate',
    name: 'Ahmet Yılmaz',
    title: 'Backend Developer',
    skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    experience: 'Junior',
    location: 'İstanbul',
    about: 'Ölçeklenebilir mikroservis mimarileri üzerine çalışıyorum.'
  },
  {
    id: 12,
    role: 'candidate',
    name: 'Ayşe Demir',
    title: 'Data Scientist',
    skills: ['Python', 'Pandas', 'TensorFlow', 'SQL'],
    experience: 'Mid',
    location: 'İzmir',
    about: 'Veri madenciliği ve makine öğrenmesi algoritmaları geliştiriyorum.'
  },
  {
    id: 13,
    role: 'candidate',
    name: 'Mehmet Kaya',
    title: 'Frontend Developer',
    skills: ['Vue.js', 'React', 'TypeScript', 'Sass'],
    experience: 'Junior',
    location: 'Eskişehir',
    about: 'ESOGU Bilgisayar Mühendisliği mezunuyum. Modern frontend teknolojilerine hakimim.'
  },
  {
    id: 2,
    role: 'company',
    name: 'TechFlow Yazılım',
    location: 'İstanbul',
    description: 'Kurumsal yazılım çözümleri üreten lider teknoloji şirketi.'
  }
];

// --- 1.1 COMPANIES (Partner Companies) ---
export const COMPANIES = [
  {
    id: 1,
    name: 'TechFlow Yazılım',
    logo: 'TF',
    industry: 'Yazılım & Teknoloji',
    location: 'İstanbul',
    employees: '50-200',
    description: 'Kurumsal yazılım çözümleri üreten lider teknoloji şirketi.',
    activeJobs: 4
  },
  {
    id: 2,
    name: 'FinTech Solutions',
    logo: 'FS',
    industry: 'Finans Teknoloji',
    location: 'Ankara',
    employees: '200-500',
    description: 'Yeni nesil ödeme sistemleri ve finansal analiz araçları.',
    activeJobs: 2
  },
  {
    id: 3,
    name: 'CloudNine',
    logo: 'C9',
    industry: 'Bulut Bilişim',
    location: 'Remote',
    employees: '10-50',
    description: 'Global ölçekte bulut altyapı hizmetleri sağlayıcısı.',
    activeJobs: 3
  },
  {
    id: 4,
    name: 'GameCore',
    logo: 'GC',
    industry: 'Oyun Geliştirme',
    location: 'Ankara',
    employees: '20-100',
    description: 'Mobil ve PC platformları için AAA kalitesinde oyunlar.',
    activeJobs: 5
  },
  {
    id: 5,
    name: 'CyberSafe',
    logo: 'CS',
    industry: 'Siber Güvenlik',
    location: 'İstanbul',
    employees: '100+',
    description: 'Kurumsal veri güvenliği ve siber savunma sistemleri.',
    activeJobs: 1
  },
  {
    id: 6,
    name: 'AI Labs',
    logo: 'AL',
    industry: 'Yapay Zeka',
    location: 'Teknopark İstanbul',
    employees: '10-20',
    description: 'Derin öğrenme ve NLP üzerine Ar-Ge çalışmaları.',
    activeJobs: 2
  },
  {
    id: 7,
    name: 'CyberSafe',
    logo: 'CS',
    industry: 'Siber Güvenlik',
    location: 'İstanbul',
    employees: '50-100',
    description: 'Siber güvenlik çözümleri ve pentest hizmetleri.',
    activeJobs: 1
  },
  {
    id: 8,
    name: 'DataWave',
    logo: 'DW',
    industry: 'Veri Analitiği',
    location: 'Bursa',
    employees: '20-50',
    description: 'Büyük veri işleme ve görselleştirme çözümleri.',
    activeJobs: 2
  },
  {
    id: 9,
    name: 'MobileX',
    logo: 'MX',
    industry: 'Mobil Uygulama',
    location: 'İzmir',
    employees: '30-80',
    description: 'iOS ve Android için ödüllü mobil uygulamalar.',
    activeJobs: 3
  },
  {
    id: 10,
    name: 'GreenTech',
    logo: 'GT',
    industry: 'Yenilenebilir Enerji',
    location: 'Eskişehir',
    employees: '100-250',
    description: 'Enerji verimliliği sağlayan IoT tabanlı yazılımlar.',
    activeJobs: 2
  },
  {
    id: 11,
    name: 'BlueOcean',
    logo: 'BO',
    industry: 'E-Ticaret',
    location: 'Antalya',
    employees: '500+',
    description: 'Türkiye\'nin önde gelen e-ticaret altyapı sağlayıcısı.',
    activeJobs: 4
  }
];

// --- 2. JOB LISTINGS (10+ Items) ---
export const JOBS = [
  {
    id: 101,
    companyId: 2,
    company: 'TechFlow Yazılım',
    logo: 'TF',
    title: 'Junior React Developer',
    description: 'Modern web teknolojileri ile geliştirilen projelerimizde görev alacak React geliştirici arıyoruz.',
    type: 'Tam Zamanlı',
    location: 'İstanbul (Hibrit)',
    salary: '₺25.000 - ₺35.000',
    skills: ['React', 'TypeScript', 'Tailwind'],
    experience: 'Junior',
    postedAt: '2025-12-15T09:00:00',
    matchScore: 95,
    requirements: ['React deneyimi', 'Modern CSS bilgisi'],
    responsibilities: ['UI geliştirmek', 'Kod kalitesini korumak']
  },
  {
    id: 102,
    companyId: 2,
    company: 'TechFlow Yazılım',
    logo: 'TF',
    title: 'Java Backend Stajyeri',
    description: 'Zorunlu yaz stajı için Java ve Spring Boot öğrenmeye hevesli stajyerler arıyoruz.',
    type: 'Staj',
    location: 'İstanbul (Ofis)',
    salary: 'Asgari Ücret',
    skills: ['Java', 'Spring Boot', 'SQL'],
    experience: 'Intern',
    postedAt: '2025-12-16T14:30:00',
    matchScore: 88,
    requirements: ['Temel Java bilgisi', 'SQL bilgisi'],
    responsibilities: ['Backend projelerine destek olmak']
  },
  {
    id: 103,
    companyId: 3,
    company: 'FinTech Solutions',
    logo: 'FS',
    title: 'Data Analyst',
    description: 'Finansal verilerin analizi ve raporlanması süreçlerinde çalışacak ekip arkadaşı.',
    type: 'Tam Zamanlı',
    location: 'Ankara',
    salary: '₺40.000 - ₺50.000',
    skills: ['Python', 'SQL', 'Excel', 'Tableau'],
    experience: 'Mid',
    postedAt: '2025-12-10T11:20:00',
    matchScore: 45,
    requirements: ['Python bilgisi', 'Veri analizi deneyimi'],
    responsibilities: ['Rapor hazırlamak']
  },
  {
    id: 104,
    companyId: 4,
    company: 'CloudNine',
    logo: 'C9',
    title: 'DevOps Engineer',
    description: 'Bulut altyapılarımızın yönetimi ve CI/CD süreçlerinin otomasyonu.',
    type: 'Tam Zamanlı',
    location: 'Remote',
    salary: '₺60.000+',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Linux'],
    experience: 'Senior',
    postedAt: '2025-12-14T16:45:00',
    matchScore: 60,
    requirements: ['Bulut sistemleri deneyimi', 'Yüksek erişilebilirlik bilgisi'],
    responsibilities: ['Altyapı otomasyonu']
  },
  {
    id: 105,
    companyId: 5,
    company: 'SoftHouse',
    logo: 'SH',
    title: 'Frontend Developer (Vue.js)',
    description: 'Kullanıcı dostu arayüzler geliştirmek için Vue.js uzmanı arıyoruz.',
    type: 'Tam Zamanlı',
    location: 'İzmir',
    salary: '₺30.000 - ₺45.000',
    skills: ['Vue.js', 'JavaScript', 'CSS'],
    experience: 'Mid',
    postedAt: '2025-12-12T10:00:00',
    matchScore: 30
  },
  {
    id: 106,
    companyId: 6,
    company: 'GameCore',
    logo: 'GC',
    title: 'Unity Developer',
    description: 'Mobil oyun projelerimizde görev alacak Unity geliştirici.',
    type: 'Ofis',
    location: 'Ankara (Ofis)',
    salary: '₺35.000 - ₺55.000',
    skills: ['C#', 'Unity', '3D Math'],
    experience: 'Junior',
    postedAt: '2025-12-17T08:15:00',
    matchScore: 20
  },
  {
    id: 107,
    companyId: 2,
    company: 'TechFlow Yazılım',
    logo: 'TF',
    title: 'Full Stack Team Lead',
    description: 'Yazılım ekibimize liderlik edecek deneyimli mühendis.',
    type: 'Tam Zamanlı',
    location: 'İstanbul',
    salary: '₺80.000 - ₺100.000',
    skills: ['React', 'Java', 'System Design', 'Leadership'],
    experience: 'Senior',
    postedAt: '2025-12-01T09:00:00',
    matchScore: 75
  },
  {
    id: 108,
    companyId: 7,
    company: 'CyberSafe',
    logo: 'CS',
    title: 'Cyber Security Intern',
    description: 'Siber güvenlik operasyon merkezimizde yetiştirilmek üzere stajyer.',
    type: 'Staj',
    location: 'İstanbul',
    salary: 'Yemek + Yol',
    skills: ['Network', 'Linux', 'Python'],
    experience: 'Intern',
    postedAt: '2025-12-17T13:00:00',
    matchScore: 40
  },
  {
    id: 109,
    companyId: 8,
    company: 'AI Labs',
    logo: 'AL',
    title: 'Machine Learning Engineer',
    description: 'Doğal dil işleme (NLP) projelerimizde çalışacak mühendis.',
    type: 'Tam Zamanlı',
    location: 'Antalya',
    salary: '₺70.000+',
    skills: ['Python', 'PyTorch', 'TensorFlow'],
    experience: 'Senior',
    postedAt: '2025-12-05T14:20:00',
    matchScore: 55
  },
  {
    id: 110,
    companyId: 9,
    company: 'MobileX',
    logo: 'MX',
    title: 'iOS Developer',
    description: 'iOS uygulamalarımızın geliştirilmesi ve bakımı.',
    type: 'Tam Zamanlı',
    location: 'Bursa',
    salary: '₺45.000 - ₺60.000',
    skills: ['Swift', 'iOS SDK', 'UIKit'],
    experience: 'Mid',
    postedAt: '2025-12-15T11:00:00',
    matchScore: 10
  },
  {
      id: 111,
      companyId: 8,
      company: 'DataWave',
      logo: 'DW',
      title: 'Big Data Engineer',
      description: 'Hadoop ve Spark kümelerinin yönetimi ve veri boru hatlarının inşası.',
      type: 'Tam Zamanlı',
      location: 'Bursa',
      salary: '₺55.000 - ₺75.000',
      skills: ['Hadoop', 'Spark', 'Scala', 'Python'],
      experience: 'Senior',
      postedAt: '2025-12-16T10:00:00',
      matchScore: 35
  },
  {
      id: 112,
      companyId: 10,
      company: 'GreenTech',
      logo: 'GT',
      title: 'IoT Developer',
      description: 'Akıllı enerji sistemleri için gömülü yazılım geliştirme.',
      type: 'Tam Zamanlı',
      location: 'Eskişehir',
      salary: '₺40.000 - ₺55.000',
      skills: ['C++', 'Embedded C', 'IoT Protocols'],
      experience: 'Mid',
      postedAt: '2025-12-14T09:30:00',
      matchScore: 25
  },
  {
      id: 113,
      companyId: 11,
      company: 'BlueOcean',
      logo: 'BO',
      title: 'E-Ticaret Operasyon Uzmanı',
      description: 'E-ticaret süreçlerinin takibi ve müşteri memnuniyeti yönetimi.',
      type: 'Tam Zamanlı',
      location: 'Antalya',
      salary: '₺25.000 - ₺35.000',
      skills: ['Excel', 'CRM', 'Communication'],
      experience: 'Junior',
      postedAt: '2025-12-17T11:45:00',
      matchScore: 50
  },
  {
      id: 114,
      companyId: 11,
      company: 'BlueOcean',
      logo: 'BO',
      title: 'PHP Developer (Magento)',
      description: 'Magento tabanlı e-ticaret sitelerinin geliştirilmesi.',
      type: 'Tam Zamanlı',
      location: 'Antalya',
      salary: '₺40.000 - ₺60.000',
      skills: ['PHP', 'Magento', 'MySQL'],
      experience: 'Mid',
      postedAt: '2025-12-15T15:20:00',
      matchScore: 40
  },
  {
      id: 115,
      companyId: 3,
      company: 'CloudNine',
      logo: 'C9',
      title: 'Remote Frontend Intern',
      description: 'Global projelerde çalışacak, React öğrenmeye istekli stajyer.',
      type: 'Staj',
      location: 'Remote',
      salary: 'Asgari Ücret',
      skills: ['React', 'HTML', 'CSS'],
      experience: 'Intern',
      postedAt: '2025-12-17T09:00:00',
      matchScore: 85
  },
  {
      id: 116,
      companyId: 2,
      company: 'TechFlow Yazılım',
      logo: 'TF',
      title: 'Senior .NET Developer',
      description: 'Kurumsal .NET projelerimizde mimari kararlar alacak deneyimli geliştirici.',
      type: 'Tam Zamanlı',
      location: 'İstanbul',
      salary: '₺70.000 - ₺90.000',
      skills: ['.NET', 'C#', 'Microservices'],
      experience: 'Senior',
      postedAt: '2025-12-13T14:00:00',
      matchScore: 65
  },
  {
      id: 117,
      companyId: 4,
      company: 'GameCore',
      logo: 'GC',
      title: 'Game Artist',
      description: '2D/3D oyun grafikleri ve animasyonları hazırlayacak sanatçı.',
      type: 'Ofis',
      location: 'Ankara (Ofis)',
      salary: '₺30.000 - ₺50.000',
      skills: ['Photoshop', 'Blender', 'Unity'],
      experience: 'Mid',
      postedAt: '2025-12-16T16:30:00',
      matchScore: 15
  },
  {
      id: 118,
      companyId: 10,
      company: 'GreenTech',
      logo: 'GT',
      title: 'Backend Developer (Go)',
      description: 'Yüksek performanslı backend servisleri için Go geliştirici.',
      type: 'Tam Zamanlı',
      location: 'Eskişehir',
      salary: '₺50.000 - ₺70.000',
      skills: ['Go', 'PostgreSQL', 'Redis'],
      experience: 'Mid',
      postedAt: '2025-12-12T10:45:00',
      matchScore: 30
  },
  {
      id: 119,
      companyId: 1,
      company: 'TechFlow Yazılım', 
      logo: 'TF',
      title: 'Project Manager',
      description: 'Yazılım projelerinin zamanında ve bütçeye uygun tesliminden sorumlu.',
      type: 'Tam Zamanlı',
      location: 'İstanbul',
      salary: '₺60.000 - ₺80.000',
      skills: ['Agile', 'Scrum', 'Jira'],
      experience: 'Senior',
      postedAt: '2025-12-11T09:15:00',
      matchScore: 55
  },
  {
      id: 120,
      companyId: 7,
      company: 'CyberSafe',
      logo: 'CS',
      title: 'Siber Güvenlik Analisti',
      description: 'Kurumsal ağ trafiğini izleyecek ve zafiyet analizleri yapacak ekip arkadaşları arıyoruz.',
      type: 'Tam Zamanlı',
      location: 'İstanbul',
      salary: '₺50.000 - ₺80.000',
      skills: ['Network', 'Linux', 'Pentest', 'SIEM'],
      experience: 'Mid',
      postedAt: '2025-12-24T10:00:00',
      matchScore: 90
  },
  {
      id: 121,
      companyId: 6,
      company: 'AI Labs',
      logo: 'AL',
      title: 'Yapay Zeka Araştırmacısı (NLP)',
      description: 'Yeni nesil LLM modelleri ve doğal dil işleme algoritmaları üzerine çalışacak.',
      type: 'Tam Zamanlı',
      location: 'Teknopark İstanbul',
      salary: '₺80.000 - ₺120.000',
      skills: ['Python', 'PyTorch', 'NLP', 'Transformers'],
      experience: 'Senior',
      postedAt: '2025-12-25T09:00:00',
      matchScore: 85
  },
  {
      id: 122,
      companyId: 2,
      company: 'FinTech Solutions',
      logo: 'FS',
      title: 'Product Owner',
      description: 'Ödeme sistemleri ürün yol haritasını yönetecek ve paydaşlarla koordinasyonu sağlayacak.',
      type: 'Tam Zamanlı',
      location: 'Ankara',
      salary: '₺70.000 - ₺95.000',
      skills: ['Agile', 'Jira', 'Product Strategy', 'Communication'],
      experience: 'Senior',
      postedAt: '2025-12-23T11:30:00',
      matchScore: 70
  },
  {
      id: 123,
      companyId: 1,
      company: 'TechFlow Yazılım',
      logo: 'TF',
      title: 'Database Administrator (DBA)',
      description: 'Yüksek trafikli PostgreSQL ve MSSQL veritabanlarının yönetimi ve optimizasyonu.',
      type: 'Tam Zamanlı',
      location: 'İstanbul',
      salary: '₺55.000 - ₺85.000',
      skills: ['PostgreSQL', 'MSSQL', 'Performance Tuning', 'Backup'],
      experience: 'Mid',
      postedAt: '2025-12-22T14:45:00',
      matchScore: 60
  }
];

// --- 3. APPLICATIONS (Mocking Relations) ---
export const APPLICATIONS = [
  {
    id: 1001,
    jobId: 101, // Junior React Developer
    candidateId: 10,
    candidateName: 'Ahmet Yılmaz',
    candidateRole: 'Junior Frontend Dev',
    appliedAt: '2 saat önce',
    status: 'In Review' // Sent, In Review, Accepted, Rejected
  },
  {
    id: 1002,
    jobId: 101,
    candidateId: 11,
    candidateName: 'Ayşe Demir',
    candidateRole: 'New Grad',
    appliedAt: '5 saat önce',
    status: 'Sent'
  },
  {
    id: 1003,
    jobId: 102, // Java Stajyeri
    candidateId: 12,
    candidateName: 'Mehmet Kaya',
    candidateRole: 'Student',
    appliedAt: '1 gün önce',
    status: 'Rejected'
  },
  {
    id: 1004,
    jobId: 101,
    candidateId: 13,
    candidateName: 'Zeynep Çelik',
    candidateRole: 'UI/UX Designer',
    appliedAt: '2 gün önce',
    status: 'Accepted'
  }
];

// --- 4. HELPER FUNCTIONS (Simulating Backend Logic) ---

export const getJobById = (id) => JOBS.find(j => j.id === parseInt(id));

export const getApplicationsByCompany = (companyId) => {
    // In a real DB we would join tables. Here we filter mock data.
    // For this mock, we assume all applications belong to TechFlow (Id 2) jobs for simplicity in dashboard
    return APPLICATIONS;
};
