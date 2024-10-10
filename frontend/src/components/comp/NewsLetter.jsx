


const NewsLetter = () => {
    return (
        <div className="relative isolate overflow-hidden py-16 bg-[#333] text-white sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="w-full flex justify-center flex-col items-center gap-3">
                    <div className="flex justify-center flex-col items-center">
                        <h2 className="text-3xl text-center font-bold tracking-tight text-[tomato] sm:text-4xl">Subscribe to newsletter.</h2>
                        <p className="mt-4 text-center leading-8 text-[#dad9d9]">
                            Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt
                            dolore.
                        </p>
                    </div>
                    <div className="w-full mt-5">
                        <div className="lg:max-w-[60vw]  md:max-w-[70vw] sm:max-w-[80vw] w-full mx-auto flex rounded border border-[tomato]  overflow-hidden ">
                            <input type="text" className="bg-[#333] overflow-hidden w-[100%] h-full py-2 text-white outline-none px-4 " />
                            <button className="bg-black hover:text-white py-2 hover:bg-[tomato] h-full rounded-r px-4">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter