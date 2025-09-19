import { useState } from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/custom/Container";
import { Card } from "@/components/ui/Card";
import { BLOG_DATA } from "@/constants";

const allTags = Array.from(new Set(BLOG_DATA.flatMap((post) => post.tags)));

const BlogGrid: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = BLOG_DATA.filter((post) => {
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-20">
      <Container>
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-midnight-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === "All"
                    ? "bg-mint-600 text-white"
                    : "bg-midnight-100 text-midnight-700 hover:bg-midnight-200"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === tag
                      ? "bg-mint-600 text-white"
                      : "bg-midnight-100 text-midnight-700 hover:bg-midnight-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-mint-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {post.tags[0]}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-midnight-500 mb-3">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(post.date)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-midnight-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-midnight-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-mint-600 font-medium hover:text-mint-700 transition-colors"
                >
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-midnight-700 mb-2">
              No articles found
            </h3>
            <p className="text-midnight-600">
              Try adjusting your search terms or filter selection.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default BlogGrid;
