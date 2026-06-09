import { getContentfulProjects } from '@/lib/contentful';
import Container from '../ui/Container';
import ProjectCard from '../ui/ProjectCard';
import SectionLabel from '../ui/SectionLabel';

export default async function FeaturedWorksSection() {
  const allProjects = await getContentfulProjects();

  return (
    <section
      id="projects"
      aria-labelledby="featured-works-heading"
      className="bg-white py-24 sm:py-32"
    >
      <Container>
        <div className="mb-16">
          <SectionLabel viewAllHref="/work" viewAllLabel="View all work">
            <span
              id="featured-works-heading"
              className="text-brand-secondary text-sm font-bold tracking-widest uppercase"
            >
              Featured works
            </span>
          </SectionLabel>
        </div>

        <div className="flex flex-col gap-12 sm:gap-16">
          {allProjects.length > 0 ? (
            allProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="text-brand-secondary py-20 text-center">
              No projects found.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
