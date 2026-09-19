import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content');

export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  status: string;
  stack: string[];
  repo?: string;
}

export function getProjectContent(slug: string): {
  frontmatter: ProjectFrontmatter;
  content: string;
} {
  try {
    const filePath = path.join(contentDir, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return {
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error loading content for slug ${slug}:`, error);
    return {
      frontmatter: {
        title: 'Content Not Found',
        subtitle: 'The requested content could not be found.',
        status: 'error',
        stack: [],
      },
      content: '',
    };
  }
}
