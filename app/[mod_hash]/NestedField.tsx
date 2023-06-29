import React from "react";

export default function NestedField({ name, children }: { children: React.ReactNode, name: string }) {
    return (
        <div className="m-4 flex flex-col justify-start items-start gap-4">
            <h1 className="inline font-semibold">{name}</h1>
            <div className="flex flex-col justify-start items-start">
                {React.Children.map(children, (child) => (
                    <div className="border-l">
                        {child}
                    </div>
                ))}
            </div>
        </div>
    )
}
