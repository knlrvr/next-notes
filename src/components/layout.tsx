import type { PropsWithChildren } from "react";


export const PageLayout = (props: PropsWithChildren) => {
    return (
        <main className="flex h-screen justify-center max-w-2xl mx-auto">
            <div className="h-full w-full border-x border-black">
                {props.children}
            </div>
        </main>
    )
}