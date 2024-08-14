import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { genAI } from "../../gemini-config";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Flashcard(props) {
  const [loading, setLoading] = useState(true);
  const [promptResponses, setPromptResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(`Create 10 informative slides about ${props.topic} for a ${props.class} grader in a way that makes the child understand. Each slide should have a Title and Explanation and not just empty strings. Avoid using any formatting like bold or italics.`);
        const response = await result.response;
        const text = await response.text(); 
        const cleanText = (text) => {
          return text.replace(/\*\*|\*/g, '');
        };
        
        function processResponse(response) {
          const slides = response.split('\n\n');
          const formattedSlides = slides.map(slide => {
            const [potentialTitle, ...remainingLines] = slide.split('\n');
            const title = cleanText(potentialTitle || '') || 'Untitled Slide';
            const explanation = cleanText(remainingLines.join('\n') || ''); 
            return { Topic: title || 'Untitled Slide', explanation };
          });
              
          return formattedSlides;
        }
        setPromptResponses(processResponse(text));
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate 1.5 seconds delay
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Gemini:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.topic, props.class]);

  return (
    <div className="flex justify-center w-full mt-10 px-4"> {/* Added px-4 for padding */}
      {loading ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-3xl mb-20"
        >
          <CarouselContent>
            {[...Array(10)].map((_, index) => (
              <CarouselItem key={index} className="w-full md:w-1/2 lg:w-1/3">
                <div className="p-2">
                  <Card className="w-full">
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg rounded-lg">
                      <Skeleton height={40} width={150} style={{ backgroundColor: '#cce0ff', borderRadius: '5px' }} />
                      <Skeleton count={3} height={20} style={{ backgroundColor: '#b3d1ff', borderRadius: '5px', margin: '5px 0' }} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-blue-500 hover:text-blue-700">Previous</CarouselPrevious>
          <CarouselNext className="text-blue-500 hover:text-blue-700">Next</CarouselNext>
        </Carousel>
      ) : (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-3xl mb-20"
        >
          <CarouselContent className="space-x-4">
            {promptResponses.map((slide, index) => (
              <CarouselItem key={index} className="w-full md:w-1/2 lg:w-1/3">
                <Card className="bg-white shadow-md rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6 bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-indigo-600">{slide.Topic}</h2>
                    <p className="text-lg text-gray-700 mt-4 text-center">{slide.explanation}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-indigo-500 hover:text-indigo-700">Previous</CarouselPrevious>
          <CarouselNext className="text-indigo-500 hover:text-indigo-700">Next</CarouselNext>
        </Carousel>
      )}
    </div>
  );
}

export default Flashcard;
