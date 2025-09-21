import HeroSection from "../components/home/HeroSection";
import CTASection from "../components/home/CTASection";
import FeaturedCourses from "../components/home/FeaturedCourses";
import CategorySection from "../components/home/CategorySection";

export default function HomePage() {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategorySection />

      {/* Featured Courses Section */}
      <FeaturedCourses />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
