interface featureProps {
    iconJSX: any,
    Title: any,
    Desc: any,
}

function FeatureCard({ iconJSX, Title, Desc }: featureProps) {
    return (
        <div className={`flex flex-col h-64 p-4 transition-all duration-500 border rounded-2xl bg-gradient-to-r dark:from-zinc-700 dark:to-secGray-secondary to-500% hover:shadow-2xl shadow-xl border-zinc-500 hover:border-violet-500 space-y-4 `}>
                <div className="inline-flex items-center space-x-2">
                    {iconJSX}
                    <h1 className="text-3xl">{Title}</h1>
                </div>
                <p className="font-jbmono before:content-['_>_']">{Desc}</p>
        </div>
    )
}

export { FeatureCard }