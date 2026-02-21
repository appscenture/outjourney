"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PartnersClientWrapper() {
	return (
		<div className="mt-16 pt-8 border-t border-border text-center w-full">
			<div className="w-full">
				<p className="text-lg text-muted-foreground leading-relaxed mb-8 w-full">
					<span className="font-medium text-foreground">
						Partner with OutJourney to shape the future of maritime
						innovation and cultivate the next generation of industry leaders.
					</span>{" "}
					Support cutting-edge research, world-class events, and transformative
					educational experiences. Investment opportunities and tax-deductible
					donations available.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" className="text-lg min-w-[180px] h-12" asChild>
						<Link href="/contact">Partner With Us</Link>
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="text-lg min-w-[180px] h-12"
						onClick={() => {
							window.open(
								"https://donate.stripe.com/14AdR9fnA62Z7eF0LU4Rq06",
								"_blank",
								"noopener,noreferrer",
							);
						}}
					>
						Make a Donation
					</Button>
				</div>
			</div>
		</div>
	);
}
