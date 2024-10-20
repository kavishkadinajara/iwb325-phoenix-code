import SupportForm from "@/components/SupportForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DownloadIcon, FileIcon, PlayIcon } from "@radix-ui/react-icons";
import { AppleIcon, ComputerIcon, MenuIcon, MountainIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SupportPage = () => {
  return (
    <div className="w-full">
      <header className="w-full py-4 md:py-6 lg:py-8">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 "
            prefetch={false}
          >
            <Image
              src="/Logo-horizontal.svg"
              alt="NIBMTiX"
              width={120}
              height={40}
            />
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link href="/" className="hover:text-white/80" prefetch={false}>
              Home
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-white/80"
              prefetch={false}
            >
              Dashboard
            </Link>
          </nav>
          <Button variant="outline" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
      <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
        <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Help Center / FAQs
            </h2>
            <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a question? Check our FAQs or submit an inquiry and our
              support team will get back to you as soon as possible.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                href="#faqs"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                View FAQs
              </Link>
              <Link
                href="#inquiry"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-background/50 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Submit Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="grid gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              <DownloadIcon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Download the App</h3>
              <p className="text-muted-foreground">
                Get the NIBMTix app for seamless event management on the go.
              </p>
              <div className="flex gap-2">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <AppleIcon className="mr-2 h-4 w-4" />
                  App Store
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <PlayIcon className="mr-2 h-4 w-4" />
                  Google Play
                </Link>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              <FileIcon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Download Documents</h3>
              <p className="text-muted-foreground">
                Access our documentation, guides, and other resources.
              </p>
              <div className="flex gap-2">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <FileIcon className="mr-2 h-4 w-4" />
                  Documentation
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <FileIcon className="mr-2 h-4 w-4" />
                  Guides
                </Link>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              <ComputerIcon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Download Software</h3>
              <p className="text-muted-foreground">
                Get the latest version of our event management software.
              </p>
              <div className="flex gap-2">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <ComputerIcon className="mr-2 h-4 w-4" />
                  Download
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Separator className="w-3/4 mx-auto" />
      <section id="faqs" className="w-full py-12 md:py-16 lg:py-32">
        <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check our FAQs for answers to common questions.
            </p>
          </div>
          <div className="w-full max-w-3xl space-y-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="question1">
                <AccordionTrigger className="text-base font-semibold">
                  How do I download the NIBMTix app?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    To download the NIBMTix app, simply visit the App Store or
                    Google Play and search for &quot;NIBMTix&quot;. Follow the
                    on-screen instructions to install the app on your device.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="question2">
                <AccordionTrigger className="text-base font-semibold">
                  What documents can I download from the Help Center?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    You can download our documentation, user guides, and other
                    resources from the Help Center. These materials cover a wide
                    range of topics to help you get the most out of our event
                    management platform.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="question3">
                <AccordionTrigger className="text-base font-semibold">
                  How do I submit an inquiry to the support team?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    To submit an inquiry, simply click the &quot;Submit
                    Inquiry&quot; button in the Help Center. This will take you
                    to a form where you can provide details about your question
                    or issue. Our support team will then get back to you as soon
                    as possible.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      <Separator className="w-3/4 mx-auto" />
      <section id="inquiry" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How can we help?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Submit your inquiry and our support team will get back to you as
              soon as possible.
            </p>
          </div>
          <SupportForm />
        </div>
      </section>
    </div>
  );
};
export default SupportPage;