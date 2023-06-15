function TOS() {
    return (
        <div className="p-4">
        <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Novagon Web Terms Of Service</h1>
        <a href="/" className="underline">go back</a>
        </div>
        <h2 className="text-xl">1. Rules</h2>
        <p>please follow these rules to make Novagon Web a welcoming community</p>
        <ul className="list-disc list-inside">
            <li>No sexual content</li>
            <li>No Violent Content</li>
            <li>Limited swearing (e.g shit)</li>
        </ul>
        <p>Content will be verified by a bot, if its flagged a human moderator will review it.</p>
        <p>if you have 5 strikes, your account will be banned.</p>
        <i>exeptions are: corn and gore, which will ban you instantly.</i>
        </div>
    )
}

export { TOS }