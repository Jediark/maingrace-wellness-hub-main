import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { 
  useProducts, 
  useBlogPosts, 
  useConsultationRequests, 
  useContactInquiries,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
  useAddBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost
} from "@/hooks/useSupabase";
import { 
  Plus, Edit2, Trash2, Loader2, Lock, Eye, Calendar, 
  Mail, Phone, User, Image, FileText, Settings, RefreshCw, MessageSquare, Bell
} from "lucide-react";
import { toast } from "sonner";
import { useSEO } from "@/hooks/useSEO";

const Admin = () => {
  useSEO({
    title: "Admin Portal | Maingrace Manager",
    description: "Manage products, blog posts, consultations, and contact inquiries for Maingrace Tradomedical Service.",
    keywords: "admin dashboard, maingrace manager"
  });

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "blogs" | "bookings" | "inquiries">("products");

  // Admin CRUD states
  const [productForm, setProductForm] = useState<any>(null);
  const [blogForm, setBlogForm] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Queries
  const { data: products, isLoading: isLoadingProducts, refetch: refetchProducts } = useProducts();
  const { data: blogs, isLoading: isLoadingBlogs, refetch: refetchBlogs } = useBlogPosts();
  const { data: bookings, isLoading: isLoadingBookings, refetch: refetchBookings } = useConsultationRequests();
  const { data: inquiries, isLoading: isLoadingInquiries, refetch: refetchInquiries } = useContactInquiries();

  // Mutations
  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const addBlogMutation = useAddBlogPost();
  const updateBlogMutation = useUpdateBlogPost();
  const deleteBlogMutation = useDeleteBlogPost();

  // Pending bookings count
  const pendingBookingsCount = bookings?.filter((b: any) => b.status === "pending" || !b.status).length || 0;


  useEffect(() => {
    const isAuth = sessionStorage.getItem("maingrace_admin_authenticated") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "DaS%0idm$@") {
      setIsAuthenticated(true);
      sessionStorage.setItem("maingrace_admin_authenticated", "true");
      toast.success("Successfully authenticated as Admin!");
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("maingrace_admin_authenticated");
    toast.success("Logged out successfully.");
  };

  // File Upload Helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "product" | "blog" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${type === "video" ? "videos" : `${type}s`}/${fileName}`;

      // Upload directly to lowercase 'images' bucket
      const uploadResult = await supabase.storage
        .from("images")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadResult.error) {
        throw new Error(
          `Supabase upload error: ${uploadResult.error.message}. Please verify that your storage bucket 'images' has insert permissions enabled for anon/public in your Supabase policies.`
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(uploadResult.data.path);

      if (type === "product") {
        setProductForm((prev: any) => ({ ...prev, image: publicUrlData.publicUrl }));
      } else if (type === "blog") {
        setBlogForm((prev: any) => ({ ...prev, image_url: publicUrlData.publicUrl }));
      } else if (type === "video") {
        setBlogForm((prev: any) => ({ ...prev, video_url: publicUrlData.publicUrl }));
      }
      toast.success("File uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to upload file. Please try pasting a direct file URL instead.");
    } finally {
      setIsUploading(false);
    }
  };

  // Product Submit
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: productForm.name,
        category: productForm.category,
        description: productForm.description,
        image_url: productForm.image,
        in_stock: productForm.inStock,
        bestseller: productForm.bestseller,
        rating: parseFloat(productForm.rating || "4.5"),
        reviews: parseInt(productForm.reviews || "10"),
        features: typeof productForm.features === "string" 
          ? productForm.features.split(",").map((f: string) => f.trim()).filter(Boolean)
          : productForm.features
      };

      if (productForm.id) {
        await updateProductMutation.mutateAsync({ id: productForm.id, ...payload });
        toast.success("Product updated successfully!");
      } else {
        await addProductMutation.mutateAsync(payload);
        toast.success("Product created successfully!");
      }
      setProductForm(null);
    } catch (err) {
      toast.error("Failed to save product.");
    }
  };

  // Blog Submit
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: blogForm.title,
        slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        category: blogForm.category,
        author: blogForm.author || "Dr. (Mrs) Folashade Adetifa Dawodu",
        author_role: blogForm.author_role || "Founder & Chief Herbalist",
        date: blogForm.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        read_time: blogForm.read_time || "5 min read",
        image_url: blogForm.image_url,
        video_url: blogForm.video_url || "",
        featured: blogForm.featured,
        tags: typeof blogForm.tags === "string" 
          ? blogForm.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
          : blogForm.tags
      };

      if (blogForm.id) {
        await updateBlogMutation.mutateAsync({ id: blogForm.id, ...payload });
        toast.success("Blog post updated successfully!");
      } else {
        await addBlogMutation.mutateAsync(payload);
        toast.success("Blog post published successfully!");
      }
      setBlogForm(null);
    } catch (err) {
      toast.error("Failed to save blog post.");
    }
  };

  const deleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductMutation.mutateAsync(id);
        toast.success("Product deleted.");
      } catch (err) {
        toast.error("Failed to delete product.");
      }
    }
  };

  const deleteBlog = async (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlogMutation.mutateAsync(id);
        toast.success("Blog post deleted.");
      } catch (err) {
        toast.error("Failed to delete blog post.");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-md bg-card border-4 border-primary shadow-glow rounded-none">
            <CardHeader className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-2 border-primary">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-serif font-bold">Admin Verification</CardTitle>
              <CardDescription className="font-semibold text-muted-foreground">
                Enter your administrative key to manage products and posts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Secure Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="rounded-none border-2 border-border focus:border-primary h-12 text-center text-lg font-bold"
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full h-12 rounded-none font-bold text-lg">
                  Access Portal
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted min-h-screen py-10 border-t-8 border-primary">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b-2 border-border gap-4">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
                Administrative Control Panel
              </span>
              <h1 className="text-4xl font-serif font-bold text-foreground">
                Maingrace247 <span className="text-primary italic">Manager</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button 
                onClick={() => { setActiveTab("bookings"); toast.info(`You have ${pendingBookingsCount} pending consultation bookings.`); }}
                className="relative p-2.5 bg-background border-2 border-border hover:border-primary text-foreground transition-all duration-300 shadow-sm"
                title={`${pendingBookingsCount} pending bookings`}
              >
                <Bell className="w-5 h-5 animate-pulse-gentle" />
                {pendingBookingsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce">
                    {pendingBookingsCount}
                  </span>
                )}
              </button>

              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="rounded-none border-2 border-primary font-bold text-primary hover:bg-primary hover:text-white"
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-3 pb-4 mb-8 border-b border-border no-scrollbar">
            {(["products", "blogs", "bookings", "inquiries"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setProductForm(null); setBlogForm(null); }}
                className={`px-6 py-3 rounded-none text-xs md:text-sm font-bold uppercase tracking-wider border-2 transition-all shrink-0 ${
                  activeTab === tab
                    ? "bg-primary text-white border-primary shadow-soft"
                    : "bg-background text-foreground border-border hover:border-primary"
                }`}
              >
                {tab === "products" && "📦 Products"}
                {tab === "blogs" && "✍️ Blog Posts"}
                {tab === "bookings" && "📅 Consultations"}
                {tab === "inquiries" && "💬 Inquiries"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            
            {/* 📦 PRODUCTS TAB */}
            {activeTab === "products" && (
              <div className="space-y-6">
                {!productForm ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-card p-6 border-2 border-border">
                      <div>
                        <h2 className="text-2xl font-serif font-bold">Catalog Management</h2>
                        <p className="text-sm text-muted-foreground font-medium">Add, update, or remove products from the catalog.</p>
                      </div>
                      <Button 
                        variant="hero" 
                        onClick={() => setProductForm({ name: "", category: "Immunity", description: "", image: "", rating: "4.8", reviews: "10", features: "", bestseller: false, inStock: true })}
                        className="rounded-none font-bold"
                      >
                        <Plus className="w-5 h-5 mr-2" /> Add Product
                      </Button>
                    </div>

                    {isLoadingProducts ? (
                      <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products?.map((product: any) => (
                          <Card key={product.id} className="rounded-none bg-card border-2 border-border shadow-card hover:border-primary transition-all flex flex-col justify-between">
                            <div className="p-6 space-y-4">
                              <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden border border-border">
                                <img 
                                  src={product.image_url || product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/images/products/product-herbal-tonic.png";
                                  }}
                                />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">{product.category}</span>
                                <h3 className="text-xl font-serif font-bold truncate mt-1">{product.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-3 mt-2 font-medium">{product.description}</p>
                              </div>
                            </div>
                            <div className="p-6 border-t border-border flex gap-2 bg-muted/30">
                              <Button 
                                variant="outline" 
                                className="w-full rounded-none border-border"
                                onClick={() => setProductForm({
                                  id: product.id,
                                  name: product.name,
                                  category: product.category,
                                  description: product.description,
                                  image: product.image_url || product.image,
                                  rating: product.rating?.toString() || "4.8",
                                  reviews: product.reviews?.toString() || "10",
                                  features: Array.isArray(product.features) ? product.features.join(", ") : product.features,
                                  bestseller: product.bestseller,
                                  inStock: product.in_stock ?? true
                                })}
                              >
                                <Edit2 className="w-4 h-4 mr-2" /> Edit
                              </Button>
                              <Button 
                                variant="destructive" 
                                className="rounded-none bg-red-600 hover:bg-red-700 text-white border-none"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Card className="rounded-none border-4 border-primary">
                    <CardHeader>
                      <CardTitle className="text-3xl font-serif font-bold">
                        {productForm.id ? "Edit Product" : "Add New Product"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProductSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="prod-name">Product Name</Label>
                            <Input 
                              id="prod-name" 
                              required 
                              value={productForm.name} 
                              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="prod-cat">Category</Label>
                            <select 
                              id="prod-cat"
                              value={productForm.category}
                              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                              className="w-full h-10 border-2 border-input bg-background px-3 font-bold"
                            >
                              <option value="Immunity">Immunity</option>
                              <option value="Detox">Detox</option>
                              <option value="Men's Health">Men's Health</option>
                              <option value="Women's Health">Women's Health</option>
                              <option value="STD Treatment">STD Treatment</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="prod-desc">Description</Label>
                          <Textarea 
                            id="prod-desc" 
                            required 
                            rows={4} 
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="prod-features">Features (comma-separated list)</Label>
                          <Input 
                            id="prod-features" 
                            placeholder="e.g. 100% organic, Anti-inflammatory, Rich in antioxidants"
                            value={productForm.features}
                            onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="prod-rating">Rating (e.g. 4.8)</Label>
                            <Input 
                              id="prod-rating" 
                              value={productForm.rating}
                              onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="prod-reviews">Reviews Count</Label>
                            <Input 
                              id="prod-reviews" 
                              value={productForm.reviews}
                              onChange={(e) => setProductForm({ ...productForm, reviews: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-4 bg-muted/40 p-4 border border-border">
                          <Label className="font-bold flex items-center gap-2">
                            <Image className="w-4 h-4 text-primary" /> Product Banner Image
                          </Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="prod-img-url">Option 1: Paste Direct URL</Label>
                              <Input 
                                id="prod-img-url" 
                                value={productForm.image} 
                                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="prod-img-file">Option 2: Upload Image File</Label>
                              <Input 
                                id="prod-img-file" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, "product")}
                                disabled={isUploading}
                                className="bg-background file:bg-primary file:text-white file:border-none file:px-3 file:py-1 hover:file:bg-accent file:mr-3 cursor-pointer"
                              />
                              {isUploading && <p className="text-xs text-primary font-bold flex items-center gap-2 mt-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Supabase Storage...</p>}
                            </div>
                          </div>
                          {productForm.image && (
                            <div className="mt-4 border-2 border-border p-2 max-w-[150px] aspect-square bg-muted flex items-center justify-center">
                              <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        <div className="flex gap-6">
                          <Label className="flex items-center gap-2 cursor-pointer font-bold select-none">
                            <input 
                              type="checkbox" 
                              checked={productForm.bestseller} 
                              onChange={(e) => setProductForm({ ...productForm, bestseller: e.target.checked })}
                              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                            />
                            Bestseller Product
                          </Label>
                          <Label className="flex items-center gap-2 cursor-pointer font-bold select-none">
                            <input 
                              type="checkbox" 
                              checked={productForm.inStock} 
                              onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                            />
                            In Stock
                          </Label>
                        </div>

                        <div className="flex gap-4">
                          <Button type="submit" variant="hero" className="rounded-none font-bold" disabled={addProductMutation.isPending || updateProductMutation.isPending}>
                            {(addProductMutation.isPending || updateProductMutation.isPending) ? "Saving..." : "Save Product"}
                          </Button>
                          <Button type="button" variant="outline" className="rounded-none" onClick={() => setProductForm(null)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* ✍️ BLOGS TAB */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                {!blogForm ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-card p-6 border-2 border-border">
                      <div>
                        <h2 className="text-2xl font-serif font-bold">Blog Management</h2>
                        <p className="text-sm text-muted-foreground font-medium">Compose, publish, and edit articles on natural healing.</p>
                      </div>
                      <Button 
                        variant="hero" 
                        onClick={() => setBlogForm({ title: "", slug: "", excerpt: "", content: "", category: "Wellness Tips", author: "Dr. (Mrs) Folashade Adetifa Dawodu", author_role: "Founder & Chief Herbalist", image_url: "", video_url: "", featured: false, tags: "" })}
                        className="rounded-none font-bold"
                      >
                        <Plus className="w-5 h-5 mr-2" /> Write Article
                      </Button>
                    </div>

                    {isLoadingBlogs ? (
                      <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs?.map((blog: any) => (
                          <Card key={blog.id} className="rounded-none bg-card border-2 border-border shadow-card hover:border-primary transition-all flex flex-col justify-between">
                            <div className="p-6 space-y-4">
                              <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden border border-border">
                                <img 
                                  src={blog.image_url} 
                                  alt={blog.title} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/images/blog/blog-herbal-wisdom.png";
                                  }}
                                />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">{blog.category}</span>
                                <h3 className="text-xl font-serif font-bold line-clamp-2 mt-1">{blog.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-3 mt-2 font-medium">{blog.excerpt}</p>
                              </div>
                            </div>
                            <div className="p-6 border-t border-border flex gap-2 bg-muted/30">
                              <Button 
                                variant="outline" 
                                className="w-full rounded-none border-border"
                                onClick={() => setBlogForm({
                                  id: blog.id,
                                  title: blog.title,
                                  slug: blog.slug,
                                  excerpt: blog.excerpt,
                                  content: blog.content,
                                  category: blog.category,
                                  author: blog.author,
                                  author_role: blog.author_role,
                                  date: blog.date,
                                  read_time: blog.read_time,
                                  image_url: blog.image_url,
                                  video_url: blog.video_url || "",
                                  featured: blog.featured,
                                  tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags
                                })}
                              >
                                <Edit2 className="w-4 h-4 mr-2" /> Edit
                              </Button>
                              <Button 
                                variant="destructive" 
                                className="rounded-none bg-red-600 hover:bg-red-700 text-white border-none"
                                onClick={() => deleteBlog(blog.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Card className="rounded-none border-4 border-primary">
                    <CardHeader>
                      <CardTitle className="text-3xl font-serif font-bold">
                        {blogForm.id ? "Edit Article" : "Compose New Article"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleBlogSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="blog-title">Article Title</Label>
                            <Input 
                              id="blog-title" 
                              required 
                              value={blogForm.title} 
                              onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="blog-slug">URL Slug (leave blank to auto-generate)</Label>
                            <Input 
                              id="blog-slug" 
                              placeholder="e.g. natural-detox-secrets"
                              value={blogForm.slug} 
                              onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="blog-cat">Category</Label>
                            <select 
                              id="blog-cat"
                              value={blogForm.category}
                              onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                              className="w-full h-10 border-2 border-input bg-background px-3 font-bold"
                            >
                              <option value="Traditional Medicine">Traditional Medicine</option>
                              <option value="Wellness Tips">Wellness Tips</option>
                              <option value="Chronic Care">Chronic Care</option>
                              <option value="Sleep Health">Sleep Health</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="blog-tags">Tags (comma-separated list)</Label>
                            <Input 
                              id="blog-tags" 
                              placeholder="e.g. Herbs, Detox, Health"
                              value={blogForm.tags}
                              onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="blog-excerpt">Short Summary (Excerpt)</Label>
                          <Textarea 
                            id="blog-excerpt" 
                            required 
                            rows={2} 
                            value={blogForm.excerpt}
                            onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="blog-content">Full Content (HTML tags supported)</Label>
                          <Textarea 
                            id="blog-content" 
                            required 
                            rows={10} 
                            value={blogForm.content}
                            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                            placeholder="<p>Type your content here...</p>"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 bg-muted/20 p-4 border border-border">
                          <div className="space-y-2">
                            <Label htmlFor="blog-author">Author</Label>
                            <Input 
                              id="blog-author" 
                              value={blogForm.author}
                              onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="blog-author-role">Author Role</Label>
                            <Input 
                              id="blog-author-role" 
                              value={blogForm.author_role}
                              onChange={(e) => setBlogForm({ ...blogForm, author_role: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-4 bg-muted/40 p-4 border border-border">
                          <Label className="font-bold flex items-center gap-2">
                            <Image className="w-4 h-4 text-primary" /> Cover Banner Image
                          </Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="blog-img-url">Option 1: Paste Direct URL</Label>
                              <Input 
                                id="blog-img-url" 
                                value={blogForm.image_url} 
                                onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="blog-img-file">Option 2: Upload Image File</Label>
                              <Input 
                                id="blog-img-file" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, "blog")}
                                disabled={isUploading}
                                className="bg-background file:bg-primary file:text-white file:border-none file:px-3 file:py-1 hover:file:bg-accent file:mr-3 cursor-pointer"
                              />
                              {isUploading && <p className="text-xs text-primary font-bold flex items-center gap-2 mt-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Supabase Storage...</p>}
                            </div>
                          </div>
                          {blogForm.image_url && (
                            <div className="mt-4 border-2 border-border p-2 max-w-[200px] aspect-video bg-muted flex items-center justify-center">
                              <img src={blogForm.image_url} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-4 bg-muted/40 p-4 border border-border">
                          <Label className="font-bold flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" /> Cover Video (Optional)
                          </Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="blog-vid-url">Option 1: Paste Video URL (supports mp4 / YouTube)</Label>
                              <Input 
                                id="blog-vid-url" 
                                value={blogForm.video_url || ""} 
                                onChange={(e) => setBlogForm({ ...blogForm, video_url: e.target.value })}
                                placeholder="https://example.com/video.mp4 or YouTube link"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="blog-vid-file">Option 2: Upload Video File</Label>
                              <Input 
                                id="blog-vid-file" 
                                type="file" 
                                accept="video/*"
                                onChange={(e) => handleFileUpload(e, "video")}
                                disabled={isUploading}
                                className="bg-background file:bg-primary file:text-white file:border-none file:px-3 file:py-1 hover:file:bg-accent file:mr-3 cursor-pointer"
                              />
                              {isUploading && <p className="text-xs text-primary font-bold flex items-center gap-2 mt-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Supabase Storage...</p>}
                            </div>
                          </div>
                          {blogForm.video_url && (
                            <div className="mt-4 border-2 border-border p-2 max-w-[300px] aspect-video bg-black flex items-center justify-center">
                              {blogForm.video_url.includes("youtube.com") || blogForm.video_url.includes("youtu.be") ? (
                                <iframe
                                  src={
                                    blogForm.video_url.includes("watch?v=")
                                      ? blogForm.video_url.replace("watch?v=", "embed/").split("&")[0]
                                      : blogForm.video_url.includes("youtu.be/")
                                      ? `https://www.youtube.com/embed/${blogForm.video_url.split("youtu.be/")[1].split("?")[0]}`
                                      : blogForm.video_url
                                  }
                                  className="w-full h-full border-none animate-in fade-in"
                                  title="Video Preview"
                                />
                              ) : (
                                <video src={blogForm.video_url} controls className="w-full h-full object-contain" />
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-6">
                          <Label className="flex items-center gap-2 cursor-pointer font-bold select-none">
                            <input 
                              type="checkbox" 
                              checked={blogForm.featured} 
                              onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                            />
                            Featured / Hero Article
                          </Label>
                        </div>

                        <div className="flex gap-4">
                          <Button type="submit" variant="hero" className="rounded-none font-bold" disabled={addBlogMutation.isPending || updateBlogMutation.isPending}>
                            {(addBlogMutation.isPending || updateBlogMutation.isPending) ? "Publishing..." : "Publish Article"}
                          </Button>
                          <Button type="button" variant="outline" className="rounded-none" onClick={() => setBlogForm(null)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* 📅 BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <Card className="rounded-none bg-card border-2 border-border">
                <CardHeader className="flex flex-row items-center justify-between border-b-2 border-border bg-muted/10 p-6">
                  <div>
                    <CardTitle className="text-2xl font-serif font-bold">Consultation Bookings</CardTitle>
                    <CardDescription className="font-semibold text-muted-foreground">List of incoming patient consultation requests.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => refetchBookings()} className="rounded-none border-border">
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoadingBookings ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
                  ) : !bookings || bookings.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground font-semibold">No bookings recorded yet.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-muted border-b border-border font-bold uppercase tracking-wider text-xs">
                            <th className="p-4">Patient</th>
                            <th className="p-4">Contact Info</th>
                            <th className="p-4">Consultation Type</th>
                            <th className="p-4">Appointment Date/Time</th>
                            <th className="p-4">Message / Concerns</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {bookings.map((booking: any) => (
                            <tr key={booking.id} className="hover:bg-muted/10">
                              <td className="p-4 font-bold text-foreground">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-primary shrink-0" />
                                  {booking.patient_name || booking.name}
                                </div>
                              </td>
                              <td className="p-4 font-medium text-muted-foreground">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-primary" /> {booking.email}</div>
                                  {booking.phone && <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary" /> {booking.phone}</div>}
                                </div>
                              </td>
                              <td className="p-4 font-bold text-primary">
                                {booking.type || "General"}
                              </td>
                              <td className="p-4 font-semibold text-foreground">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> {booking.date}</div>
                                  {booking.time && <div className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 text-primary" /> {booking.time}</div>}
                                </div>
                              </td>
                              <td className="p-4 text-muted-foreground max-w-md whitespace-pre-wrap font-medium leading-relaxed">
                                {booking.message || booking.concerns || <span className="italic text-muted-foreground/50">None</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 💬 INQUIRIES TAB */}
            {activeTab === "inquiries" && (
              <Card className="rounded-none bg-card border-2 border-border">
                <CardHeader className="flex flex-row items-center justify-between border-b-2 border-border bg-muted/10 p-6">
                  <div>
                    <CardTitle className="text-2xl font-serif font-bold">Contact Inquiries</CardTitle>
                    <CardDescription className="font-semibold text-muted-foreground">Feedback and messages from the contact page.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => refetchInquiries()} className="rounded-none border-border">
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoadingInquiries ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
                  ) : !inquiries || inquiries.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground font-semibold">No inquiries recorded yet.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-muted border-b border-border font-bold uppercase tracking-wider text-xs">
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Inquiry details</th>
                            <th className="p-4">Submission Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {inquiries.map((inq: any) => (
                            <tr key={inq.id} className="hover:bg-muted/10">
                              <td className="p-4 font-bold text-foreground">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-primary shrink-0" />
                                  {inq.name}
                                </div>
                              </td>
                              <td className="p-4 font-medium text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <Mail className="w-3.5 h-3.5 text-primary" /> {inq.email}
                                </div>
                              </td>
                              <td className="p-4 text-foreground font-medium max-w-md whitespace-pre-line leading-relaxed">
                                {inq.message}
                              </td>
                              <td className="p-4 font-semibold text-muted-foreground">
                                {inq.created_at ? new Date(inq.created_at).toLocaleString() : "Recently"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
