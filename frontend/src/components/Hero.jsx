function Hero() {
  return (
    <section className="min-h-[90vh] bg-black text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold max-w-4xl">
        Stop Guessing Your DSA Journey
      </h1>

      <p className="text-gray-400 text-xl mt-6 max-w-2xl">
        Follow a structured roadmap, solve the right problems, track progress,
        and let AI guide you from beginner to interview ready.
      </p>

      <div className="flex gap-5 mt-10">
        <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold">
          Start Learning
        </button>

        <button className="border border-gray-600 px-8 py-3 rounded-xl">
          View Roadmap
        </button>
      </div>
    </section>
  )
}

export default Hero