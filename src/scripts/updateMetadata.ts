import { projects } from "../data";
const fs = require('fs');
const path = require('path');

interface ProjectMetadata {
  url: string;
  title?: string;
  description?: string;
  favicon?: string;
  image?: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
  tech: string[];
  year?: number;
  isOngoing?: boolean;
  metadata?: ProjectMetadata;
}

async function fetchMetadata(url: string): Promise<ProjectMetadata> {
  try {
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Failed with status ${response.status}`);
    }

    return {
      url: new URL(url).hostname,
      title: data.data?.title,
      description: data.data?.description,
      favicon: data.data?.logo?.url,
      image: data.data?.image?.url
    };
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error);
    return { url: new URL(url).hostname };
  }
}

async function updateProjectsMetadata() {
  // Create directory if it doesn't exist
  const dirPath = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  console.log(`Found ${projects.length} projects to update...`);

  const updatedProjects = await Promise.all(
    projects.map(async (project) => {
      try {
        console.log(`Fetching metadata for ${project.title}...`);
        const metadata = await fetchMetadata(project.link);
        return {
          ...project,
          metadata
        };
      } catch (error) {
        console.error(`Failed to fetch metadata for ${project.title} (${project.link}):`, error);
        return project;
      }
    })
  );

  // Write the updated data back to data.ts
  fs.writeFileSync(
    path.join(dirPath, 'data.ts'),
    `import { Project } from '@/types';\n\n` +
    `export const projects: Project[] = ${JSON.stringify(updatedProjects, null, 2)};\n`
  );

  console.log('✅ Projects metadata updated successfully!');
}

updateProjectsMetadata();