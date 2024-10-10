/* eslint-disable react/prop-types */
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Filter = ({ cityArray, categoryArray, resetCity, resetCategory, hondleCityChange, hondleCategoryChange }) => {
    return (
        <div>
            <div className="flex gap-3 flex-col ">
                <RadioGroup defaultValue="comfortable">
                    <h1 className="my-3 text-xl font-semibold">Filters By City</h1>
                    <div className="flex gap-3 flex-col ">
                        <div className="flex gap-2 items-center space-x-2">
                            <RadioGroupItem className={`text-[tomato] border-[tomato]`} value="" onClick={resetCity} id="option-one" />
                            <Label htmlFor="all">All</Label>
                        </div>

                        {cityArray?.map((data, ind) =>
                            <div key={ind} className="flex gap-2 items-center space-x-2">
                                <RadioGroupItem className={`text-[tomato] border-[tomato]`}
                                    value={data}
                                    onClick={() => hondleCityChange(data)}
                                    id="option-one"
                                />
                                <Label htmlFor={data}>{data}</Label>
                            </div>
                        )}
                    </div>
                </RadioGroup>
                <RadioGroup defaultValue="comfortable">
                    <h1 className="my-3 text-xl font-semibold">Filters By Category</h1>
                    <div className="flex gap-3 flex-col ">
                        <div className="flex gap-2 items-center space-x-2">
                            <RadioGroupItem className={`text-[tomato] border-[tomato]`} value="" onClick={resetCategory} id="option-one" />
                            <Label htmlFor="all">All</Label>
                        </div>

                        {categoryArray?.map((data, ind) =>
                            <div key={ind} className="flex gap-2 items-center space-x-2">
                                <RadioGroupItem className={`text-[tomato] border-[tomato]`} value={data} onClick={() => hondleCategoryChange(data)} id="option-one" />
                                <Label htmlFor={data} >{data}</Label>
                            </div>
                        )}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

export default Filter