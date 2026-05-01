
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, CheckCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import Tabs from "@/components/tabs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-10">
          <div className="mx-auton max-w-4xl text-center">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">All-in-One Job Application Tracker</h2>
                <p className="text-muted-foreground text-lg">From application to offer, manage every step of your job search in one place.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 mb-15">
              <Link href="/sign-up">
                <Button size="lg" variant="primary"
                  className="h-11 px-8 text-lg font-medium
                  hover:bg-[#69d3e3] transition-colors bg-[#8ae5fe] rounded-md shadow-sm hover:shadow-md"
                >Start for free
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
            </div>
          </div>
          <Tabs className="my-20" />
        </section>

        {/* Feature section */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center
                justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-[#f0073d]" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Organize Applications
                </h3>
                <p className="text-muted-foreground">
                  Create custome boards and columns to track your job Applications
                  at every stage of the hiring process.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center
                justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-[#f0073d]" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Track your Progress
                </h3>
                <p className="text-muted-foreground">
                  Monitor your application status from applied to interview to
                  offer with visual Kanban boards.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center
                justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-[#f0073d]" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Stay Organized
                </h3>
                <p className="text-muted-foreground">
                  Never lose track of an application. Keep all your job search
                  information in one centralized place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
