import useFollowedGames from "../hooks/useFollowedGames"

export function Signals(){

    const {followedGames} = useFollowedGames()

    console.log(followedGames);
    

    return (<>
    
        <h1>signal</h1>
    
    </>)

}