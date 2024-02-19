import Hero from '@/components/landingPage/Hero'
import Location from '@/components/landingPage/Location'
import Request from '@/components/landingPage/Request'
import Contact from "@/components/landingPage/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Request />
      <Location />
      <Contact />
    </>
  )
}