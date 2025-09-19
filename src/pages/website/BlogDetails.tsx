import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  MessageCircle,
  Send,
} from "lucide-react";
import SEO from "@/components/custom/SEO";
import Container from "@/components/custom/Container";
import { Card } from "@/components/ui/Card";
import type { BlogPost } from "@/types";

// Mock blog post data - in a real app, this would come from an API
const blogPost: BlogPost = {
  id: 1,
  title: "The Future of Web Development in 2024",
  excerpt:
    "Explore the latest trends and technologies that will shape web development in the coming year.",
  content: `
    <h2>Introduction</h2>
    <p>As we approach 2024, the landscape of web development continues to evolve at an unprecedented pace. New technologies, frameworks, and methodologies are emerging that promise to revolutionize how we build and deploy web applications.</p>
    
    <h2>Key Trends to Watch</h2>
    <h3>1. AI-Powered Development Tools</h3>
    <p>Artificial Intelligence is becoming increasingly integrated into development workflows. From code completion to automated testing, AI tools are helping developers write better code faster.</p>
    
    <h3>2. WebAssembly (WASM)</h3>
    <p>WebAssembly continues to gain traction, enabling high-performance applications to run in the browser. This technology is particularly promising for gaming, video editing, and other compute-intensive applications.</p>
    
    <h3>3. Edge Computing</h3>
    <p>With the rise of edge computing, web applications are moving closer to users, reducing latency and improving performance. This trend is especially important for global applications.</p>
    
    <h2>Framework Evolution</h2>
    <p>React, Vue, and Angular continue to dominate the frontend landscape, but we're seeing new approaches like Svelte and Solid gaining popularity for their performance benefits.</p>
    
    <h2>Conclusion</h2>
    <p>The future of web development is bright, with exciting new technologies on the horizon. Staying current with these trends will be crucial for developers looking to build cutting-edge applications.</p>
  `,
  author: "Sarah Johnson",
  date: "2024-01-15",
  image:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
  tags: ["Web Development", "Technology", "Trends"],
  slug: "future-of-web-development-2024",
};

const relatedPosts: BlogPost[] = [
  {
    id: 2,
    title: "Building Scalable Mobile Applications",
    excerpt:
      "Learn the best practices for creating mobile apps that can handle millions of users.",
    content: "Full article content here...",
    author: "Mike Chen",
    date: "2024-01-10",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    tags: ["Mobile Development", "Scalability"],
    slug: "building-scalable-mobile-applications",
  },
  {
    id: 3,
    title: "AI and Machine Learning in Modern Applications",
    excerpt:
      "Discover how AI and ML are transforming the way we build and use applications.",
    content: "Full article content here...",
    author: "Emily Rodriguez",
    date: "2024-01-05",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    tags: ["AI", "Machine Learning"],
    slug: "ai-machine-learning-modern-applications",
  },
];

// Mock comments data
const initialComments: Comment[] = [
  {
    id: 1,
    author: "John Smith",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    content:
      "Great article! I especially liked the section about AI-powered development tools. It's amazing how much these tools have evolved in recent years.",
    date: "2024-01-16T10:30:00Z",
    replies: [
      {
        id: 2,
        author: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
        content:
          "Thanks John! Yes, AI tools are really changing the game. What specific AI tools are you using in your workflow?",
        date: "2024-01-16T11:15:00Z",
        replies: [],
      },
    ],
  },
  {
    id: 3,
    author: "Mike Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    content:
      "The WebAssembly section was very informative. I've been looking into WASM for performance-critical applications. Any recommendations for getting started?",
    date: "2024-01-16T14:20:00Z",
    replies: [],
  },
  {
    id: 4,
    author: "Emily Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    content:
      "Edge computing is definitely the future. We've seen significant performance improvements after implementing edge functions. Great insights!",
    date: "2024-01-16T16:45:00Z",
    replies: [],
  },
];

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  replies: Comment[];
}

