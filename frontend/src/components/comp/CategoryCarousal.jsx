/* eslint-disable react/prop-types */
import CategoryCard from "./CategoryCard"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const CategoryCarousal = ({ filterData, category }) => {

    return (
        <section className="lg:px-10 px-10">
            <div className="">
                <Carousel className="">
                    <CarouselContent className="">
                        {category?.map((item, index) => (
                            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                                <Card>
                                    <CardContent className="p-4">
                                        <CategoryCard filterData={filterData} item={item} />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>

    )
}

export default CategoryCarousal