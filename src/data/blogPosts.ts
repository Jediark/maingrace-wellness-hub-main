import blogHerbalWisdom from "@/assets/blog-herbal-wisdom.png";
import blogImmuneBoost from "@/assets/blog-immune-boost.png";
import blogDiabetes from "@/assets/blog-diabetes.png";
import blogGutHealth from "@/assets/blog-gut-health.png";
import blogSleepRemedy from "@/assets/blog-sleep-remedy.png";
import blogFertility from "@/assets/blog-fertility.png";

export const blogImages = {
  wisdom: blogHerbalWisdom,
  immune: blogImmuneBoost,
  diabetes: blogDiabetes,
  gut: blogGutHealth,
  sleep: blogSleepRemedy,
  fertility: blogFertility
};

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  image?: string;
}

export const blogCategories = [
  "All",
  "Traditional Medicine",
  "Wellness Tips",
  "Chronic Care",
  "Fertility",
  "Sleep Health",
  "Nutrition",
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "ancient-wisdom-nigerian-herbal-medicine",
    title: "The Ancient Wisdom of Nigerian Herbal Medicine",
    excerpt: "Explore the rich history of traditional healing practices in Nigeria and how they continue to benefit modern health seekers.",
    content: `
      <p>Nigeria has a rich heritage of traditional medicine that dates back thousands of years. Long before the introduction of Western medicine, our ancestors relied on the healing power of plants, roots, and herbs to treat various ailments and maintain optimal health.</p>

      <h2>The Roots of Traditional Medicine</h2>
      <p>Traditional Nigerian medicine, also known as tradomedicine, is deeply intertwined with our cultural and spiritual beliefs. It encompasses not just physical healing but also addresses mental, emotional, and spiritual well-being. This holistic approach recognizes that true health comes from harmony between all aspects of our being.</p>

      <h2>Key Principles of Nigerian Herbal Medicine</h2>
      <p>Our traditional healers operate on several fundamental principles:</p>
      <ul>
        <li><strong>Nature's Pharmacy:</strong> The belief that nature provides remedies for every ailment known to humanity.</li>
        <li><strong>Holistic Treatment:</strong> Addressing the root cause of illness rather than just symptoms.</li>
        <li><strong>Preventive Care:</strong> Using herbs and lifestyle practices to prevent disease before it occurs.</li>
        <li><strong>Individualized Treatment:</strong> Recognizing that each person is unique and may require different approaches.</li>
      </ul>

      <h2>Common Medicinal Plants Used</h2>
      <p>Nigeria is blessed with diverse vegetation that provides numerous medicinal plants:</p>
      <ul>
        <li><strong>Bitter Leaf (Vernonia amygdalina):</strong> Used for treating fever, diabetes, and digestive issues.</li>
        <li><strong>Moringa (Moringa oleifera):</strong> Known as the "miracle tree" for its nutritional and healing properties.</li>
        <li><strong>Neem (Azadirachta indica):</strong> Used for treating skin conditions and boosting immunity.</li>
        <li><strong>Ginger (Zingiber officinale):</strong> Excellent for digestive health and inflammation.</li>
      </ul>

      <h2>Modern Integration</h2>
      <p>Today, we at MAINGRACE GLOBAL LIMITED combine this ancestral wisdom with modern understanding. We ensure our treatments are safe, effective, and prepared under hygienic conditions while maintaining the traditional principles that have healed generations.</p>

      <h2>Conclusion</h2>
      <p>The wisdom of Nigerian traditional medicine remains as relevant today as it was centuries ago. As more people seek natural alternatives to synthetic drugs, tradomedical practice offers time-tested solutions backed by generations of successful healing.</p>
    `,
    category: "Traditional Medicine",
    author: "Dr. (Mrs) Folashade Adetifa Dawodu",
    authorRole: "Founder & Chief Herbalist",
    date: "January 5, 2026",
    readTime: "8 min read",
    featured: true,
    tags: ["Traditional Medicine", "Nigerian Herbs", "Natural Healing", "Heritage"],
    image: blogHerbalWisdom,
  },
  {
    id: 2,
    slug: "herbs-boosting-immune-system",
    title: "5 Powerful Herbs for Boosting Your Immune System",
    excerpt: "Discover the most effective natural immune boosters used in tradomedical practice to keep you healthy year-round.",
    content: `
      <p>A strong immune system is your body's first line of defense against illness. Here are five powerful herbs that have been used for centuries to strengthen immunity naturally.</p>

      <h2>1. Echinacea (Coneflower)</h2>
      <p>Echinacea has been used for centuries to fight infections. Studies show it can reduce the risk of catching a cold by up to 58% and shorten cold duration by 1-4 days.</p>

      <h2>2. Elderberry</h2>
      <p>Rich in antioxidants and vitamins, elderberry has powerful immune-boosting properties. It's particularly effective against viral infections.</p>

      <h2>3. Astragalus Root</h2>
      <p>A staple in traditional medicine, astragalus helps stimulate the immune system and has adaptogenic properties that help the body resist stress.</p>

      <h2>4. Turmeric</h2>
      <p>The active compound curcumin in turmeric has powerful anti-inflammatory and antioxidant effects that support immune function.</p>

      <h2>5. Ginger</h2>
      <p>Beyond its digestive benefits, ginger has antimicrobial properties and helps fight infections naturally.</p>

      <h2>How to Use These Herbs</h2>
      <p>At MAINGRACE GLOBAL LIMITED, we incorporate these immune-boosting herbs into our Herbal Tonic Immune Booster, making it easy to get these benefits in one convenient preparation.</p>
    `,
    category: "Wellness Tips",
    author: "Dr. (Mrs) Folashade Adetifa Dawodu",
    authorRole: "Founder & Chief Herbalist",
    date: "January 2, 2026",
    readTime: "6 min read",
    featured: false,
    tags: ["Immune System", "Herbs", "Natural Remedies", "Wellness"],
    image: blogImmuneBoost,
  },
  {
    id: 3,
    slug: "managing-diabetes-naturally",
    title: "Managing Diabetes Naturally: A Holistic Approach",
    excerpt: "Learn how combining dietary changes, herbal remedies, and lifestyle modifications can help manage blood sugar levels.",
    content: `
      <p>Diabetes management goes beyond medication. A holistic approach that includes diet, lifestyle, and natural remedies can significantly improve blood sugar control and overall quality of life.</p>

      <h2>Understanding Blood Sugar</h2>
      <p>Blood sugar regulation is a complex process involving the pancreas, liver, muscles, and fat tissue. When this system is out of balance, diabetes can develop.</p>

      <h2>Natural Approaches to Blood Sugar Management</h2>
      <h3>Dietary Changes</h3>
      <ul>
        <li>Focus on low glycemic foods</li>
        <li>Increase fiber intake</li>
        <li>Include healthy fats</li>
        <li>Reduce processed foods</li>
      </ul>

      <h3>Herbal Support</h3>
      <p>Several herbs have shown promise in supporting blood sugar management:</p>
      <ul>
        <li><strong>Bitter Melon:</strong> Contains compounds that mimic insulin</li>
        <li><strong>Cinnamon:</strong> Improves insulin sensitivity</li>
        <li><strong>Fenugreek:</strong> Slows carbohydrate absorption</li>
        <li><strong>Gymnema Sylvestre:</strong> Reduces sugar cravings</li>
      </ul>

      <h2>Lifestyle Modifications</h2>
      <p>Regular exercise, stress management, and adequate sleep are crucial for blood sugar control.</p>

      <h2>Working with Professionals</h2>
      <p>Always work with healthcare providers when managing diabetes. Natural remedies can complement but should not replace medical treatment.</p>
    `,
    category: "Chronic Care",
    author: "Dr. (Mrs) Folashade Adetifa Dawodu",
    authorRole: "Founder & Chief Herbalist",
    date: "December 28, 2025",
    readTime: "10 min read",
    featured: false,
    tags: ["Diabetes", "Blood Sugar", "Natural Management", "Chronic Care"],
    image: blogDiabetes,
  },
  {
    id: 4,
    slug: "gut-health-overall-wellness",
    title: "The Connection Between Gut Health and Overall Wellness",
    excerpt: "Understanding how your digestive system affects everything from immunity to mental health, and natural ways to improve it.",
    content: `
      <p>Your gut is often called the "second brain" for good reason. The health of your digestive system affects nearly every aspect of your well-being.</p>

      <h2>The Gut-Health Connection</h2>
      <p>The gut houses 70% of your immune system and produces 95% of your body's serotonin. This makes gut health crucial for both physical and mental wellness.</p>

      <h2>Signs of Poor Gut Health</h2>
      <ul>
        <li>Digestive issues (bloating, gas, constipation)</li>
        <li>Frequent infections</li>
        <li>Mood disturbances</li>
        <li>Skin problems</li>
        <li>Fatigue</li>
      </ul>

      <h2>Natural Ways to Improve Gut Health</h2>
      <h3>Fermented Foods</h3>
      <p>Incorporate traditional fermented foods like ogi, dawadawa, and locust beans for natural probiotics.</p>

      <h3>Herbal Support</h3>
      <p>Herbs like ginger, peppermint, and fennel can soothe digestive discomfort and support healthy gut function.</p>

      <h3>Fiber-Rich Foods</h3>
      <p>Feed your beneficial gut bacteria with plenty of fiber from vegetables, fruits, and whole grains.</p>
    `,
    category: "Wellness Tips",
    author: "Dr. (Mrs) Folashade Adetifa Dawodu",
    authorRole: "Founder & Chief Herbalist",
    date: "December 20, 2025",
    readTime: "7 min read",
    featured: false,
    tags: ["Gut Health", "Digestion", "Wellness", "Immune System"],
    image: blogGutHealth,
  },
  {
    id: 5,
    slug: "natural-remedies-better-sleep",
    title: "Natural Remedies for Better Sleep",
    excerpt: "Struggling with insomnia? Explore traditional herbs and practices that promote restful, rejuvenating sleep.",
    content: `
      <p>Quality sleep is essential for health, yet many people struggle with insomnia and poor sleep quality. Traditional medicine offers gentle, effective solutions.</p>

      <h2>Why Sleep Matters</h2>
      <p>During sleep, your body repairs tissues, consolidates memories, and regulates hormones. Chronic sleep deprivation increases risk for many health problems.</p>

      <h2>Herbs for Better Sleep</h2>
      <ul>
        <li><strong>Chamomile:</strong> Calms the nervous system and promotes relaxation</li>
        <li><strong>Valerian Root:</strong> Improves sleep quality and reduces time to fall asleep</li>
        <li><strong>Lavender:</strong> Reduces anxiety and promotes calm</li>
        <li><strong>Passionflower:</strong> Helps with racing thoughts at bedtime</li>
      </ul>

      <h2>Sleep Hygiene Practices</h2>
      <ul>
        <li>Maintain consistent sleep and wake times</li>
        <li>Create a dark, cool sleeping environment</li>
        <li>Avoid screens 1-2 hours before bed</li>
        <li>Limit caffeine after noon</li>
      </ul>

      <h2>Evening Routine</h2>
      <p>A relaxing evening routine signals to your body that it's time to wind down. Consider warm baths, herbal tea, and gentle stretching.</p>
    `,
    category: "Sleep Health",
    author: "Dr. (Mrs) Folashade Adetifa Dawodu",
    authorRole: "Founder & Chief Herbalist",
    date: "December 15, 2025",
    readTime: "5 min read",
    featured: true,
    tags: ["Sleep", "Insomnia", "Herbal Remedies", "Relaxation"],
    image: blogSleepRemedy,
  },
  {
    id: 6,
    slug: "fertility-traditional-medicine",
    title: "Fertility and Traditional Medicine: What Science Says",
    excerpt: "An evidence-based look at how traditional herbal remedies can support reproductive health for both men and women.",
    content: `
      <p>Fertility challenges affect millions of couples worldwide. Traditional medicine has long offered support for reproductive health, and modern research is beginning to validate many of these practices.</p>

      <h2>Understanding Fertility</h2>
      <p>Fertility depends on complex hormonal balances, healthy reproductive organs, and overall wellness in both partners.</p>

      <h2>Traditional Herbs for Women's Fertility</h2>
      <ul>
        <li><strong>Vitex (Chaste Tree Berry):</strong> Helps regulate hormonal balance</li>
        <li><strong>Red Raspberry Leaf:</strong> Tones the uterus and supports overall reproductive health</li>
        <li><strong>Dong Quai:</strong> Known as "female ginseng" for its hormonal balancing properties</li>
        <li><strong>Maca Root:</strong> Supports hormonal balance and increases energy</li>
      </ul>

      <h2>Traditional Herbs for Men's Fertility</h2>
      <ul>
        <li><strong>Ashwagandha:</strong> Improves sperm quality and testosterone levels</li>
        <li><strong>Tribulus:</strong> Supports healthy testosterone production</li>
        <li><strong>Ginseng:</strong> Enhances overall vitality and reproductive function</li>
      </ul>

      <h2>Holistic Approach</h2>
      <p>At MAINGRACE GLOBAL LIMITED, we take a comprehensive approach to fertility support, addressing nutrition, stress, and overall health alongside herbal treatment.</p>
    `,
    category: "Fertility",
    author: "Dr. (Mrs) Folashade Adetifa Dawodu",
    authorRole: "Founder & Chief Herbalist",
    date: "December 10, 2025",
    readTime: "9 min read",
    featured: false,
    tags: ["Fertility", "Reproductive Health", "Traditional Medicine", "Women's Health", "Men's Health"],
    image: blogFertility,
  },
];
