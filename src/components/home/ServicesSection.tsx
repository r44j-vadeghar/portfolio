import SiteData from "@/constants/siteData.json";

export default function ServicesSection() {
  return (
    <div className="w-full bg-background py-1 sm:py-24 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What I can do
          </h2>
          <p className="text-lg text-muted-foreground">
            You choose, I deliver.
          </p>
        </div>

        <div className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SiteData.services.primary.map((service, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border border-border bg-card/5 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card/10"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {service}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/5 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What my friends can do
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              I fulfill your requests—
              <span className="text-foreground"> no exceptions.</span>
              <br />
              Over the years,{" "}
              <span className="text-foreground">
                my network of high-performers stands ready for collaboration.
              </span>
              <br />
              Once we engage, I can handle introductions or orchestrate the
              entire collaboration effortlessly for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {SiteData.services.network.map((service, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-background/40 p-4 text-center text-muted-foreground"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
