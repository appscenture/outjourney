"use client";

import React, { useState } from "react";

const WHATSAPP_NUMBER = "6281917063777"; // +62 819-1706-3777

const ContactFormSection: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [inquiry, setInquiry] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const message = `Name: ${name}%0AEmail: ${email}%0AWhatsApp: ${whatsapp}%0AInquiry: ${inquiry}`;
		const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

		// Open WhatsApp in a new tab/window
		window.open(url, "_blank");
	};

	return (
		<section id="contact-form" className="relative min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
			<div className="relative flex-1 rounded-2xl sm:rounded-3xl bg-background overflow-hidden">
				<div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]">
					<div
						className="w-full h-full"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
							backgroundRepeat: "repeat",
							backgroundSize: "128px 128px",
						}}
					/>
				</div>

				<div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-[98%] lg:max-w-[1200px] xl:max-w-[1400px] mx-auto pt-32 pb-20 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
					<div className="w-full max-w-2xl mx-auto">
						<div className="text-center mb-8">
							<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Contact via WhatsApp</span>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mt-4">Send us a message on WhatsApp</h2>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4 bg-card/50 border border-border rounded-xl p-6">
							<label className="block">
								<span className="text-sm text-muted-foreground">Name</span>
								<input
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
									placeholder="Your full name"
								/>
							</label>

							<label className="block">
								<span className="text-sm text-muted-foreground">Email</span>
								<input
									required
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
									placeholder="you@example.com"
								/>
							</label>

							<label className="block">
								<span className="text-sm text-muted-foreground">WhatsApp</span>
								<input
									required
									value={whatsapp}
									onChange={(e) => setWhatsapp(e.target.value)}
									className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
									placeholder="e.g. +62 819-..."
								/>
							</label>

							<label className="block">
								<span className="text-sm text-muted-foreground">Inquiry</span>
								<textarea
									required
									value={inquiry}
									onChange={(e) => setInquiry(e.target.value)}
									className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 min-h-[120px]"
									placeholder="How can we help?"
								/>
							</label>

							<div className="flex items-center justify-between">
								<button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md">Send to WhatsApp</button>
								<a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground">Or open direct chat</a>
							</div>
						</form>

						<div className="mt-8 text-sm text-muted-foreground">
							<p>
								By submitting, your message will open in WhatsApp directed to <strong>+62 819-1706-3777</strong>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactFormSection;
