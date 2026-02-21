import Image from "next/image";
import type React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Event as EventType } from "@/lib/keystatic";

interface EventPresidentMessageSectionProps {
	event: EventType;
}

const EventPresidentMessageSection: React.FC<
	EventPresidentMessageSectionProps
> = ({ event }) => {
	// Check if there's a president message
	if (
		!event.presidentMessage ||
		!event.presidentMessage.discriminant ||
		!event.presidentMessage.value
	) {
		return null;
	}

	const { title, content } = event.presidentMessage.value;

	// Convert content to string if needed
	const getMessageContent = () => {
		if (typeof content === "string") {
			return content;
		}
		return JSON.stringify(content);
	};

	const messageContent = getMessageContent();

	return (
		<section className="relative flex flex-col p-4 sm:p-6 lg:p-8">
			{/* Message Card Container */}
			<div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden border border-primary/20">
				{/* Content */}
				<div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-16 lg:py-20">
					{/* Header with President Info */}
					<div className="text-center mb-12">
						{/* President Image */}
						<div className="mb-6">
							<div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-muted border-2 border-primary/20">
									<Image
									src="/Luka.jpeg"
									alt="Luka Adzic, Founder & President of OutJourney"
									width={80}
									height={80}
									className="object-cover w-full h-full"
								/>
							</div>
						</div>

						{/* Title */}
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
							{title || "Words from the President"}
						</h2>

						{/* President Info */}
						<div className="text-center">
							<p className="text-lg font-medium text-primary">Luka Adzic</p>
							<p className="text-muted-foreground">
								Founder & President, OutJourney
							</p>
						</div>
					</div>

					{/* Message Content */}
					<div className="max-w-4xl mx-auto">
						<Markdown
							remarkPlugins={[remarkGfm]}
							components={{
								// Custom components for president message styling
								p: ({ children, ...props }) => (
									<p
										className="text-muted-foreground leading-relaxed mb-6 text-center text-base lg:text-lg"
										{...props}
									>
										{children}
									</p>
								),
								strong: ({ children, ...props }) => (
									<strong className="text-foreground font-semibold" {...props}>
										{children}
									</strong>
								),
								em: ({ children, ...props }) => (
									<em className="text-primary font-medium italic" {...props}>
										{children}
									</em>
								),
								a: ({ children, href, ...props }) => (
									<a
										href={href}
										className="text-primary font-medium underline decoration-primary/50 hover:decoration-primary transition-all duration-200"
										{...props}
									>
										{children}
									</a>
								),
								// Center-align headings in president message
								h1: ({ children, ...props }) => (
									<h1
										className="text-2xl lg:text-3xl font-light text-foreground mb-6 text-center mt-8 first:mt-0"
										{...props}
									>
										{children}
									</h1>
								),
								h2: ({ children, ...props }) => (
									<h2
										className="text-xl lg:text-2xl font-light text-foreground mb-4 text-center mt-6 first:mt-0"
										{...props}
									>
										{children}
									</h2>
								),
								h3: ({ children, ...props }) => (
									<h3
										className="text-lg lg:text-xl font-light text-foreground mb-3 text-center mt-4 first:mt-0"
										{...props}
									>
										{children}
									</h3>
								),
								ul: ({ children, ...props }) => (
									<ul
										className="list-disc list-inside text-muted-foreground mb-6 space-y-2 text-center"
										{...props}
									>
										{children}
									</ul>
								),
								ol: ({ children, ...props }) => (
									<ol
										className="list-decimal list-inside text-muted-foreground mb-6 space-y-2 text-center"
										{...props}
									>
										{children}
									</ol>
								),
								li: ({ children, ...props }) => (
									<li
										className="text-base lg:text-lg leading-relaxed"
										{...props}
									>
										{children}
									</li>
								),
								blockquote: ({ children, ...props }) => (
									<blockquote
										className="border-l-4 border-primary/30 pl-6 my-8 text-muted-foreground italic bg-primary/5 py-4 rounded-r-lg text-center"
										{...props}
									>
										{children}
									</blockquote>
								),
							}}
						>
							{messageContent}
						</Markdown>
					</div>

					{/* Signature Quote Mark */}
					<div className="text-center mt-8">
						<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
							<span className="text-2xl text-primary">&ldquo;</span>
						</div>
					</div>
				</div>

				{/* Decorative Elements */}
				<div className="absolute top-6 left-6 w-16 h-16 border border-primary/20 rounded-full opacity-30"></div>
				<div className="absolute bottom-6 right-6 w-24 h-24 border border-primary/20 rounded-full opacity-20"></div>
				<div className="absolute top-1/2 right-12 w-8 h-8 border border-primary/20 rounded-full opacity-40"></div>
			</div>
		</section>
	);
};

export default EventPresidentMessageSection;
