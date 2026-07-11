import { roadmap } from "../data/roadmap"

function RoadmapPreview(){

  return(
    <section className="bg-black text-white px-10 py-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        Your DSA Roadmap
      </h2>

      <div className="max-w-3xl mx-auto flex flex-col gap-5">

        {
          roadmap.map((topic)=>(
            <div 
              key={topic.id}
              className="border border-gray-700 rounded-xl p-5"
            >

              <h3 className="text-2xl font-bold">
                {topic.title}
              </h3>

              <p className="text-gray-400 mt-2">
                {topic.concepts.length} Concepts
              </p>

              <p className="text-gray-400">
                {topic.questions.length} Problems
              </p>

            </div>
          ))
        }

      </div>

    </section>
  )
}

export default RoadmapPreview