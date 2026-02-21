import { collection, config, fields } from "@keystatic/core";

export default config({
	storage: {
		kind: "cloud",
	},
	cloud: {
		project: "outjourney/outjourney",
	},
	collections: {
		events: collection({
			label: "Events",
			slugField: "title",
			path: "content/events/*",
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				type: fields.select({
					label: "Event Type",
					options: [
						{ label: "Guest Speaking", value: "Guest Speaking" },
						{ label: "Meeting", value: "Meeting" },
						{ label: "Workshop", value: "Workshop" },
						{ label: "Networking", value: "Networking" },
						{ label: "Conference", value: "Conference" },
						{ label: "Retreat", value: "Retreat" },
					],
					defaultValue: "Guest Speaking",
				}),
				speaker: fields.text({
					label: "Speaker Name",
					description: "Leave empty if no speaker",
				}),
				company: fields.text({
					label: "Company/Organization",
					description: "Leave empty if no company",
				}),
				date: fields.date({
					label: "Event Date",
				}),
				time: fields.text({
					label: "Event Time",
					description: "e.g., 6:00 PM - 8:00 PM",
				}),
				location: fields.text({
					label: "Location",
					description: "Event venue or online platform",
				}),
				featuredImage: fields.image({
					label: "Featured Image",
					directory: "public/events",
					publicPath: "/events/",
				}),
				eventImages: fields.array(
					fields.image({
						label: "Event Photo",
						directory: "public/events",
						publicPath: "/events/",
					}),
					{
						label: "Event Photos",
						description: "Additional photos from the event",
						itemLabel: (props) => props.value?.filename || "Event Photo",
					},
				),
				shortDescription: fields.text({
					label: "Short Description",
					description: "Brief description for cards and previews",
					multiline: true,
				}),
				content: fields.document({
					label: "Event Content",
					formatting: true,
					dividers: true,
					links: true,
					images: {
						directory: "public/events",
						publicPath: "/events/",
					},
				}),
				presidentMessage: fields.conditional(
					fields.checkbox({
						label: "Include President Message",
						defaultValue: false,
					}),
					{
						true: fields.object({
							title: fields.text({
								label: "Message Title",
								defaultValue: "Words from the President",
							}),
							content: fields.text({
								label: "President Message Content",
								multiline: true,
							}),
						}),
						false: fields.empty(),
					},
				),
				registrationLink: fields.url({
					label: "Registration Link",
					description: "Optional registration or RSVP link",
				}),
				tags: fields.array(fields.text({ label: "Tag" }), {
					label: "Tags",
					itemLabel: (props) => props.value,
				}),
				featured: fields.checkbox({
					label: "Featured Event",
					description: "Show this event prominently on homepage",
					defaultValue: false,
				}),
				status: fields.select({
					label: "Status",
					options: [
						{ label: "Upcoming", value: "upcoming" },
						{ label: "Past", value: "past" },
						{ label: "Draft", value: "draft" },
					],
					defaultValue: "upcoming",
				}),
			},
		}),
	},
});
