import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Desarrollo de Smart Contracts",
    description: "Implementación de contratos inteligentes para DeFi",
    image: "/src/assets/images/smart-contracts.jpg"
  },
  {
    id: 2,
    title: "Arquitectura de Microservicios",
    description: "Diseño e implementación de sistemas distribuidos",
    image: "/src/assets/images/microservices.jpg"
  },
  {
    id: 3,
    title: "Optimización de Bases de Datos",
    description: "Mejora de rendimiento y escalabilidad",
    image: "/src/assets/images/database.jpg"
  },
  {
    id: 4,
    title: "Desarrollo Frontend",
    description: "Interfaces modernas y responsivas",
    image: "/src/assets/images/frontend.jpg"
  },
  {
    id: 5,
    title: "Integración de APIs",
    description: "Conexión con servicios externos y terceros",
    image: "/src/assets/images/apis.jpg"
  }
];

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
    inViewThreshold: 0.7
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="relative h-full">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-[0_0_100%] min-w-0 relative h-full"
              >
                <div className="relative h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold mb-2"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-gray-200"
                      >
                        {project.description}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all z-10 hover:scale-110 active:scale-95 backdrop-blur-sm"
          onClick={scrollPrev}
        >
          <FiChevronLeft size={28} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all z-10 hover:scale-110 active:scale-95 backdrop-blur-sm"
          onClick={scrollNext}
        >
          <FiChevronRight size={28} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all hover:scale-110 ${
                index === selectedIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
