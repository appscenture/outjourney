"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
	href: string;
	label: string;
}

const navLinks: NavLink[] = [
	{ href: "/#about", label: "About" },
	{ href: "/#committees", label: "Committees" },
	{ href: "/#president", label: "Leadership" },
	{ href: "/#opportunities", label: "Opportunities" },
	{ href: "/events", label: "Events" },
	{ href: "/contact", label: "Contact Us" },
];

// Custom hook for smooth scrolling that works with Lenis
const useSmoothScroll = () => {
	const handleSmoothScroll = (href: string) => {
		// Check if it's a hash link to a section on the same page
		if (href.startsWith("/#")) {
			const targetId = href.substring(2); // Remove '/#'
			console.log("Attempting to scroll to:", targetId);

			const targetElement = document.getElementById(targetId);
			console.log("Target element found:", targetElement);

			if (targetElement) {
				// Small delay to ensure DOM is ready
				setTimeout(() => {
					// Get the element's position relative to the document
					const elementTop =
						targetElement.getBoundingClientRect().top + window.scrollY;
					console.log("Element top position:", elementTop);

					// Account for the fixed navbar height (approximately 120px including margins)
					const offset = 120;
					const targetPosition = Math.max(0, elementTop - offset);
					console.log("Target scroll position:", targetPosition);

					// Use Lenis for smooth scrolling if available, fallback to native
					const lenis = window.lenis;
					if (lenis && typeof lenis.scrollTo === "function") {
						console.log("Using Lenis for smooth scroll");
						lenis.scrollTo(targetPosition, {
							duration: 1.2,
							easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
						});
					} else {
						console.log("Using native scroll");
						// Fallback to native scrolling for mobile/small screens
						window.scrollTo({
							top: targetPosition,
							behavior: "smooth",
						});
					}
				}, 50);
				return true; // Indicate that we handled the scroll
			} else {
				console.log("Target element not found for ID:", targetId);
			}
		}
		return false; // Let the default Link behavior handle it
	};

	return handleSmoothScroll;
};

