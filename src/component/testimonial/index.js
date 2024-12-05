import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// hard code ไว้ก่อนเดี๋ยวมาแก้
const testimonials = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint, velit official consequat duis enim velit mollit, exercitation minim amet consequat sunt.",
    author: "Katherine",
    company: "Company®",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "Michael",
    company: "Agency®",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    author: "Sarah",
    company: "Studio®",
    image: "/placeholder.svg",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const timer = setInterval(() => {
      if (isMounted.current) {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
        );
      }
    }, 8000);

    return () => {
      clearInterval(timer);
      isMounted.current = false;
    };
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="relative mx-auto w-full bg-green-200 px-4 pb-44 pt-16">
      <div className="space-y-12 text-center">
        <h2 className="mb-8 font-notoSerif text-5xl font-medium text-green-800">
          Our Customer Says
        </h2>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-20 top-full mt-20 rounded-full border-orange-500 text-orange-500 hover:bg-orange-50 md:left-1/4 md:top-1/2 md:-translate-x-12 md:-translate-y-28"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6 text-orange-500" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <div className="mx-auto max-w-2xl">
            <p className="px-4 font-inter text-xl font-semibold leading-8 text-green-700 md:px-0">
              {testimonials[currentIndex].text}
            </p>

            <div className="mt-8 flex items-center justify-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                />
                <AvatarFallback>
                  {testimonials[currentIndex].author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="font-inter text-base text-gray-600">
                {testimonials[currentIndex].author},{" "}
                {testimonials[currentIndex].company}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-20 top-full mt-20 rounded-full border-orange-500 text-orange-500 hover:bg-orange-50 md:right-1/4 md:top-1/2 md:-translate-y-28 md:translate-x-12"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6 text-orange-500" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>

        <div className="bottom-18 absolute left-1/2 mb-16 flex -translate-x-1/2 justify-center gap-2 md:mb-0">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-gray-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
