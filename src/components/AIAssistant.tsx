import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import logo from "@/assets/maingrace-logo.webp";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const welcomeMessages = [
  "Hello! Welcome to MAINGRACE GLOBAL LIMITED. I'm your AI assistant, here to help you with questions about our herbal remedies and services.",
  "How can I assist you today? You can ask me about:\n• Our products and treatments\n• Health concerns\n• Booking a consultation\n• Our services",
];

const responses: Record<string, string> = {
  products:
    "We offer a wide range of natural herbal products including:\n\n• Immune Boosters\n• Men's Health Treatments\n• Women's Health Packs\n• STD Treatment Packs\n• Liver & Kidney Supplements\n\nVisit our Shop page to see all products, or would you like me to tell you more about a specific category?",
  consultation:
    "We offer several consultation options:\n\n1. **In-Person Consultation** - Visit our center\n2. **Virtual Consultation** - Video call with our herbalist\n3. **Remote Consultation** - Submit your symptoms online and receive personalized recommendations\n\nWould you like me to help you book a consultation?",
  fertility:
    "We have specialized treatments for fertility support for both men and women. Our Women's Health Complete Pack includes fertility support, while our Men's Health Treatment Pack addresses male fertility issues.\n\nWould you like to learn more or book a consultation with our herbalist?",
  std: "We offer comprehensive STD treatment using natural herbal remedies. Our STD Complete Treatment Pack treats conditions like gonorrhea, staphylococcus, syphilis, and more. The treatment uses a combination of roots and leaves with no side effects.\n\nFor proper diagnosis and treatment, I recommend booking a consultation.",
  diabetes:
    "We offer natural approaches to blood sugar management including herbal formulations with bitter melon, cinnamon, and fenugreek. Our holistic approach combines dietary guidance with herbal support.\n\nWould you like to book a consultation for personalized diabetes management advice?",
  hello: "Hello! How can I help you today? Feel free to ask about our products, services, or health concerns.",
  hi: "Hi there! Welcome to MAINGRACE GLOBAL LIMITED. How may I assist you today?",
  thanks:
    "You're welcome! Is there anything else I can help you with? Feel free to ask about our products, services, or book a consultation.",
  price:
    "Our product prices vary depending on the treatment. Here are some examples:\n\n• Herbal Tonic Immune Booster: ₦15,000\n• Men's Health Treatment Pack: ₦35,000\n• Women's Health Complete Pack: ₦32,000\n• STD Complete Treatment Pack: ₦45,000\n\nVisit our Shop page for all products and prices.",
  default:
    "Thank you for your question! For personalized advice, I recommend:\n\n1. **Book a Consultation** - Speak directly with our herbalist\n2. **Remote Consultation** - Submit your symptoms online\n3. **Visit Our Shop** - Browse our herbal products\n\nIs there something specific I can help you with?",
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          { id: 1, role: "assistant", content: welcomeMessages[0] },
        ]);
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { id: 2, role: "assistant", content: welcomeMessages[1] },
            ]);
            setIsTyping(false);
          }, 1000);
        }, 500);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    if (lower.includes("product") || lower.includes("remedy") || lower.includes("medicine")) {
      return responses.products;
    }
    if (lower.includes("consult") || lower.includes("book") || lower.includes("appointment")) {
      return responses.consultation;
    }
    if (lower.includes("fertil") || lower.includes("pregnan") || lower.includes("conceive")) {
      return responses.fertility;
    }
    if (lower.includes("std") || lower.includes("gonorrh") || lower.includes("syphil") || lower.includes("staph")) {
      return responses.std;
    }
    if (lower.includes("diabet") || lower.includes("blood sugar")) {
      return responses.diabetes;
    }
    if (lower.includes("hello") || lower.includes("hey")) {
      return responses.hello;
    }
    if (lower.includes("hi")) {
      return responses.hi;
    }
    if (lower.includes("thank") || lower.includes("bye")) {
      return responses.thanks;
    }
    if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
      return responses.price;
    }
    return responses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getResponse(userMessage.content),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-elevated border border-border overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-4 text-primary-foreground flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Maingrace247" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h3 className="font-serif font-bold">Maingrace247 AI</h3>
              <p className="text-xs opacity-90">Your Health Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted rounded-tl-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="hero" disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