const Navbar: React.FC = () => {
	const pathname = usePathname();
	const [hoveredNavLink, setHoveredNavLink] = useState<string | null>(null);
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrollingDown, setIsScrollingDown] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const lastScrollY = useRef(0);
	const backdropUpdateTimeout = useRef<NodeJS.Timeout | null>(null);
	const handleSmoothScroll = useSmoothScroll();

	const [leftBackdropStyle, setLeftBackdropStyle] = useState<{
		left: number;
		width: number;
		opacity: number;
		shouldAnimatePosition: boolean;
	}>({ left: 0, width: 0, opacity: 0, shouldAnimatePosition: false });

	const [rightBackdropStyle, setRightBackdropStyle] = useState<{
		left: number;
		width: number;
		opacity: number;
		shouldAnimatePosition: boolean;
	}>({ left: 0, width: 0, opacity: 0, shouldAnimatePosition: false });

	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const navRefs = useRef<{ [key: string]: HTMLElement | null }>({});

	const updateLeftBackdropPosition = useCallback((element: HTMLElement) => {
		// Get the nav container and calculate relative position
		const navContainer = element.parentElement; // The nav element
		if (!navContainer) return;

		const elementRect = element.getBoundingClientRect();
		const navRect = navContainer.getBoundingClientRect();

		// Calculate position relative to nav container
		const left = elementRect.left - navRect.left;
		const width = elementRect.width;

		setLeftBackdropStyle((prev) => ({
			left,
			width,
			opacity: 1,
			// Only animate position if backdrop was already visible
			shouldAnimatePosition: prev.opacity > 0,
		}));
	}, []);

	const updateRightBackdropPosition = useCallback((element: HTMLElement) => {
		// Get the nav container and calculate relative position
		const navContainer = element.parentElement; // The nav element
		if (!navContainer) return;

		const elementRect = element.getBoundingClientRect();
		const navRect = navContainer.getBoundingClientRect();

		// Calculate position relative to nav container
		const left = elementRect.left - navRect.left;
		const width = elementRect.width;

		setRightBackdropStyle((prev) => ({
			left,
			width,
			opacity: 1,
			// Only animate position if backdrop was already visible
			shouldAnimatePosition: prev.opacity > 0,
		}));
	}, []);

	const handleLeftNavLinkEnter = (label: string, element: HTMLElement) => {
		// Clear any existing hover timeout
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}

		setHoveredNavLink(label);
		updateLeftBackdropPosition(element);
	};

	const handleLeftNavLinkLeave = () => {
		// Clear any existing hover timeout
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}

		hoverTimeoutRef.current = setTimeout(() => {
			setHoveredNavLink(null);
			// Check if we should hide the backdrop (no active section/page)
			const shouldShowBackdrop =
				activeSection || pathname === "/events" || pathname === "/contact";

			if (!shouldShowBackdrop) {
				setLeftBackdropStyle((prev) => ({ ...prev, opacity: 0 }));
			}
		}, 100);
	};

	const handleLeftNavContainerLeave = () => {
		setHoveredNavLink(null);
		// Check if we should hide the backdrop (no active section/page)
		const shouldShowBackdrop =
			activeSection || pathname === "/events" || pathname === "/contact";

		if (!shouldShowBackdrop) {
			setLeftBackdropStyle((prev) => ({ ...prev, opacity: 0 }));
		}
	};

	const handleRightNavLinkEnter = (label: string, element: HTMLElement) => {
		// Clear any existing hover timeout
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}

		setHoveredNavLink(label);
		updateRightBackdropPosition(element);
	};

	const handleRightNavLinkLeave = () => {
		// Clear any existing hover timeout
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}

		hoverTimeoutRef.current = setTimeout(() => {
			setHoveredNavLink(null);
			// Check if we should hide the backdrop (no active section/page)
			const shouldShowBackdrop =
				activeSection || pathname === "/events" || pathname === "/contact";

			if (!shouldShowBackdrop) {
				setRightBackdropStyle((prev) => ({ ...prev, opacity: 0 }));
			}
		}, 100);
	};

	const handleRightNavContainerLeave = () => {
		setHoveredNavLink(null);
		// Check if we should hide the backdrop (no active section/page)
		const shouldShowBackdrop =
			activeSection || pathname === "/events" || pathname === "/contact";

		if (!shouldShowBackdrop) {
			setRightBackdropStyle((prev) => ({ ...prev, opacity: 0 }));
		}
	};

	// Mobile menu handlers
	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	}, [isMobileMenuOpen]);

	const closeMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(false);
	}, []);

	const handleMobileLinkClick = useCallback(
		(href: string) => {
			if (handleSmoothScroll(href)) {
				closeMobileMenu();
				return true;
			}
			closeMobileMenu();
			return false;
		},
		[handleSmoothScroll, closeMobileMenu],
	);

	// Track active section based on scroll position and navbar visibility
	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;

			// Always show navbar when at the very top (handles iOS bounce effect)
			if (scrollY <= 10) {
				setIsScrollingDown(false);
				lastScrollY.current = scrollY;
			} else {
				// Update navbar visibility based on scroll direction (only when not at top)
				if (scrollY > lastScrollY.current) {
					// Scrolling down
					setIsScrollingDown(true);
				} else if (scrollY < lastScrollY.current) {
					// Scrolling up
					setIsScrollingDown(false);
				}

				// Update last scroll position
				lastScrollY.current = scrollY;
			}

			const sections = ["about", "committees", "president", "opportunities"];
			const windowHeight = window.innerHeight;

			// Check if we're at the very top of the page (hero section)
			if (scrollY < 100) {
				setActiveSection(null);
				return;
			}

			// Check if we're near the bottom of the page (footer area)
			const documentHeight = document.documentElement.scrollHeight;
			const windowBottom = scrollY + windowHeight;
			if (windowBottom >= documentHeight - 200) {
				setActiveSection(null);
				return;
			}

			// Find the section that's most prominently in view
			let bestSection = null;
			let bestScore = 0;

			for (const sectionId of sections) {
				const element = document.getElementById(sectionId);
				if (element) {
					const rect = element.getBoundingClientRect();
					const elementTop = rect.top + scrollY;
					const elementBottom = elementTop + rect.height;

					// Calculate how much of the section is visible
					const viewportTop = scrollY;
					const viewportBottom = scrollY + windowHeight;
					const visibleTop = Math.max(elementTop, viewportTop);
					const visibleBottom = Math.min(elementBottom, viewportBottom);
					const visibleHeight = Math.max(0, visibleBottom - visibleTop);

					// Calculate a score based on visibility and position
					// Prefer sections that are more visible and closer to the center
					const visibilityRatio = visibleHeight / rect.height;
					const centerDistance = Math.abs(
						(visibleTop + visibleBottom) / 2 - (viewportTop + windowHeight / 2),
					);
					const normalizedCenterDistance = centerDistance / windowHeight;

					// Score combines visibility ratio and center proximity
					const score = visibilityRatio * (1 - normalizedCenterDistance * 0.5);

					if (score > bestScore && visibilityRatio > 0.1) {
						// At least 10% visible
						bestScore = score;
						bestSection = sectionId;
					}
				}
			}

			// Only update if we found a section, otherwise keep the current one
			if (bestSection) {
				setActiveSection(bestSection);
			}
		};

		// Check on mount and scroll
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Handle escape key and arrow navigation for mobile menu
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!isMobileMenuOpen) return;

			if (event.key === "Escape") {
				closeMobileMenu();
				return;
			}

			// Handle arrow key navigation
			if (event.key === "ArrowDown" || event.key === "ArrowUp") {
				event.preventDefault();
				const menuItems = Array.from(
					document.querySelectorAll("[data-mobile-menu-item]"),
				) as HTMLElement[];
				const currentIndex = menuItems.findIndex(
					(item) => item === document.activeElement,
				);

				let nextIndex: number;
				if (event.key === "ArrowDown") {
					nextIndex =
						currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
				} else {
					nextIndex =
						currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
				}

				menuItems[nextIndex]?.focus();
			}
		};

		if (isMobileMenuOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMobileMenuOpen, closeMobileMenu]);

	// Mount animation effect
	useEffect(() => {
		// Check initial scroll position
		const initialScrollY = window.scrollY;
		const isAtTop = initialScrollY < 100;

		// Start with navbar hidden if not at top
		if (!isAtTop) {
			setIsScrollingDown(true);
		}

		// Animate in after a short delay
		const timeout = setTimeout(() => {
			setIsMounted(true);

			// If not at top, animate in like scroll up effect
			if (!isAtTop) {
				setTimeout(() => {
					setIsScrollingDown(false);
				}, 200);
			}
		}, 150);

		return () => clearTimeout(timeout);
	}, []);

	// Add cleanup for hover timeout in useEffect
	useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current);
			}
		};
	}, []);

	// Update backdrop position when active section changes
	useEffect(() => {
		// Clear any existing timeout
		if (backdropUpdateTimeout.current) {
			clearTimeout(backdropUpdateTimeout.current);
		}

		// Check if we should show backdrop for page navigation or section navigation
		const shouldShowBackdrop =
			activeSection || pathname === "/events" || pathname === "/contact";

		if (!shouldShowBackdrop) {
			// Clear both backdrops when no section is active and not on a page
			setLeftBackdropStyle((prev) => ({
				...prev,
				opacity: 0,
				shouldAnimatePosition: false,
			}));
			setRightBackdropStyle((prev) => ({
				...prev,
				opacity: 0,
				shouldAnimatePosition: false,
			}));
			return;
		}

		// Debounced backdrop position update
		const updateBackdropPosition = () => {
			let navLabel: string | null = null;

			// Check if we're on a specific page first
			if (pathname === "/events") {
				navLabel = "Events";
			} else if (pathname === "/contact") {
				navLabel = "Contact Us";
			} else if (activeSection) {
				// Find the corresponding nav link for the active section
				const sectionToNavMap: { [key: string]: string } = {
					about: "About",
					committees: "Committees",
					president: "Leadership",
					opportunities: "Opportunities",
				};
				navLabel = sectionToNavMap[activeSection];
			}

			if (!navLabel) return;

			// Find which nav group (left or right) contains this link
			const leftNavLinks = navLinks.slice(0, 3);
			const rightNavLinks = navLinks.slice(3, 6);

			const isInLeftNav = leftNavLinks.some((link) => link.label === navLabel);
			const isInRightNav = rightNavLinks.some(
				(link) => link.label === navLabel,
			);

			if (isInLeftNav) {
				// Clear right backdrop and show left backdrop
				setRightBackdropStyle((prev) => ({
					...prev,
					opacity: 0,
					shouldAnimatePosition: false,
				}));

				// Use a more specific selector that matches the exact structure
				const leftNavContainer = document.querySelector(
					'nav[aria-label="Left navigation"]',
				);
				if (leftNavContainer) {
					const linkElement = Array.from(
						leftNavContainer.querySelectorAll("a"),
					).find((el) => el.textContent?.trim() === navLabel) as HTMLElement;

					if (linkElement) {
						// Use the exact same calculation logic as hover
						const navContainer = linkElement.parentElement;
						if (navContainer) {
							const elementRect = linkElement.getBoundingClientRect();
							const navRect = navContainer.getBoundingClientRect();

							const left = elementRect.left - navRect.left;
							const width = elementRect.width;

							setLeftBackdropStyle((prev) => ({
								left,
								width,
								opacity: 1,
								shouldAnimatePosition: prev.opacity > 0,
							}));
						}
					}
				}
			} else if (isInRightNav) {
				// Clear left backdrop and show right backdrop
				setLeftBackdropStyle((prev) => ({
					...prev,
					opacity: 0,
					shouldAnimatePosition: false,
				}));

				// Use a more specific selector that matches the exact structure
				const rightNavContainer = document.querySelector(
					'nav[aria-label="Right navigation"]',
				);
				if (rightNavContainer) {
					const linkElement = Array.from(
						rightNavContainer.querySelectorAll("a"),
					).find((el) => el.textContent?.trim() === navLabel) as HTMLElement;

					if (linkElement) {
						// Use the exact same calculation logic as hover
						const navContainer = linkElement.parentElement;
						if (navContainer) {
							const elementRect = linkElement.getBoundingClientRect();
							const navRect = navContainer.getBoundingClientRect();

							const left = elementRect.left - navRect.left;
							const width = elementRect.width;

							setRightBackdropStyle((prev) => ({
								left,
								width,
								opacity: 1,
								shouldAnimatePosition: prev.opacity > 0,
							}));
						}
					}
				}
			}
		};

		// Only update backdrop when navbar is visible
		if (!isScrollingDown) {
			// Navbar is visible, update after a short delay to ensure animation is complete
			backdropUpdateTimeout.current = setTimeout(updateBackdropPosition, 350);
		} else {
			// Navbar is hidden, clear the backdrop
			setLeftBackdropStyle((prev) => ({
				...prev,
				opacity: 0,
				shouldAnimatePosition: false,
			}));
			setRightBackdropStyle((prev) => ({
				...prev,
				opacity: 0,
				shouldAnimatePosition: false,
			}));
		}

		return () => {
			if (backdropUpdateTimeout.current) {
				clearTimeout(backdropUpdateTimeout.current);
			}
		};
	}, [activeSection, isScrollingDown, pathname]);

	// Handle backdrop restoration when hover state changes
	useEffect(() => {
		// Only restore backdrop if user is not hovering
		if (!hoveredNavLink) {
			const restoreTimeout = setTimeout(() => {
				// Check if we should show backdrop for page navigation or section navigation
				const shouldShowBackdrop =
					activeSection || pathname === "/events" || pathname === "/contact";

				if (!shouldShowBackdrop) {
					return;
				}

				let navLabel: string | null = null;

				// Check if we're on a specific page first
				if (pathname === "/events") {
					navLabel = "Events";
				} else if (pathname === "/contact") {
					navLabel = "Contact Us";
				} else if (activeSection) {
					// Find the corresponding nav link for the active section
					const sectionToNavMap: { [key: string]: string } = {
						about: "About",
						committees: "Committees",
						president: "Leadership",
						opportunities: "Opportunities",
					};
					navLabel = sectionToNavMap[activeSection];
				}

				if (!navLabel) return;

				// Find which nav group (left or right) contains this link
				const leftNavLinks = navLinks.slice(0, 3);
				const rightNavLinks = navLinks.slice(3, 6);

				const isInLeftNav = leftNavLinks.some(
					(link) => link.label === navLabel,
				);
				const isInRightNav = rightNavLinks.some(
					(link) => link.label === navLabel,
				);

				if (isInLeftNav) {
					// Restore left backdrop
					const leftNavContainer = document.querySelector(
						'nav[aria-label="Left navigation"]',
					);
					if (leftNavContainer) {
						const linkElement = Array.from(
							leftNavContainer.querySelectorAll("a"),
						).find((el) => el.textContent?.trim() === navLabel) as HTMLElement;

						if (linkElement) {
							const navContainer = linkElement.parentElement;
							if (navContainer) {
								const elementRect = linkElement.getBoundingClientRect();
								const navRect = navContainer.getBoundingClientRect();

								const left = elementRect.left - navRect.left;
								const width = elementRect.width;

								setLeftBackdropStyle((prev) => ({
									left,
									width,
									opacity: 1,
									shouldAnimatePosition: prev.opacity > 0,
								}));
							}
						}
					}
				} else if (isInRightNav) {
					// Restore right backdrop
					const rightNavContainer = document.querySelector(
						'nav[aria-label="Right navigation"]',
					);
					if (rightNavContainer) {
						const linkElement = Array.from(
							rightNavContainer.querySelectorAll("a"),
						).find((el) => el.textContent?.trim() === navLabel) as HTMLElement;

						if (linkElement) {
							const navContainer = linkElement.parentElement;
							if (navContainer) {
								const elementRect = linkElement.getBoundingClientRect();
								const navRect = navContainer.getBoundingClientRect();

								const left = elementRect.left - navRect.left;
								const width = elementRect.width;

								setRightBackdropStyle((prev) => ({
									left,
									width,
									opacity: 1,
									shouldAnimatePosition: prev.opacity > 0,
								}));
							}
						}
					}
				}
			}, 50); // Short delay to allow hover transitions to complete

			return () => clearTimeout(restoreTimeout);
		}
	}, [hoveredNavLink, activeSection, pathname]);

	return (
		<motion.nav
			className="fixed top-12 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] backdrop-blur-md rounded-3xl lg:rounded-full lg:max-w-[990px] z-50 **:select-none"
			initial={{
				opacity: 0,
				filter: "blur(8px)",
				scale: 1,
				y: 0,
			}}
			animate={{
				y: isScrollingDown ? -120 : 0,
				scale: isScrollingDown ? 0.9 : 1,
				filter: !isMounted
					? "blur(8px)"
					: isScrollingDown
						? "blur(4px)"
						: "blur(0px)",
				opacity: !isMounted ? 0 : isScrollingDown ? 0 : 1,
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 30,
				opacity: { duration: isMounted ? 0.2 : 0.6 },
				filter: { duration: isMounted ? 0.2 : 0.8 },
			}}
		>
			<div className="relative bg-background/30 backdrop-blur-md border border-border rounded-3xl lg:rounded-full px-4 sm:px-6 py-3 shadow-2xl overflow-hidden">
				{/* Desktop Navigation (Large screens) */}
				<div
					className="hidden lg:flex items-center justify-center"
					style={{ gap: "clamp(1.5rem, 2vw, 2rem)" }}
				>
					{/* Left Navigation Links */}
					<nav
						className="flex items-center justify-center relative"
						style={{ gap: "clamp(1rem, 1.5vw, 1.5rem)" }}
						onMouseLeave={handleLeftNavContainerLeave}
						aria-label="Left navigation"
					>
						{/* Animated backdrop for left nav */}
						<motion.div
							className="absolute bg-foreground/5 border-t rounded-full pointer-events-none z-0"
							style={{
								left: leftBackdropStyle.left,
								width: leftBackdropStyle.width,
								height: "36px",
								top: "0px",
								bottom: "0px",
							}}
							animate={{
								left: leftBackdropStyle.left,
								width: leftBackdropStyle.width,
								opacity: leftBackdropStyle.opacity,
								scale: leftBackdropStyle.opacity > 0 ? 1 : 0.8,
							}}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 30,
								opacity: { duration: 0.2 },
								scale: {
									type: "spring",
									stiffness: 400,
									damping: 40,
								},
								// Only animate position if shouldAnimatePosition is true
								left: leftBackdropStyle.shouldAnimatePosition
									? undefined
									: { duration: 0 },
								width: leftBackdropStyle.shouldAnimatePosition
									? undefined
									: { duration: 0 },
							}}
						/>
						{navLinks.slice(0, 3).map((link) => {
							// Extract section ID from href (remove '/' prefix for section matching)
							const sectionId = link.href.startsWith("/")
								? link.href.substring(1)
								: null;
							// Check if active by section or by pathname
							const isActive =
								sectionId === activeSection || pathname === link.href;

							return (
								<Link
									key={link.href}
									href={link.href}
									ref={(el) => {
										if (el && sectionId) navRefs.current[sectionId] = el;
									}}
									className={cn(
										"text-sm font-medium transition-colors py-2 px-3 relative z-20 whitespace-nowrap",
										hoveredNavLink === link.label || isActive
											? "text-foreground"
											: "text-foreground/80 hover:text-foreground",
									)}
									style={{ minWidth: "fit-content" }}
									onMouseEnter={(e) =>
										handleLeftNavLinkEnter(link.label, e.currentTarget)
									}
									onMouseLeave={handleLeftNavLinkLeave}
									onClick={(e) => {
										if (handleSmoothScroll(link.href)) {
											e.preventDefault();
										}
									}}
								>
									{link.label}
								</Link>
							);
						})}
					</nav>

					{/* Logo */}
					<div className="flex items-center justify-center gap-2 relative mx-6 xl:mx-8">
						<Link
							href="/"
							className="flex items-center justify-center relative left-2 top-1 z-10"
						>
							<Image
								src="/brand/pennmaritime.svg"
								alt="Maritime at Penn"
								width={140}
								height={48}
								className="h-12 w-auto"
							/>
						</Link>
					</div>

					{/* Right Navigation Links */}
					<nav
						className="flex items-center justify-center relative"
						style={{ gap: "clamp(1rem, 1.5vw, 1.5rem)" }}
						onMouseLeave={handleRightNavContainerLeave}
						aria-label="Right navigation"
					>
						{/* Animated backdrop for right nav */}
						<motion.div
							className="absolute bg-foreground/5 border-t rounded-full pointer-events-none z-0"
							style={{
								left: rightBackdropStyle.left,
								width: rightBackdropStyle.width,
								height: "36px",
								top: "0px",
								bottom: "0px",
							}}
							animate={{
								left: rightBackdropStyle.left,
								width: rightBackdropStyle.width,
								opacity: rightBackdropStyle.opacity,
								scale: rightBackdropStyle.opacity > 0 ? 1 : 0.8,
							}}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 30,
								opacity: { duration: 0.2 },
								scale: {
									type: "spring",
									stiffness: 400,
									damping: 40,
								},
								// Only animate position if shouldAnimatePosition is true
								left: rightBackdropStyle.shouldAnimatePosition
									? undefined
									: { duration: 0 },
								width: rightBackdropStyle.shouldAnimatePosition
									? undefined
									: { duration: 0 },
							}}
						/>
						{navLinks.slice(3, 6).map((link) => {
							// Extract section ID from href (remove '/' prefix for section matching)
							const sectionId = link.href.startsWith("/")
								? link.href.substring(1)
								: null;
							// Check if active by section or by pathname
							const isActive =
								sectionId === activeSection || pathname === link.href;

							return (
								<Link
									key={link.href}
									href={link.href}
									ref={(el) => {
										if (el && sectionId) navRefs.current[sectionId] = el;
									}}
									className={cn(
										"text-sm font-medium transition-colors py-2 px-3 relative z-20 whitespace-nowrap",
										hoveredNavLink === link.label || isActive
											? "text-foreground"
											: "text-foreground/80 hover:text-foreground",
									)}
									style={{ minWidth: "fit-content" }}
									onMouseEnter={(e) =>
										handleRightNavLinkEnter(link.label, e.currentTarget)
									}
									onMouseLeave={handleRightNavLinkLeave}
									onClick={(e) => {
										if (handleSmoothScroll(link.href)) {
											e.preventDefault();
										}
									}}
								>
									{link.label}
								</Link>
							);
						})}
					</nav>
				</div>

				{/* Mobile/Tablet Navigation (Small to Large screens) */}
				<div className="flex lg:hidden items-center justify-between">
					{/* Logo */}
					<div className="flex-1 flex justify-center">
						<Link
							href="/"
							className="flex items-center justify-center relative left-2 top-1 z-10"
						>
							<Image
								src="/brand/pennmaritime.svg"
								alt="Maritime at Penn"
								width={140}
								height={48}
								className="h-12 w-auto"
							/>
						</Link>
					</div>

					{/* Menu Button */}
					<button
						type="button"
						onClick={toggleMobileMenu}
						className="p-2 text-foreground hover:text-foreground transition-colors relative z-10 touch-manipulation"
						aria-label="Toggle navigation menu"
						aria-expanded={isMobileMenuOpen}
					>
						<div className="w-6 h-6 flex flex-col justify-center items-center relative">
							{/* Top line */}
							<motion.div
								className="w-5 h-0.5 bg-foreground rounded-full absolute"
								animate={{
									rotate: isMobileMenuOpen ? 45 : 0,
									y: isMobileMenuOpen ? 0 : -3,
								}}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 40,
								}}
							/>
							{/* Bottom line */}
							<motion.div
								className="w-5 h-0.5 bg-foreground rounded-full absolute"
								animate={{
									rotate: isMobileMenuOpen ? -45 : 0,
									y: isMobileMenuOpen ? 0 : 3,
								}}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 40,
								}}
							/>
						</div>
					</button>
				</div>

				{/* Expandable Mobile Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="xl:hidden overflow-hidden"
						>
							<div className="pt-4 pb-2">
								<nav className="flex flex-col gap-2">
									{navLinks.map((link, index) => {
										const sectionId = link.href.startsWith("/")
											? link.href.substring(1)
											: null;
										// Check if active by section or by pathname
										const isActive =
											sectionId === activeSection || pathname === link.href;

										return (
											<motion.div
												key={link.href}
												initial={{ x: -20, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												transition={{
													duration: 0.2,
													delay: index * 0.05,
												}}
											>
												<Link
													href={link.href}
													data-mobile-menu-item
													className={cn(
														"block text-sm font-medium transition-colors py-3 px-4 rounded-full text-center touch-manipulation focus:outline-none focus:ring-2 focus:ring-foreground/20",
														isActive
															? "text-foreground bg-foreground/5"
															: "text-foreground/80 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10",
													)}
													onClick={(e) => {
														if (handleMobileLinkClick(link.href)) {
															e.preventDefault();
														}
													}}
												>
													{link.label}
												</Link>
											</motion.div>
										);
									})}
								</nav>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>
	);
};

export default Navbar;
