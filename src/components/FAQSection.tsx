import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Are Maingrace products 100% natural and safe?",
    answer: "Yes. Every remedy in our collection is formulated using 100% pure botanical extracts sourced ethically. We use no synthetic chemicals, ensuring a healing process that is safe for all ages without harmful side effects.",
  },
  {
    question: "Do I need a consultation before purchasing a product?",
    answer: "To ensure maximum clinical efficacy, we recommend a consultation. Our practitioners provide personalized health assessments to ensure the botanical system you receive is perfectly aligned with your specific recovery needs.",
  },
  {
    question: "How do I book a session with your practitioners?",
    answer: "You can book a consultation easily by clicking the 'Book Consultation' button in our navigation menu, or by choosing 'Get a Quote' on any product in our shop. We offer both physical and virtual consultation options.",
  },
  {
    question: "Are there any side effects to traditional botanical medicine?",
    answer: "Our traditional systems are designed to work in harmony with your body. Unlike synthetic drugs, our 100% natural formulas focus on restoration without the common side effects of modern pharmaceuticals.",
  },
  {
    question: "Where is your clinical facility located?",
    answer: "Our main sanctuary is located at Olowotedo/Oran Expressway, Lagos, Nigeria. We operate from 8:30 AM to 8:00 PM, Monday through Saturday, providing a serene environment for your healing journey.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-t-2 border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-bold text-sm tracking-[0.3em] uppercase mb-4">
              Patient Support
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Common <span className="text-primary italic">Inquiries</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
              Find answers to the most frequent questions about our natural healing systems 
              and clinical processes.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border-2 transition-all duration-300 ${
                  openIndex === index ? "border-primary bg-muted/30" : "border-border bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-xl font-serif font-bold transition-colors ${
                    openIndex === index ? "text-primary" : "text-foreground"
                  }`}>
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-muted-foreground font-medium leading-relaxed border-t border-border/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-primary text-center">
            <p className="text-white font-bold mb-4 italic">Still have questions about our botanical solutions?</p>
            <a 
              href="https://wa.me/2347013376463"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-primary px-8 py-3 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1"
            >
              Chat With a Practitioner
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
