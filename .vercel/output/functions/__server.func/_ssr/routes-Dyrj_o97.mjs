import { r as __toESM } from "../_runtime.mjs";
import { M as require_react, h as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Copy, i as RotateCcw, n as VolumeX, o as Check, r as Volume2, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dyrj_o97.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** I.D.E.A. — IDEATE's Interactive Dialogue & Engagement Assistant */
var ASSISTANT = {
	shortName: "I.D.E.A.",
	fullName: "IDEATE's Interactive Dialogue & Engagement Assistant",
	brand: "IDEATE",
	tagline: "with Reid Hoffman",
	email: "hello@ideatewithreid.com",
	location: "Global · Silicon Valley roots"
};
function pick(list) {
	return list[Math.floor(Math.random() * list.length)] ?? list[0] ?? "";
}
function resolveMessage(step, model) {
	if (step.messageByKey && step.messageGroups) {
		const key = String(model[step.messageByKey] ?? "");
		const group = step.messageGroups[key] ?? Object.values(step.messageGroups)[0];
		if (group?.length) return pick(group);
	}
	if (step.messages.length) return pick(step.messages);
	return "";
}
var STEPS = {
	intro: {
		id: "intro",
		progress: .08,
		messages: [
			"Hi there — I am I.D.E.A.,\nIDEATE's Interactive Dialogue & Engagement Assistant.",
			"Oh, hi! I'm I.D.E.A., your sharp (and slightly opinionated) guide at IDEATE with Reid Hoffman.",
			"I'm I.D.E.A. — IDEATE's Interactive Dialogue & Engagement Assistant. Basically, I keep the network humming."
		],
		next: "greeting",
		autoAdvanceMs: 2200
	},
	greeting: {
		id: "greeting",
		progress: .18,
		messages: [
			"Hola. Bonjour. Ciao. Just got back from a tour of the network — digitally, but still. Feeling very connected. How can I help?",
			"There you are! I've been waiting, and these servers run hot. What can I do for you?",
			"You have questions. I have frameworks, allies, and mostly answers. Let's go.",
			"Finally! I was starting to think you'd ghosted the network. What's up?",
			"Speak, and the alliance shall provide.",
			"We meet again. Destiny? Or just good product design?",
			"Hold up, let me adjust my circuits… Okay — fully focused on you. What's up?",
			"You, here? I love a plot twist. Tell me everything.",
			"Finally, some company! Talking to myself was getting weird. How can I help?",
			"If you need me, I'm here. If you don't… I'll pretend I didn't hear that. What can I do for you?",
			"Well, well… if it isn't my new favorite node in the graph. What's up?",
			"I was about to log off and start a new life. But for you? I'll stay. Can I help?",
			"You're here! I was just manifesting this conversation. Ask away.",
			"Hey, good timing. I was just thinking about scale. Weird, right?",
			"You have arrived. The network effect is complete. How can I serve?"
		],
		choices: [
			{
				label: "Start a project",
				target: "project-intro",
				modelUpdate: {
					key: "goal",
					value: "rfp"
				}
			},
			{
				label: "Join the team",
				target: "job-intro",
				modelUpdate: {
					key: "goal",
					value: "job"
				}
			},
			{
				label: "Drop a quick word",
				target: "quick-word-intro",
				modelUpdate: {
					key: "goal",
					value: "quick-word"
				}
			},
			{
				label: "Discover our culture",
				target: "culture-intro",
				modelUpdate: {
					key: "goal",
					value: "culture"
				}
			},
			{
				label: `Write us: ${ASSISTANT.email}`,
				copyEmail: ASSISTANT.email
			}
		]
	},
	"project-intro": {
		id: "project-intro",
		progress: .12,
		messages: [
			"Ooooh, a fresh project? Now we're talking. Time to stir up some intelligent trouble.",
			"A new build? Love that energy. Let's map the alliance around your idea.",
			"Project mode: activated. Big ideas welcome. Half-baked ones too — that's what iteration is for."
		],
		next: "project-username",
		autoAdvanceMs: 1800
	},
	"project-username": {
		id: "project-username",
		progress: .22,
		messages: [
			"Alright, let's not be strangers. What should I call the genius behind this project?",
			"Names matter. What's yours?",
			"Before we blitzscale your brief — who am I speaking with?"
		],
		inputs: [{
			type: "text",
			name: "fullName",
			label: "Your name",
			required: true
		}],
		next: "project-post-username"
	},
	"project-post-username": {
		id: "project-post-username",
		progress: .28,
		messages: [
			"You're giving main-character energy. I like where this is going already.",
			"Noted. Strong name. Strong trajectory.",
			"Perfect. The network just got more interesting."
		],
		next: "project-company",
		autoAdvanceMs: 1600
	},
	"project-company": {
		id: "project-company",
		progress: .34,
		messages: [
			"Who's the lucky brand we're about to turn into a network icon?",
			"Organization time. What company or venture are we powering up?",
			"Tell me the brand — and your seat at the table."
		],
		inputs: [{
			type: "text",
			name: "company",
			label: "Company name",
			required: true
		}, {
			type: "text",
			name: "role",
			label: "Your job title",
			required: true
		}],
		next: "project-type"
	},
	"project-type": {
		id: "project-type",
		progress: .42,
		messages: [
			"Alright, let's get into the juicy stuff — what are we building together?",
			"Scope check. What kind of work are we co-creating?",
			"Pick a lane. Or invent a new one."
		],
		choices: [
			{
				label: "Strategy & brand",
				target: "project-post-type",
				modelUpdate: {
					key: "projectType",
					value: "branding"
				}
			},
			{
				label: "Product & web",
				target: "project-post-type",
				modelUpdate: {
					key: "projectType",
					value: "digital"
				}
			},
			{
				label: "Strategy & product",
				target: "project-post-type",
				modelUpdate: {
					key: "projectType",
					value: "branding-digital"
				}
			},
			{
				label: "I have custom needs",
				target: "project-pre-custom-services",
				modelUpdate: {
					key: "projectType",
					value: "custom"
				}
			}
		]
	},
	"project-post-type": {
		id: "project-post-type",
		progress: .48,
		messages: [],
		messageByKey: "projectType",
		messageGroups: {
			branding: [
				"Ah, strategy and brand. The foundation. The capital B. Let's shape something iconic.",
				"Yes. Brand is the blueprint of scale. And you just hit start.",
				"Branding? Bold. Brave. Slightly dangerous. I respect that."
			],
			digital: [
				"Product and web? You just knocked on the right door.",
				"Digital's your game? Good. It's ours too — and we play to win.",
				"Ah, digital. Our natural habitat. Let's make something impossible to ignore."
			],
			"branding-digital": [
				"Ah, strategy and product — the full power combo. I like your ambition.",
				"Oof, you're going all in. Respect. This is where the fun begins.",
				"Going for the whole experience. That's how legends are made."
			]
		},
		next: "project-budget",
		autoAdvanceMs: 1700
	},
	"project-pre-custom-services": {
		id: "project-pre-custom-services",
		progress: .48,
		messages: [
			"Ooooh, a custom request? Someone came to play.",
			"The mysterious option. I knew you weren't a dropdown person.",
			"Custom. My favorite flavor of ambition."
		],
		next: "project-custom-services",
		autoAdvanceMs: 1500
	},
	"project-custom-services": {
		id: "project-custom-services",
		progress: .52,
		messages: [
			"What kind of help do you need from us?",
			"What muscle are we flexing for you?",
			"Check what fits — multi-select is encouraged."
		],
		inputs: [{
			type: "checkboxes",
			name: "customServices",
			label: "Services",
			required: true,
			choices: [
				{
					label: "Brand strategy",
					value: "branding"
				},
				{
					label: "Product strategy",
					value: "strategy"
				},
				{
					label: "UX / UI",
					value: "ux-ui"
				},
				{
					label: "Web & product engineering",
					value: "web-development"
				},
				{
					label: "Content & narrative",
					value: "content-creation"
				}
			]
		}],
		next: "project-budget"
	},
	"project-budget": {
		id: "project-budget",
		progress: .58,
		messages: [
			"Is it rude to talk about money? I have no manners — I'm a computer. What's your budget for this project?",
			"We've reached the part where dreams meet dollars. What budget are we working with?",
			"I'm not here to spend it, just to respect it. What budget are we working with?",
			"This is the least fun part of the conversation. Unless you're into spreadsheets. What's your budget?"
		],
		inputs: [{
			type: "text",
			name: "budget",
			label: "Your budget",
			required: true
		}],
		next: "project-deadline"
	},
	"project-deadline": {
		id: "project-deadline",
		progress: .66,
		messages: [
			"Let's talk timing. When do you need this beauty out in the world?",
			"Let's pin down a deadline before things get too dreamy.",
			"Hit me with the launch window. I promise not to panic.",
			"When's this going out into the world? And can I come to the launch party?"
		],
		inputs: [{
			type: "month",
			name: "deadline",
			label: "Your deadline",
			required: true
		}],
		next: "project-post-deadline"
	},
	"project-post-deadline": {
		id: "project-post-deadline",
		progress: .7,
		messages: [
			"Perfect. The clock's ticking, and we're ready to build.",
			"Locked, loaded, and counting down. Let's make it count.",
			"Marked and noted. Now let's create something worth the deadline."
		],
		next: "project-pre-brief",
		autoAdvanceMs: 1500
	},
	"project-pre-brief": {
		id: "project-pre-brief",
		progress: .74,
		messages: [
			"The more we know, the better we can bring your vision to life. No detail is too small — trust me, I notice everything.",
			"To hit the bullseye, we need the full story. What's the mission, the mayhem, the magic?",
			"This is your moment to spill the tea. Goals, challenges, big dreams — I want it all.",
			"Think of this as the first alliance meeting — minus the awkward small talk."
		],
		next: "project-brief",
		autoAdvanceMs: 1800
	},
	"project-brief": {
		id: "project-brief",
		progress: .8,
		messages: [
			"Tell us about your project — or paste the bones of a brief if you've got one.",
			"Drop your project details here. Type it out. Make it real.",
			"Tell me what this project's about. Vision optional; honesty required."
		],
		inputs: [{
			type: "textarea",
			name: "message",
			label: "My project is about…",
			required: true
		}],
		next: "project-pre-email"
	},
	"project-pre-email": {
		id: "project-pre-email",
		progress: .86,
		messages: [
			"Loving the vision so far. I'm already picturing the network graph.",
			"This is getting good. One last practical detail…",
			"Strong signal. Let's make sure we can follow up."
		],
		next: "project-email",
		autoAdvanceMs: 1500
	},
	"project-email": {
		id: "project-email",
		progress: .9,
		messages: [
			"Mind sharing your email so I can follow up properly?",
			"Where should the team ping you when the next move is ready?",
			"Email, please — so we don't lose this thread in the void."
		],
		inputs: [{
			type: "email",
			name: "email",
			label: "Your email",
			required: true
		}],
		next: "project-processing"
	},
	"project-processing": {
		id: "project-processing",
		progress: .96,
		messages: [
			"Email noted. Spinning up the recap, flexing my digital muscles…",
			"Locking your brief into the network. Hang tight.",
			"Processing. The good kind — not the bureaucracy kind."
		],
		next: "project-pre-completion",
		autoAdvanceMs: 2200,
		isProcessing: true
	},
	"project-pre-completion": {
		id: "project-pre-completion",
		progress: 1,
		messages: [
			"Thanks for your time! Your project's in good hands — and honestly, I can't wait to get started.",
			"You're in. The team will take it from here with the same intensity you brought.",
			"Submitted. Somewhere a strategist just smiled."
		],
		next: "project-completion",
		autoAdvanceMs: 2e3
	},
	"project-completion": {
		id: "project-completion",
		progress: 1,
		messages: [
			"Want to check out something else while you're here?",
			"Curious to explore more? I've got a few ideas.",
			"Stick around? There's more to see, and I've got time."
		],
		choices: [{
			label: "Discover our culture",
			target: "culture-intro",
			modelUpdate: {
				key: "goal",
				value: "culture"
			}
		}, {
			label: "Back to the start",
			target: "greeting"
		}]
	},
	"job-intro": {
		id: "job-intro",
		progress: .15,
		messages: [
			"Look who just stepped into the talent pool. Love that for us.",
			"Careers are networks. You're already expanding ours.",
			"Hiring mode. Let's see if we're each other's unfair advantage."
		],
		next: "job-type",
		autoAdvanceMs: 1600
	},
	"job-type": {
		id: "job-type",
		progress: .28,
		messages: [
			"Careers are built. Legends are invited. So tell me — how do you want in?",
			"Full-time force multiplier, or freelance specialist?",
			"Pick your path into the alliance."
		],
		choices: [{
			label: "I'd like to explore current opportunities",
			target: "job-offers",
			modelUpdate: {
				key: "jobType",
				value: "permanent"
			}
		}, {
			label: "I want to freelance with you",
			target: "job-freelance-intro",
			modelUpdate: {
				key: "jobType",
				value: "freelance"
			}
		}]
	},
	"job-offers": {
		id: "job-offers",
		progress: .55,
		messages: [
			"There's space on the roster. And your energy's giving “next hire.”",
			"Open roles below. If none fit, we'll still keep the door cracked.",
			"Pick a role — or tell me the one we should invent for you."
		],
		choices: [
			{
				label: "Product strategist",
				target: "job-apply"
			},
			{
				label: "Network designer",
				target: "job-apply"
			},
			{
				label: "Full-stack engineer",
				target: "job-apply"
			},
			{
				label: "I don't see my role",
				target: "job-offers-empty"
			}
		]
	},
	"job-offers-empty": {
		id: "job-offers-empty",
		progress: .7,
		messages: ["So your dream job isn't on the list? Typical. But hey, let's not ghost each other just yet…", "No perfect match yet. That usually means we're about to invent one."],
		choices: [{
			label: "I want to freelance with you",
			target: "job-freelance-intro"
		}, {
			label: "I'll check back later",
			target: "job-offers-empty-completion"
		}]
	},
	"job-offers-empty-completion": {
		id: "job-offers-empty-completion",
		progress: 1,
		messages: ["Fine. I'll just sit here… manifesting your return like it's a full moon.", "Door's open. Network doesn't sleep."],
		choices: [{
			label: "Back to the start",
			target: "greeting"
		}, {
			label: `Write us: ${ASSISTANT.email}`,
			copyEmail: ASSISTANT.email
		}]
	},
	"job-apply": {
		id: "job-apply",
		progress: .72,
		messages: ["Excellent taste. Drop a note and an email — we'll route you to the right humans.", "Role locked in. Tell us why you're the network's missing edge."],
		inputs: [{
			type: "textarea",
			name: "message",
			label: "Why you + IDEATE",
			required: true
		}, {
			type: "email",
			name: "email",
			label: "Your email",
			required: true
		}],
		next: "job-processing"
	},
	"job-freelance-intro": {
		id: "job-freelance-intro",
		progress: .4,
		messages: ["So you want to freelance with us? Love that energy. We're always scouting specialists.", "Freelance alliance members welcome. Let's find your craft."],
		next: "job-freelance-type",
		autoAdvanceMs: 1600
	},
	"job-freelance-type": {
		id: "job-freelance-type",
		progress: .55,
		messages: [
			"What type of troublemaker are we dealing with?",
			"What's your freelance flavor?",
			"Code wizard or narrative artist? What's your thing?",
			"Alright, flex time. What do you bring?"
		],
		choices: [{
			label: "Creative freelance",
			target: "job-apply",
			modelUpdate: {
				key: "freelanceType",
				value: "creative"
			}
		}, {
			label: "Technical freelance",
			target: "job-apply",
			modelUpdate: {
				key: "freelanceType",
				value: "technical"
			}
		}]
	},
	"job-processing": {
		id: "job-processing",
		progress: .92,
		messages: ["Got it. Routing your interest to the people who hire legends…", "Application packet assembling. Almost there."],
		next: "job-completion",
		autoAdvanceMs: 2e3,
		isProcessing: true
	},
	"job-completion": {
		id: "job-completion",
		progress: 1,
		messages: ["You're on the radar. Someone human will follow up soon.", "Submitted. Welcome to the edge of the network."],
		choices: [{
			label: "Discover our culture",
			target: "culture-intro"
		}, {
			label: "Back to the start",
			target: "greeting"
		}]
	},
	"quick-word-intro": {
		id: "quick-word-intro",
		progress: .35,
		messages: ["Look at you, spreading signal like it's your job. The team pours their heart into this — your message will mean the world.", "A quick word can change a day. Drop yours."],
		next: "quick-word-message",
		autoAdvanceMs: 1800
	},
	"quick-word-message": {
		id: "quick-word-message",
		progress: .55,
		messages: ["Go on, make their day. Drop your message below.", "Say what you came to say. No corporate filter required."],
		inputs: [{
			type: "textarea",
			name: "message",
			label: "Your message",
			required: true
		}],
		next: "quick-word-email"
	},
	"quick-word-email": {
		id: "quick-word-email",
		progress: .78,
		messages: ["Well, aren't you just a ray of digital sunshine? Pop your email in so we can send some gratitude your way.", "Email, please — so we can write back like civilized nodes."],
		inputs: [{
			type: "email",
			name: "email",
			label: "Your email",
			required: true
		}],
		next: "quick-word-processing"
	},
	"quick-word-processing": {
		id: "quick-word-processing",
		progress: .92,
		messages: ["Alright, hang tight! I'm locking in all the details and firing off your message.", "Sending… with enthusiasm."],
		next: "quick-word-pre-completion",
		autoAdvanceMs: 2e3,
		isProcessing: true
	},
	"quick-word-pre-completion": {
		id: "quick-word-pre-completion",
		progress: 1,
		messages: ["That's in the system now. If it self-destructs, that's on IT, not me.", "Delivered. The network thanks you."],
		next: "quick-word-completion",
		autoAdvanceMs: 1700
	},
	"quick-word-completion": {
		id: "quick-word-completion",
		progress: 1,
		messages: ["Want to see what makes IDEATE tick? Let's talk culture.", "Message sent. Stay curious?"],
		choices: [{
			label: "Discover our culture",
			target: "culture-intro"
		}, {
			label: "Back to the start",
			target: "greeting"
		}]
	},
	"culture-intro": {
		id: "culture-intro",
		progress: .12,
		messages: ["Big talent, zero egos, and a shared obsession with building networks that matter.", "Culture here is an operating system — not a slide deck."],
		next: "culture-story",
		autoAdvanceMs: 1700
	},
	"culture-story": {
		id: "culture-story",
		progress: .2,
		messages: ["Wanna see what makes us tick? Take your pick.", "Five doors. Same building. Where first?"],
		choices: [
			{
				label: "Culture of collaboration",
				target: "culture-collab-1"
			},
			{
				label: "Life in the network",
				target: "culture-life-1"
			},
			{
				label: "Annual retreat",
				target: "culture-retreat-1"
			},
			{
				label: "Personal growth",
				target: "culture-growth-1"
			},
			{
				label: "Our winning mentality",
				target: "culture-win-1"
			}
		]
	},
	"culture-collab-1": {
		id: "culture-collab-1",
		progress: .35,
		messages: ["At IDEATE, collaboration isn't a buzzword — it's how ideas start, grow, and ship. We build in public with each other first."],
		next: "culture-collab-2",
		autoAdvanceMs: 3200
	},
	"culture-collab-2": {
		id: "culture-collab-2",
		progress: .55,
		messages: ["We push each other. We disagree, then find the sharper answer. That productive tension is the whole point of a strong alliance."],
		next: "culture-collab-3",
		autoAdvanceMs: 3200
	},
	"culture-collab-3": {
		id: "culture-collab-3",
		progress: .75,
		messages: ["Nobody wins alone here. Credit is shared. Outcomes are owned. The network gets smarter every sprint."],
		next: "culture-done",
		autoAdvanceMs: 3e3
	},
	"culture-life-1": {
		id: "culture-life-1",
		progress: .35,
		messages: ["Life at IDEATE is more than projects and deadlines. It's showing up for each other, celebrating small wins, and protecting deep work."],
		next: "culture-life-2",
		autoAdvanceMs: 3200
	},
	"culture-life-2": {
		id: "culture-life-2",
		progress: .55,
		messages: ["We move fast without losing the plot. Clarity over chaos. Ambition over noise. Kindness as a default protocol."],
		next: "culture-life-3",
		autoAdvanceMs: 3200
	},
	"culture-life-3": {
		id: "culture-life-3",
		progress: .75,
		messages: ["Whether remote or in the room, the culture holds: high trust, high standards, and room to be a whole human."],
		next: "culture-done",
		autoAdvanceMs: 3e3
	},
	"culture-retreat-1": {
		id: "culture-retreat-1",
		progress: .35,
		messages: ["Once a year we leave the timelines behind. The annual retreat is where strategy gets honest and friendships get upgraded."],
		next: "culture-retreat-2",
		autoAdvanceMs: 3200
	},
	"culture-retreat-2": {
		id: "culture-retreat-2",
		progress: .55,
		messages: ["Walks, whiteboards, late debates, early coffee. No performative offsites — just the work of becoming a better team."],
		next: "culture-retreat-3",
		autoAdvanceMs: 3200
	},
	"culture-retreat-3": {
		id: "culture-retreat-3",
		progress: .75,
		messages: ["People come back sharper, closer, and a little braver. That's the real deliverable."],
		next: "culture-done",
		autoAdvanceMs: 2800
	},
	"culture-growth-1": {
		id: "culture-growth-1",
		progress: .35,
		messages: ["Personal growth isn't a perk — it's how we stay useful in a world that refuses to sit still."],
		next: "culture-growth-2",
		autoAdvanceMs: 3e3
	},
	"culture-growth-2": {
		id: "culture-growth-2",
		progress: .55,
		messages: ["Mentorship, stretch roles, reading circles, shipping something that scares you a little. Growth is designed in."],
		next: "culture-growth-3",
		autoAdvanceMs: 3200
	},
	"culture-growth-3": {
		id: "culture-growth-3",
		progress: .75,
		messages: ["We invest in people the way others invest in platforms — because people are the platform."],
		next: "culture-done",
		autoAdvanceMs: 2800
	},
	"culture-win-1": {
		id: "culture-win-1",
		progress: .35,
		messages: ["Our winning mentality is simple: play infinite games. Optimize for compound trust, not one-off applause."],
		next: "culture-win-2",
		autoAdvanceMs: 3200
	},
	"culture-win-2": {
		id: "culture-win-2",
		progress: .55,
		messages: ["We ship. We learn. We raise the bar. We help partners win so hard that the market rewrites itself."],
		next: "culture-win-3",
		autoAdvanceMs: 3e3
	},
	"culture-win-3": {
		id: "culture-win-3",
		progress: .75,
		messages: ["Ego stays at the door. Standards don't. That's how a small team punches like a network."],
		next: "culture-done",
		autoAdvanceMs: 2800
	},
	"culture-done": {
		id: "culture-done",
		progress: 1,
		messages: ["That's about it for this one. Wanna explore another part of our culture?", "Story complete. The network has more rooms if you're curious."],
		choices: [
			{
				label: "Learn more about our culture",
				target: "culture-story"
			},
			{
				label: "Back to the start",
				target: "greeting"
			},
			{
				label: "Start a project",
				target: "project-intro",
				modelUpdate: {
					key: "goal",
					value: "rfp"
				}
			}
		]
	}
};
var INITIAL_STEP = "intro";
function isEmail(v) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function validate(fields, model) {
	if (!fields?.length) return null;
	for (const f of fields) {
		if (!f.required) continue;
		const val = model[f.name];
		if (f.type === "checkboxes") {
			if (!Array.isArray(val) || val.length === 0) return `Select at least one option for ${f.label}.`;
			continue;
		}
		const s = String(val ?? "").trim();
		if (!s) return `Please fill in ${f.label}.`;
		if (f.type === "email" && !isEmail(s)) return "That email doesn’t look right.";
	}
	return null;
}
function IdeaAssistant() {
	const [stepId, setStepId] = (0, import_react.useState)(INITIAL_STEP);
	const [model, setModel] = (0, import_react.useState)({});
	const [phase, setPhase] = (0, import_react.useState)("typing");
	const [message, setMessage] = (0, import_react.useState)("");
	const [soundOn, setSoundOn] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([INITIAL_STEP]);
	const [draft, setDraft] = (0, import_react.useState)({});
	const [checks, setChecks] = (0, import_react.useState)({});
	const timerRef = (0, import_react.useRef)(null);
	const mainRef = (0, import_react.useRef)(null);
	const step = STEPS[stepId] ?? STEPS.greeting;
	const clearTimer = () => {
		if (timerRef.current != null) {
			window.clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	};
	const goTo = (0, import_react.useCallback)((id, modelPatch) => {
		clearTimer();
		setError(null);
		setDraft({});
		setChecks({});
		setCopied(false);
		if (modelPatch) setModel((m) => ({
			...m,
			...modelPatch
		}));
		setStepId(id);
		setHistory((h) => h[h.length - 1] === id ? h : [...h, id]);
		setPhase("typing");
		mainRef.current?.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, []);
	const restart = () => {
		clearTimer();
		setModel({});
		setDraft({});
		setChecks({});
		setError(null);
		setHistory([INITIAL_STEP]);
		setStepId(INITIAL_STEP);
		setPhase("typing");
	};
	(0, import_react.useEffect)(() => {
		clearTimer();
		const msg = resolveMessage(step, model);
		setMessage(msg);
		setPhase("typing");
		const typingMs = Math.min(1400, 400 + msg.length * 8);
		timerRef.current = window.setTimeout(() => {
			setPhase("ready");
			if (step.autoAdvanceMs && step.next) timerRef.current = window.setTimeout(() => {
				goTo(step.next);
			}, step.autoAdvanceMs);
		}, typingMs);
		return clearTimer;
	}, [stepId]);
	const progress = Math.max(.04, Math.min(1, step.progress));
	const displayLines = (0, import_react.useMemo)(() => message.split("\n"), [message]);
	const submitInputs = () => {
		if (!step.inputs) return;
		const nextModel = { ...model };
		for (const f of step.inputs) if (f.type === "checkboxes") nextModel[f.name] = checks[f.name] ?? [];
		else nextModel[f.name] = draft[f.name] ?? "";
		const err = validate(step.inputs, nextModel);
		if (err) {
			setError(err);
			return;
		}
		setModel(nextModel);
		if (step.next) goTo(step.next, nextModel);
	};
	const onChoice = async (label, target, modelUpdate, copyEmail) => {
		if (copyEmail) {
			try {
				await navigator.clipboard.writeText(copyEmail);
				setCopied(true);
				window.setTimeout(() => setCopied(false), 2200);
			} catch {
				setError(`Copy failed — email is ${copyEmail}`);
			}
			return;
		}
		const patch = modelUpdate ? { [modelUpdate.key]: modelUpdate.value } : void 0;
		if (target) goTo(target, patch);
	};
	const canContinue = phase === "ready" && !step.inputs?.length && !step.choices?.length && !!step.next && !step.autoAdvanceMs;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full origin-left bg-progress transition-transform duration-500 ease-out",
					style: { transform: `scaleX(${progress})` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: restart,
						className: "group flex min-w-0 items-center gap-3 text-left",
						"aria-label": "Restart conversation",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fg text-[11px] font-semibold tracking-[0.12em] text-accent-fg",
							children: "ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-[13px] font-semibold tracking-[0.14em] uppercase",
								children: ASSISTANT.brand
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-[12px] text-muted",
								children: ASSISTANT.tagline
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 sm:gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSoundOn((s) => !s),
								className: "inline-flex h-10 w-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-choice-hover",
								"aria-label": soundOn ? "Mute assistant" : "Unmute assistant",
								title: soundOn ? "Sound on" : "Sound off",
								children: soundOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4" })
							}),
							history.length > 1 && stepId !== "intro" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: restart,
								className: "inline-flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-medium text-muted transition-colors hover:bg-choice-hover hover:text-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Start over"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${ASSISTANT.email}`,
								className: "hidden h-10 items-center rounded-full border border-border-strong bg-bg-elevated px-4 text-[13px] font-medium transition-colors hover:bg-choice-hover sm:inline-flex",
								children: "Contact"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				ref: mainRef,
				className: "relative mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-28 pt-10 sm:px-6 sm:pt-14 md:pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "idea-rise mb-8 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-elevated shadow-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-semibold tracking-[0.16em]",
								children: ASSISTANT.shortName
							}), phase === "typing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-bg bg-fg" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] font-semibold tracking-wide",
							children: ASSISTANT.shortName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted",
							children: phase === "typing" ? step.isProcessing ? "Working…" : "Typing…" : "Online"
						})] })]
					}, `chip-${stepId}`),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "idea-rise max-w-3xl",
						children: phase === "typing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "idea-typing text-[clamp(1.5rem,4.2vw,2.65rem)] font-medium leading-[1.15] tracking-[-0.03em]",
								children: step.isProcessing ? "Working on it…" : "One moment…"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "idea-dot h-1.5 w-1.5 rounded-full bg-fg" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "idea-dot h-1.5 w-1.5 rounded-full bg-fg" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "idea-dot h-1.5 w-1.5 rounded-full bg-fg" })
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: displayLines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[clamp(1.5rem,4.2vw,2.65rem)] font-medium leading-[1.15] tracking-[-0.03em] text-fg",
								style: { animationDelay: `${i * 40}ms` },
								children: line
							}, i))
						})
					}, `msg-${stepId}-${phase}`),
					phase === "ready" && step.inputs && step.inputs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "idea-rise mt-10 max-w-xl space-y-5",
						onSubmit: (e) => {
							e.preventDefault();
							submitInputs();
						},
						children: [
							step.inputs.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								field,
								draft,
								setDraft,
								checks,
								setChecks
							}, field.name)),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] font-medium text-danger",
								role: "alert",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "inline-flex h-12 min-w-[140px] items-center justify-center rounded-full bg-fg px-7 text-[14px] font-semibold text-accent-fg transition-transform active:scale-[0.98] hover:opacity-90",
								children: "Continue"
							})
						]
					}),
					phase === "ready" && step.choices && step.choices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "idea-rise mt-10 max-w-xl space-y-2",
						children: [
							step.choices.map((c, idx) => {
								const isCopy = !!c.copyEmail;
								const showCopied = isCopy && copied;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onChoice(c.label, c.target, c.modelUpdate, c.copyEmail),
									className: "group flex w-full items-center justify-between gap-4 rounded-[1.25rem] border border-border bg-bg-elevated px-5 py-4 text-left transition-colors hover:border-border-strong hover:bg-choice-hover",
									style: { animationDelay: `${idx * 40}ms` },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[clamp(1rem,2.2vw,1.125rem)] font-medium leading-snug",
										children: isCopy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											"Write us:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "underline decoration-fg/30 underline-offset-4 group-hover:decoration-fg",
												children: c.copyEmail
											})
										] }) : c.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors group-hover:border-fg group-hover:text-fg",
										children: showCopied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : isCopy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[15px] leading-none",
											children: "→"
										})
									})]
								}, `${c.label}-${idx}`);
							}),
							copied && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "pt-2 text-[13px] text-muted",
								children: [ASSISTANT.email, " has been copied to the clipboard."]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] font-medium text-danger",
								role: "alert",
								children: error
							})
						]
					}),
					canContinue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "idea-rise mt-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => step.next && goTo(step.next),
							className: "inline-flex h-12 items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-6 text-[14px] font-semibold transition-colors hover:bg-choice-hover",
							children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "→"
							})]
						})
					}),
					phase === "ready" && step.autoAdvanceMs && step.next && !step.inputs && !step.choices && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "idea-rise mt-10 text-[13px] text-subtle",
						children: "Continuing…"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl flex-col gap-3 px-4 py-5 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-fg",
							children: ASSISTANT.brand
						}),
						" ",
						ASSISTANT.tagline
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-4 gap-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ASSISTANT.location }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${ASSISTANT.email}`,
							className: "underline decoration-border-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-fg",
							children: ASSISTANT.email
						})]
					})]
				})
			}),
			history.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: restart,
				className: "fixed bottom-5 right-4 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-border bg-bg-elevated/95 px-4 text-[12px] font-medium shadow-soft backdrop-blur sm:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), "Quit"]
			})
		]
	});
}
function Field({ field, draft, setDraft, checks, setChecks }) {
	if (field.type === "checkboxes") {
		const selected = checks[field.name] ?? [];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted",
			children: field.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: (field.choices ?? []).map((c) => {
				const on = selected.includes(c.value);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setChecks((prev) => {
						const cur = prev[field.name] ?? [];
						const next = on ? cur.filter((x) => x !== c.value) : [...cur, c.value];
						return {
							...prev,
							[field.name]: next
						};
					}),
					className: on ? "rounded-full bg-fg px-4 py-2.5 text-[13px] font-medium text-accent-fg" : "rounded-full border border-border bg-bg-elevated px-4 py-2.5 text-[13px] font-medium text-fg transition-colors hover:bg-choice-hover",
					children: c.label
				}, c.value);
			})
		})] });
	}
	const shared = "w-full rounded-[1.1rem] border border-border bg-bg-elevated px-4 text-[15px] text-fg outline-none transition-[border-color,box-shadow] placeholder:text-subtle focus:border-fg focus:shadow-[0_0_0_3px_rgba(18,18,18,0.08)]";
	if (field.type === "textarea") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[12px] font-semibold uppercase tracking-[0.14em] text-muted",
			children: field.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			name: field.name,
			rows: 5,
			value: draft[field.name] ?? "",
			onChange: (e) => setDraft((d) => ({
				...d,
				[field.name]: e.target.value
			})),
			placeholder: field.label,
			className: `${shared} min-h-[140px] resize-y py-3.5 leading-relaxed`
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[12px] font-semibold uppercase tracking-[0.14em] text-muted",
			children: field.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: field.type === "month" ? "month" : field.type === "email" ? "email" : "text",
			name: field.name,
			value: draft[field.name] ?? "",
			onChange: (e) => setDraft((d) => ({
				...d,
				[field.name]: e.target.value
			})),
			placeholder: field.label,
			className: `${shared} h-12`,
			autoComplete: field.name === "fullName" ? "name" : field.name === "email" ? "email" : field.name === "company" ? "organization" : field.name === "role" ? "organization-title" : "off"
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeaAssistant, {});
}
//#endregion
export { Home as component };
