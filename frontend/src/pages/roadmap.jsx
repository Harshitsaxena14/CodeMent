import { roadmap } from "../data/roadmap"
import { Link } from "react-router-dom"

function Roadmap(){

  const [completedProblems, setCompletedProblems] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/progress");
        if (res.data?.completedProblems) {
          setCompletedProblems(res.data.completedProblems);
        } else {
          setCompletedProblems([]);
        }
      } catch (error) {
        console.log(error);
        setCompletedProblems([]);
      }
    };

    fetchProgress();
  }, []);

  function getTopicCompletion(topic) {
    const total = topic.questions.length;
    if (!total) return 0;

    const completedCount = topic.questions.reduce((acc, q) => {
      return completedProblems.includes(q.id) ? acc + 1 : acc;
    }, 0);

    return Math.round((completedCount / total) * 100);
  }

  return(
    <div className="min-h-screen bg-black text-white px-10 py-10">
      <h1 className="text-4xl font-bold mb-10">DSA Roadmap</h1>

      <div className="grid grid-cols-3 gap-6">
{roadmap.map((topic,index)=>{

const unlocked =
  index===0 || getTopicCompletion(roadmap[index-1]) >= 80


return(
          <div key={topic.id} className="border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold">{topic.title}</h2>

            <p className="text-gray-400 mt-4">
               Concepts: {topic.concepts.length}
            </p>

            <p className="text-gray-400">
              Questions: {topic.questions.length}
            </p>

            {unlocked ? (

              <Link 
                to={`/roadmap/${topic.id}`}
                className="text-green-400"
              >
                Start 🔓
              </Link>

            ) : (

              <p className="text-gray-500">
                🔒 Complete previous topic
              </p>

            )}
          </div>
        )
})}
      </div>
    </div>
  )
}

export default Roadmap

