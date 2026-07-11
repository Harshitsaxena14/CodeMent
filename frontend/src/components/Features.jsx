function Features() {

  const features = [
    {
      title: "Structured Roadmap",
      description:
        "Follow a proven DSA path from basics to advanced topics with ordered concepts and problems.",
    },

    {
      title: "AI Mentor",
      description:
        "Analyze your progress, find weak areas, and get personalized learning suggestions.",
    },

    {
      title: "LeetCode Assistant",
      description:
        "Get hints, patterns, difficulty insights, and guidance directly while solving problems.",
    },
  ]


  return (

    <section className="bg-black text-white px-10 py-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        Why CodeMent?
      </h2>


      <div className="grid grid-cols-3 gap-8">

        {features.map((feature, index) => (

          <div 
            key={index}
            className="border border-gray-700 rounded-xl p-8"
          >

            <h3 className="text-2xl font-semibold mb-4">
              {feature.title}
            </h3>


            <p className="text-gray-400">
              {feature.description}
            </p>


          </div>

        ))}


      </div>


    </section>

  )
}


export default Features