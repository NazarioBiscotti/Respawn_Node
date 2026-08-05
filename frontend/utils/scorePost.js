export default function scorePost(
    post,
    followedGames
) {

    let score = 0;


    // controllo giochi seguiti

    const followedMatches = post.games?.filter(game =>

        followedGames.includes(
            String(game.igdbID)
        )

    ).length || 0;



    score += followedMatches * 50;



    // bonus se il post ha più giochi associati

    if(post.games?.length > 0){

        score += 5;

    }



    return score;

}