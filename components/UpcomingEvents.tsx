import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Startup Pitch Competition",
    tag: { label: "Competition", className: "bg-red-500/20 text-red-300 border border-red-500/30" },
    description: "Present your startup ideas to industry leaders and VCs",
    schedule: "December 15, 2025 • 10:00 AM • Main Auditorium",
    image:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1600&auto=format&fit=crop&q=80",
    alt: "Startup pitch stage with presenters and judges watching attentively",
  },
  {
    title: "Entrepreneurship Workshop",
    tag: { label: "Workshop", className: "bg-blue-500/20 text-blue-300 border border-blue-500/30" },
    description: "Learn the fundamentals of starting and scaling a business",
    schedule: "December 20, 2025 • 2:00 PM • Innovation Lab",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop&q=80",
    alt: "Mentor guiding students at a workshop with whiteboard illustrations",
  },
  {
    title: "Hackathon 2025",
    tag: { label: "Hackathon", className: "bg-purple-500/20 text-purple-300 border border-purple-500/30" },
    description: "48-hour coding marathon to build innovative solutions",
    schedule: "December 28, 2025 • 9:00 AM • Tech Hub",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1600&auto=format&fit=crop&q=80",
    alt: "Hackathon participants coding with laptops, coffee cups, and neon lighting",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="w-full space-y-8 py-12">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Upcoming Events</p>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Experience What&apos;s Next</h2>
        <p className="mx-auto max-w-2xl text-base text-white/70 sm:text-lg">
          Curated gatherings designed to fuel innovation, sharpen your entrepreneurial mindset,
          and help you connect with the brightest builders on campus.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card
            key={event.title}
            className="group border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/20"
          >
            <CardHeader className="space-y-4 p-0">
              <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-gradient-to-b from-primary/40 to-primary/10">
                <Image
                  src={event.image}
                  alt={event.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
                <div className="absolute left-4 top-4">
                  <Badge className={`${event.tag.className} backdrop-blur`}>{event.tag.label}</Badge>
                </div>
              </div>
              <div className="space-y-2 px-6 pt-4">
                <CardTitle className="text-2xl text-white">{event.title}</CardTitle>
                <p className="text-sm text-white/70">{event.description}</p>
              </div>
            </CardHeader>

            <CardContent className="px-6">
              <div className="flex items-start gap-3 text-sm text-white/80">
                <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </span>
                <p className="text-base font-medium leading-relaxed">{event.schedule}</p>
              </div>
            </CardContent>

            <CardFooter className="px-6 pb-6">
              <Button className="w-full bg-accent text-primary-dark hover:bg-accent/80">
                Register Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;

