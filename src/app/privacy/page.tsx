import { Navbar } from "@/components/shared/navbar";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-20 space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-serif text-ink">Privacy Policy</h1>
          <p className="text-xl text-muted leading-relaxed">
            Your data security and privacy are our top priorities.
          </p>
        </div>

        <div className="prose prose-lg prose-slate max-w-none space-y-8 text-muted leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-ink">Data Collection</h2>
            <p>
              The CDN Utility is designed as a bridge between your local workspace and Cloudinary. We do not store your assets or credentials on our own servers. All data is either processed in real-time or stored in your browser's local storage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-ink">Third-Party Services</h2>
            <p>
              Your assets are uploaded directly to Cloudinary. By using this tool, you also agree to Cloudinary's terms of service and privacy policy. We use Cloudinary's official SDKs to ensure secure and optimized handling of your media.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-ink">Local Storage</h2>
            <p>
              Preferences and naming presets are saved locally on your device to provide a seamless experience across sessions. You can clear this data at any time by clearing your browser's cache.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-ink">Contact</h2>
            <p>
              If you have any questions about this policy, feel free to reach out at <a href="mailto:sevenlabsolutions@gmail.com" className="text-primary hover:underline">sevenlabsolutions@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
