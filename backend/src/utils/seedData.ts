import mongoose from 'mongoose';
import Quote from '../models/Quote';
import Project from '../models/Project';

// Initial mock data for seeding
const roofTypes = [
  "Metal",
  "TPO",
  "Foam",
  "EPDM",
  "Modified Bitumen",
  "Asphalt Shingle",
  "Tile",
];

const states = [
  { name: "Arizona", code: "AZ", cities: ["Phoenix", "Tucson", "Scottsdale", "Mesa", "Flagstaff"] },
  { name: "California", code: "CA", cities: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Fresno"] },
  { name: "Texas", code: "TX", cities: ["Houston", "Austin", "Dallas", "San Antonio", "El Paso"] },
  { name: "Florida", code: "FL", cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"] },
  { name: "Nevada", code: "NV", cities: ["Las Vegas", "Reno", "Henderson", "Carson City", "North Las Vegas"] },
  { name: "New Mexico", code: "NM", cities: ["Albuquerque", "Santa Fe", "Las Cruces", "Roswell", "Farmington"] },
  { name: "Colorado", code: "CO", cities: ["Denver", "Colorado Springs", "Fort Collins", "Boulder", "Aurora"] },
];

// Generate random date within a range
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Create seed quotes
const generateSeedQuotes = (count: number) => {
  const quotes = [];
  
  for (let i = 0; i < count; i++) {
    const stateIndex = Math.floor(Math.random() * states.length);
    const state = states[stateIndex];
    const cityIndex = Math.floor(Math.random() * state.cities.length);
    
    quotes.push({
      contractorName: `Contractor ${i + 1}`,
      company: `Company ${i + 1}`,
      roofSize: Math.floor(Math.random() * 10000) + 1000, // 1000 to 11000 sq ft
      roofType: roofTypes[Math.floor(Math.random() * roofTypes.length)],
      projectCity: state.cities[cityIndex],
      projectState: state.code,
      projectDate: randomDate(new Date(2023, 0, 1), new Date()),
      submittedAt: new Date()
    });
  }
  
  return quotes;
};

// Create seed projects with performance data
const generateSeedProjects = (count: number) => {
  const projects = [];
  
  for (let i = 0; i < count; i++) {
    const stateIndex = Math.floor(Math.random() * states.length);
    const state = states[stateIndex];
    const cityIndex = Math.floor(Math.random() * state.cities.length);
    const roofType = roofTypes[Math.floor(Math.random() * roofTypes.length)];
    const roofSize = Math.floor(Math.random() * 10000) + 1000; // 1000 to 11000 sq ft
    
    // Calculate energy efficiency factor based on roof type
    const energyEfficiencyFactor: Record<string, number> = {
      "Metal": 0.25,
      "TPO": 0.28,
      "Foam": 0.32,
      "EPDM": 0.22,
      "Modified Bitumen": 0.18,
      "Asphalt Shingle": 0.15,
      "Tile": 0.2,
    };
    
    const factor = energyEfficiencyFactor[roofType] || 0.2;
    const energySavings = Math.round(roofSize * factor * (0.8 + Math.random() * 0.4));
    const costSavings = Math.round(energySavings * 0.15 * (0.9 + Math.random() * 0.2));
    const temperatureReduction = Math.round((5 + Math.random() * 10) * 10) / 10;
    const isCompleted = Math.random() > 0.2; // 80% of projects are completed
    
    projects.push({
      contractorName: `Contractor ${i % 50 + 1}`,
      company: `Company ${i % 30 + 1}`,
      roofSize,
      roofType,
      projectCity: state.cities[cityIndex],
      projectState: state.code,
      projectDate: randomDate(new Date(2023, 0, 1), new Date()),
      completed: isCompleted,
      energySavings,
      costSavings,
      temperatureReduction,
      installationDate: isCompleted ? randomDate(new Date(2023, 1, 1), new Date()) : undefined,
      createdAt: new Date()
    });
  }
  
  return projects;
};

// Seed the database with initial data
export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('Checking database for existing data...');
    
    // Only seed if the database is empty
    const quoteCount = await Quote.countDocuments();
    const projectCount = await Project.countDocuments();
    
    if (quoteCount === 0) {
      console.log('Seeding quotes collection...');
      const seedQuotes = generateSeedQuotes(50);
      await Quote.insertMany(seedQuotes);
      console.log(`✅ Successfully seeded ${seedQuotes.length} quotes`);
    } else {
      console.log(`📊 Database already has ${quoteCount} quotes, skipping quote seeding`);
    }
    
    if (projectCount === 0) {
      console.log('Seeding projects collection...');
      const seedProjects = generateSeedProjects(1000);
      await Project.insertMany(seedProjects);
      console.log(`✅ Successfully seeded ${seedProjects.length} projects`);
    } else {
      console.log(`📊 Database already has ${projectCount} projects, skipping project seeding`);
    }
    
    console.log('✅ Database initialization complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    // Don't exit the process here, let the calling code handle the error
    throw error;
  }
};

export default seedDatabase;