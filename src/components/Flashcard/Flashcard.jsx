import React from 'react'
 
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

function Flashcard() {
  return (
    <div>
     <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm mb-20"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="w-100">
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold mb-7">Photosynthesis</span>
                  <p >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptas qui possimus, illo ex ea numquam fugiat cum deleniti deserunt, soluta voluptatem molestiae odit sed excepturi sit suscipit nobis! Explicabo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis eligendi nostrum quidem nam quam sit dolore alias vel quia dolor. Quo cupiditate nostrum ab beatae at! Reprehenderit alias ipsam cupiditate? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, excepturi. Nesciunt natus veritatis quidem distinctio sapiente laudantium neque deserunt illum ea aliquam, suscipit adipisci enim pariatur vel id velit ipsa!</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
  )
}

export default Flashcard;