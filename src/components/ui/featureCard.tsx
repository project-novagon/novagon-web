interface featureProps {
    iconJSX: any,
    Title: any,
    Desc: any
}

function FeatureCard({iconJSX, Title, Desc }: featureProps) {
    return (
        <div className="flex flex-col items-center w-64 p-2 text-center transition-all duration-200 rounded-md dark:bg-zinc-700 hover:shadow-2xl">
            <div className="inline-flex items-center justify-center space-x-4">
            {iconJSX}
            <h1 className="text-3xl">{Title}</h1>
            </div>
            <p>{Desc}</p>
        </div>
    )
}

export {FeatureCard}