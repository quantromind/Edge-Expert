import React from "react";
import { cn } from "../../lib/utils";
import { FadeInWhenVisible, fadeUp } from "./FadeInWhenVisible";

export function TypographyH1({ children, className }) {
    return (
        <h1
            className={cn(
                "text-3xl sm:text-4xl font-bold tracking-tight text-balance",
                className
            )}
        >
            {children}
        </h1>
    );
}

export function TypographyH2({ children, className }) {
    return (
        <h2
            className={cn("sm:text-3xl text-2xl font-bold tracking-tight", className)}
        >
            {children}
        </h2>
    );
}

export function TypographyH3({ children, className }) {
    return (
        <h3
            className={cn(
                "sm:text-2xl text-lg font-semibold tracking-tight",
                className
            )}
        >
            {children}
        </h3>
    );
}

export function TypographyH4({ children, className }) {
    return (
        <h4
            className={cn(
                "sm:text-xl text-md font-semibold tracking-tight",
                className
            )}
        >
            {children}
        </h4>
    );
}

export function TypographyH5({ children, className }) {
    return (
        <h5
            className={cn(
                "sm:text-xl text-base font-bold tracking-normal",
                className
            )}
        >
            {children}
        </h5>
    );
}

export function TypographyH6({ children, className }) {
    return (
        <h6
            className={cn(
                "sm:text-md text-sm font-semibold tracking-normal",
                className
            )}
        >
            {children}
        </h6>
    );
}

export function TypographyMuted({ children, className }) {
    return (
        <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
    );
}

export function TypographyP({ children, className }) {
    return <p className={cn("leading-7", className)}>{children}</p>;
}

export function Headline({ title, description, className }) {
    return (
        <FadeInWhenVisible>
            <div className={cn("space-y-4 w-full sm:max-w-2xl mx-auto text-center", className)}>
                <h1 className="sm:text-2xl text-xl font-bold tracking-tight text-primary">
                    {title}
                </h1>
                <p className="text-muted-foreground text-sm">
                    {description}
                </p>
            </div>
        </FadeInWhenVisible>
    )
}

export function TypographyBlockquote({ children, className }) {
    return (
        <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
            {children}
        </blockquote>
    );
}

export function TypographyInlineCode({ children, className }) {
    return (
        <code
            className={cn(
                "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
                className
            )}
        >
            {children}
        </code>
    );
}

export function TypographyLead({ children, className }) {
    return (
        <p className={cn("text-muted-foreground text-base sm:text-lg", className)}>
            {children}
        </p>
    );
}

export function TypographyLarge({ children, className }) {
    return (
        <div className={cn("sm:text-lg text-base font-semibold", className)}>
            {children}
        </div>
    );
}

export function TypographySmall({ children, className }) {
    return (
        <small className={cn("text-sm leading-none font-medium", className)}>
            {children}
        </small>
    );
}

export function TypographyTable({ headers, rows, className }) {
    return (
        <div
            className={cn(
                "w-full rounded-md border shadow-sm overflow-hidden",
                className
            )}
        >
            <div className="grid grid-cols-2 bg-muted text-sm font-semibold px-4 py-2 border-b">
                {headers.map((header, i) => (
                    <div key={i}>{header}</div>
                ))}
            </div>
            {rows.map((row, index) => (
                <div
                    key={index}
                    className={`grid grid-cols-2 px-4 py-3 text-sm border-b ${index % 2 === 0 ? "bg-muted/20" : "bg-background"
                        }`}
                >
                    <div className="font-medium text-muted-foreground">{row.module}</div>
                    <div className="grid gap-2">{row.content}</div>
                </div>
            ))}
        </div>
    );
}

export function TypographyList2({ items, className }) {
    return (
        <ul className={cn("my-6 sm:ml-8 ml-6 list-disc text-gray-800 [&>li]:mt-2 text-sm", className)}>
            {items?.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))}
        </ul>
    )
}

export function BoldList({ items, className }) {
    return (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-3 text-sm", className)}>
            {items?.map((item, index) => (
                <li key={index}>
                    <span className="font-semibold">{item?.title ? `${item.title} : ` : ''}</span><span className="text-gray-800">{item?.value}</span>
                </li>
            ))}
        </ul>
    )
}

export function HeadSkipper({ children, className }) {
    return (
        <div className="flex items-center gap-2 sm:gap-4 mb-6">
            <h2 className={cn("text-primary sm:text-2xl text-lg font-semibold tracking-tight uppercase", className)}>
                {children}
            </h2>
            <div className="sm:w-22 w-10 h-px bg-blue-700"></div>
        </div>
    )
}

export function HighLighter({ rightText, leftText, className, highLighter }) {
    return (
        <div className="flex flex-col gap-2 mb-3">
            <h3 className={cn("text-lg text-blue-900 font-bold tracking-normal", className)}>
                {rightText} <span className="text-accent">{highLighter}</span> {leftText}
            </h3>
            <div className="w-14 h-0.5 bg-accent"></div>
        </div>
    )
}
