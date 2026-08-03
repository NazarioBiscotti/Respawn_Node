import { Navigate, useNavigate } from "react-router-dom";


export default function PulseCard({
    id,
    title,
    description,
    image,
    type,
    games = [],

}) {

    const navigate = useNavigate()


    return (
        <article className="rounded-2xl border-2 border-gray-600 p-3 my-5 cursor-pointer transition hover:scale-105 max-w-110 h-96">
            <img
                src={image}
                className="h-48 w-full object-cover rounded-xl mb-3 "
                alt={title}
            />
            <div className="text-start">


                <p className="text-xs text-primary mb-1">{type}</p>

                <h3 className="font-semibold text-lg mb-2">{title}</h3>



                <p className="text-sm text-white/60 mb-3">{description}</p>
            </div>

        </article>
    );
}