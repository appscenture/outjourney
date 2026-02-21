"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
	content: string;
	className?: string;
}

export default function MarkdownRenderer({
	content,
	className,
}: MarkdownRendererProps) {
	return (
		<div className={className}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					h1: ({ children }) => (
						<h1 className="text-3xl lg:text-4xl font-light text-foreground mb-8 mt-12 first:mt-0">
							{children}
						</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-2xl lg:text-3xl font-light text-foreground mb-6 mt-10 first:mt-0">
							{children}
						</h2>
					),
					h3: ({ children }) => (
						<h3 className="text-xl lg:text-2xl font-light text-foreground mb-4 mt-8 first:mt-0">
							{children}
						</h3>
					),
					h4: ({ children }) => (
						<h4 className="text-lg lg:text-xl font-medium text-foreground mb-3 mt-6 first:mt-0">
							{children}
						</h4>
					),
					p: ({ children }) => (
						<p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
							{children}
						</p>
					),
					strong: ({ children }) => (
						<strong className="text-foreground font-semibold">
							{children}
						</strong>
					),
					em: ({ children }) => (
						<em className="text-primary font-medium italic">{children}</em>
					),
					ul: ({ children }) => (
						<ul className="list-disc list-outside text-muted-foreground mb-6 space-y-3 ml-6">
							{children}
						</ul>
					),
					ol: ({ children }) => (
						<ol className="list-decimal list-outside text-muted-foreground mb-6 space-y-3 ml-6">
							{children}
						</ol>
					),
					li: ({ children }) => (
						<li className="text-base lg:text-lg leading-relaxed mb-2">
							{children}
						</li>
					),
					a: ({ children, href }) => (
						<a
							href={href}
							className="text-primary font-medium underline decoration-primary/50 hover:decoration-primary transition-colors duration-200"
						>
							{children}
						</a>
					),
					blockquote: ({ children }) => (
						<blockquote className="border-l-4 border-primary/30 pl-6 my-8 italic text-muted-foreground bg-muted/20 py-4 rounded-r-lg">
							{children}
						</blockquote>
					),
					code: ({ children, className }) => {
						const isInline = !className;
						return isInline ? (
							<code className="text-primary bg-primary/10 px-2 py-1 rounded text-sm font-mono border border-primary/20">
								{children}
							</code>
						) : (
							<code className="block">{children}</code>
						);
					},
					pre: ({ children }) => (
						<pre className="bg-muted border border-border rounded-lg p-6 overflow-x-auto my-6 text-sm">
							{children}
						</pre>
					),
					hr: () => (
						<hr className="border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent my-12" />
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
