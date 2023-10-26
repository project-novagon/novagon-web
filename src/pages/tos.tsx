function TOS() {
    return (
        <div className="h-full p-4">
        <div className="flex justify-between">
        <h1 className="text-3xl font-black">Novagon Web Terms Of Service</h1>
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
        <h2>2. Support</h2>
        <p>Novagon will offer support by email</p>
        <p>our email is: <a href="mailto:project.novagon@gmail.com">project.novagon@gmail.com</a></p>
        </div>
    )
}

export { TOS }