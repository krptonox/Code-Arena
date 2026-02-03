import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


function Home(){
    const navigate = useNavigate();

    const playClickSound = () => {
    const click = new Audio("/sounds/click.mp3");
     click.volume = 0.6;
     click.play();
    };



    return (
        <motion.div
        initial={{opacity: 0,}}
        animate={{opacity: 1, }}
        translate={{duration: 1.2, ease:"easeOut"}}
        className="min-h-screen bg-black text-white flex items-center justify-center"
        >    
            <motion.div>
            {/*Main Div starting*/}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-2 px-10">
                
             <div> {/*Left div starting*/}
                <motion.div 
                   initial={{ opacity: 0, x: -60 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 1, ease: "easeOut" }}
                   className="space-y-6"
               >
                <h1 className="text-6xl     font-extrabold tracking-widest">
                  CODE ARENA
               </h1>

               <h2 className="text-2xl text-red-500 font-semibold tracking-wider">
                 ENTER THE ARENA
               </h2>

                <p className="text-gray-400 max-w-md">
                  A competitive coding battlefield where developers
                  fight problems, climb ranks, and sharpen skills.
                </p>
                 

                 {/*Buttons starting*/}
             <div className="flex gap-4 pt-6">
                 <button
                     onClick={() => {
                      playClickSound();
                      navigate("/register");
                    }}
                   className="px-8 py-3 bg-red-600 text-black font-bold tracking-widest
                   hover:bg-red-700 transition"
                  >
                     START GAME
                </button>


                 <button
                   onClick={() => {
                    playClickSound();
                    navigate("/login");
                    }}

                   className="px-8 py-3 border border-red-600 text-red-500 font-bold tracking-widest
                   hover:bg-red-600 hover:text-black transition"
                 >
                      LOGIN
                 </button>
             </div>  {/*Buttons ending*/}

              </motion.div> 
            </div> {/*Left div Ending*/}

               
            
             {/*Right div starting*/} <div className="flex items-center  justify-center" style={{ perspective: 1000 }}>
                  <motion.div
                    whileHover={{ scale: 1.08,  rotateY: -8, rotateX: 4 }}
                    transition={{ type: "spring", stiffness: 120 }}
                 >

                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                  className="
                   w-[360px] h-[520px]
                   bg-gradient-to-b from-red-500/20 to-transparent
                   rounded-xl shadow-2xl
                   flex items-center justify-center "
                >

                 <span className="text-gray-500  tracking-widest">
                   PLAYER AVATAR
                 </span>
               </motion.div>
             </motion.div>
          </div>   {/*Right div ending*/}

            </div>  {/*Main Div starting*/}
            </motion.div>

        </motion.div>
    )
}

export default Home;