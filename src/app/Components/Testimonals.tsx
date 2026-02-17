import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/a1.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/a2.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/a3.jpg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/a4.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/a5.jpg",
    },
  ];
  return(
  <div className="container mx-auto px-3   bg-cover bg-center bg-no-repeat relative py-4"
  style={{ backgroundImage: "url('/bg.jpg')" }}  >
    <div className="absolute inset-0 bg-white bg-opacity-20"></div>
    <h1 className="text-center md:text-5xl text-3xl font-semibold md:py-12 text-primary">Hear From Our Satisfied Customers</h1>
  <AnimatedTestimonials testimonials={testimonials} />
  </div>);
}
