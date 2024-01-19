import { useEffect,useState } from "react";

const Usefetch = () => {
    const [player, setPlayer] = useState("");

    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetch("http://localhost:8000/music" )
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                setPlayer(res);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
            })
    }, [])
    return {player,loading};
}
 
export default Usefetch;