const BlogDetails: React.FC = () => {
  // const { slug } = useParams<{ slug: string }>();
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // In a real app, you would fetch the blog post and comments based on the slug
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState<{ [key: number]: string }>({});
  const [showReplyForm, setShowReplyForm] = useState<{
    [key: number]: boolean;
  }>({});

  // In a real app, you would fetch the blog post based on the slug
  // For now, we're using mock data

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "Anonymous User",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0c3778df9?w=50&h=50&fit=crop&crop=face",
        content: newComment,
        date: new Date().toISOString(),
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleSubmitReply = (commentId: number) => {
    const replyContent = newReply[commentId];
    if (replyContent?.trim()) {
      const reply: Comment = {
        id: Date.now(),
        author: "Anonymous User",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0c3778df9?w=50&h=50&fit=crop&crop=face",
        content: replyContent,
        date: new Date().toISOString(),
        replies: [],
      };

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
      );

      setNewReply({ ...newReply, [commentId]: "" });
      setShowReplyForm({ ...showReplyForm, [commentId]: false });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <SEO
        title={blogPost.title}
        description={blogPost.excerpt}
        keywords={[
          ...blogPost.tags,
          "web development",
          "technology",
          "trends",
          "blog",
          "article",
        ]}
        url={`/blog/${blogPost.slug}`}
        type="article"
        author={blogPost.author}
        publishedTime={blogPost.date}
        modifiedTime={blogPost.date}
        section="Technology"
        tags={blogPost.tags}
        image={blogPost.image}
      />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-midnight-900 to-mint-600 text-white py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center text-mint-100 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Link>

              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {blogPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-mint-600 text-white px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {blogPost.title}
                </h1>
                <p className="text-xl text-mint-100 mb-8">{blogPost.excerpt}</p>

                <div className="flex items-center gap-6 text-mint-100">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Article Content */}
        <section className="py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <Card className="mb-8">
                    <img
                      src={blogPost.image}
                      alt={blogPost.title}
                      className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
                    />
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: blogPost.content }}
                    />
                  </Card>

                  {/* Article Actions */}
                  <div className="flex items-center justify-between py-6 border-t border-midnight-100">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-midnight-600 hover:text-mint-600 transition-colors">
                        <Share2 size={16} />
                        Share
                      </button>
                      <button className="flex items-center gap-2 text-midnight-600 hover:text-mint-600 transition-colors">
                        <Bookmark size={16} />
                        Bookmark
                      </button>
                    </div>
                    <Link
                      to="/blog"
                      className="text-mint-600 hover:text-mint-700 font-medium"
                    >
                      ← Back to Blog
                    </Link>
                  </div>

                  {/* Comments Section */}
                  <Card className="mt-8">
                    <div className="flex items-center gap-2 mb-6">
                      <MessageCircle size={20} className="text-mint-600" />
                      <h3 className="text-xl font-bold text-midnight-900">
                        Comments ({comments.length})
                      </h3>
                    </div>

                    {/* Comment Form */}
                    <form onSubmit={handleSubmitComment} className="mb-8">
                      <div className="flex gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0c3778df9?w=50&h=50&fit=crop&crop=face"
                          alt="Your avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full px-4 py-3 border border-midnight-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent resize-none"
                            rows={3}
                          />
                          <div className="flex justify-end mt-3">
                            <button
                              type="submit"
                              disabled={!newComment.trim()}
                              className="flex items-center gap-2 px-4 py-2 bg-mint-600 text-white rounded-lg hover:bg-mint-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Send size={16} />
                              Post Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="border-b border-midnight-100 pb-6 last:border-b-0"
                        >
                          <div className="flex gap-4">
                            <img
                              src={comment.avatar}
                              alt={comment.author}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-midnight-900">
                                  {comment.author}
                                </span>
                                <span className="text-sm text-midnight-500">
                                  {formatDate(comment.date)}
                                </span>
                              </div>
                              <p className="text-midnight-700 mb-3">
                                {comment.content}
                              </p>
                              <button
                                onClick={() =>
                                  setShowReplyForm({
                                    ...showReplyForm,
                                    [comment.id]: !showReplyForm[comment.id],
                                  })
                                }
                                className="text-sm text-mint-600 hover:text-mint-700 font-medium"
                              >
                                Reply
                              </button>

                              {/* Reply Form */}
                              {showReplyForm[comment.id] && (
                                <div className="mt-4 ml-4">
                                  <div className="flex gap-4">
                                    <img
                                      src="https://images.unsplash.com/photo-1535713875002-d1d0c3778df9?w=50&h=50&fit=crop&crop=face"
                                      alt="Your avatar"
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                      <textarea
                                        value={newReply[comment.id] || ""}
                                        onChange={(e) =>
                                          setNewReply({
                                            ...newReply,
                                            [comment.id]: e.target.value,
                                          })
                                        }
                                        placeholder="Write a reply..."
                                        className="w-full px-3 py-2 border border-midnight-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent resize-none text-sm"
                                        rows={2}
                                      />
                                      <div className="flex gap-2 mt-2">
                                        <button
                                          onClick={() =>
                                            handleSubmitReply(comment.id)
                                          }
                                          disabled={
                                            !newReply[comment.id]?.trim()
                                          }
                                          className="flex items-center gap-1 px-3 py-1 bg-mint-600 text-white rounded text-sm hover:bg-mint-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                          <Send size={12} />
                                          Reply
                                        </button>
                                        <button
                                          onClick={() =>
                                            setShowReplyForm({
                                              ...showReplyForm,
                                              [comment.id]: false,
                                            })
                                          }
                                          className="px-3 py-1 text-midnight-600 hover:text-midnight-800 text-sm transition-colors"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Replies */}
                              {comment.replies.length > 0 && (
                                <div className="mt-4 ml-4 space-y-4">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex gap-4">
                                      <img
                                        src={reply.avatar}
                                        alt={reply.author}
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-semibold text-midnight-900 text-sm">
                                            {reply.author}
                                          </span>
                                          <span className="text-xs text-midnight-500">
                                            {formatDate(reply.date)}
                                          </span>
                                        </div>
                                        <p className="text-midnight-700 text-sm">
                                          {reply.content}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="mb-8">
                    <h3 className="text-lg font-bold text-midnight-900 mb-4">
                      About the Author
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                        alt={blogPost.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-midnight-900">
                          {blogPost.author}
                        </div>
                        <div className="text-sm text-midnight-600">
                          Senior Developer
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-midnight-600">
                      Sarah is a senior developer with over 10 years of
                      experience in web development and emerging technologies.
                    </p>
                  </Card>

                  <Card>
                    <h3 className="text-lg font-bold text-midnight-900 mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag) => (
                        <Link
                          key={tag}
                          to={`/blog?tag=${tag}`}
                          className="text-xs bg-mint-50 text-mint-600 px-3 py-1 rounded-full hover:bg-mint-100 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Posts */}
        <section className="bg-midnight-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-midnight-900 mb-8">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-midnight-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {post.author}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-midnight-900 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-midnight-600 mb-4">{post.excerpt}</p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-mint-600 hover:text-mint-700 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default BlogDetails;
