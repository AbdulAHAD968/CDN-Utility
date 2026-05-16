import { Navbar } from "@/components/shared/navbar";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-20 space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-serif text-ink">Get in touch</h1>
          <p className="text-xl text-muted leading-relaxed">
            Have questions about the CDN Utility or need custom solutions? We're here to help.
          </p>
        </div>

        <div className="bg-surface-soft p-12 rounded-[32px] border border-hairline space-y-8">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest">Email Us</h2>
            <a 
              href="mailto:sevenlabsolutions@gmail.com" 
              className="text-3xl md:text-4xl font-serif text-ink hover:text-primary transition-colors block break-all"
            >
              sevenlabsolutions@gmail.com
            </a>
          </div>
          
          <div className="pt-8 border-t border-hairline">
             <p className="text-muted leading-relaxed">
               We usually respond within 24 hours. For technical support, please include your Cloud Name in the email.
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}
