import { getGitHubProjects } from '@/lib/github';
import Container from '../ui/Container';
import ProjectCard from '../ui/ProjectCard';
import SectionLabel from '../ui/SectionLabel';

export default async function FeaturedWorksSection() {
  const allProjects = await getGitHubProjects();

  return (
    <section
      id="projects"
      aria-labelledby="featured-works-heading"
      className="bg-white py-12 sm:py-16 lg:py-20 2xl:py-24"
    >
      <Container>
        <SectionLabel viewAllHref="/work" viewAllLabel="View all work">
          <span id="featured-works-heading">Featured works</span>
        </SectionLabel>

        <div className="divide-y divide-[#e8eaed]">
          {allProjects.length > 0 ? (
            allProjects.map((project, i) => (
              <div
                key={project.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <p className="py-10 text-center text-gray-500">
              No projects found.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
