import CinematicGrid from "@/components/CinematicGrid";
import Link from "next/link";

export default async function XeroxServices() {
  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center gap-10 overflow-x-hidden px-5 py-32 md:max-w-screen-xl md:py-44">
      <CinematicGrid />

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <h1 className="flex gap-5 pb-8 text-4xl font-extrabold">
          Pixels to Paper: Your Printing & Design Playground
        </h1>
        <p className="text-xl">
          We handle your printing, copying, scanning, and even design your
          marketing materials.
          <br />
          Save time, money, and effort with all-in-one solutions.
        </p>
        <Link
          href="mailto:vadegharraj@gmail.com"
          className="my-5 rounded-lg bg-accent2 px-6 py-2 text-xl font-bold ring-primary ring-offset-2 ring-offset-primary-foreground hover:ring-2 focus:ring-2 bg-primary text-primary-foreground"
        >
          Email Me
        </Link>
        <p className="opacity-60">
          Launch your dream business. Ideas, build, marketing - I do it all.
        </p>

        <Link href="/" className="text-blue-600 underline">
          See my profile
        </Link>
      </div>

      <div className="w-full pt-5 md:pt-28">
        <iframe
          title="r44j location on google maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3810.500876119962!2d80.12579367626876!3d17.24298618361979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a34591483e00dab%3A0x1771009563e9d8b4!2sR44j%20Xerox%20and%20Services!5e0!3m2!1sen!2sin!4v1708097299774!5m2!1sen!2sin"
          className="w-full rounded-md"
          width="800"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
