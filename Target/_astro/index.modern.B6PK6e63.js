import { e as p } from "./index.modern.CkIAsQri.js";
import { queryAll as u } from "./Swup.modern.QWtOAMWR.js";
function a() {
	return (
		(a = Object.assign
			? Object.assign.bind()
			: function (t) {
					for (var o = 1; o < arguments.length; o++) {
						var i = arguments[o];
						for (var s in i)
							Object.prototype.hasOwnProperty.call(i, s) &&
								(t[s] = i[s]);
					}
					return t;
				}),
		a.apply(this, arguments)
	);
}
class g {
	constructor(t) {
		(this._raf = null),
			(this._positionY = 0),
			(this._velocityY = 0),
			(this._targetPositionY = 0),
			(this._targetPositionYWithOffset = 0),
			(this._direction = 0),
			(this.scrollTo = (t) => {
				if (t && t.nodeType)
					this._targetPositionY = Math.round(
						t.getBoundingClientRect().top + window.pageYOffset
					);
				else {
					if (
						parseInt(this._targetPositionY) !==
						this._targetPositionY
					)
						return void console.error(
							"Argument must be a number or an element."
						);
					this._targetPositionY = Math.round(t);
				}
				this._targetPositionY >
					document.documentElement.scrollHeight -
						window.innerHeight &&
					(this._targetPositionY =
						document.documentElement.scrollHeight -
						window.innerHeight),
					(this._positionY =
						document.body.scrollTop ||
						document.documentElement.scrollTop),
					(this._direction =
						this._positionY > this._targetPositionY ? -1 : 1),
					(this._targetPositionYWithOffset =
						this._targetPositionY + this._direction),
					(this._velocityY = 0),
					this._positionY !== this._targetPositionY
						? (this.options.onStart(), this._animate())
						: this.options.onAlreadyAtPositions();
			}),
			(this._animate = () => {
				this._update(),
					this._render(),
					(1 === this._direction &&
						this._targetPositionY > this._positionY) ||
					(-1 === this._direction &&
						this._targetPositionY < this._positionY)
						? ((this._raf = requestAnimationFrame(this._animate)),
							this.options.onTick())
						: ((this._positionY = this._targetPositionY),
							this._render(),
							(this._raf = null),
							this.options.onTick(),
							this.options.onEnd());
			}),
			(this._update = () => {
				const t = this._targetPositionYWithOffset - this._positionY;
				return (
					(this._velocityY += t * this.options.acceleration),
					(this._velocityY *= this.options.friction),
					(this._positionY += this._velocityY),
					Math.abs(t)
				);
			}),
			(this._render = () => {
				window.scrollTo(0, this._positionY);
			}),
			(this.options = a(
				{},
				{
					onAlreadyAtPositions: () => {},
					onCancel: () => {},
					onEnd: () => {},
					onStart: () => {},
					onTick: () => {},
					friction: 0.7,
					acceleration: 0.04,
				},
				t
			)),
			t && t.friction && (this.options.friction = 1 - t.friction),
			window.addEventListener(
				"mousewheel",
				(t) => {
					this._raf &&
						(this.options.onCancel(),
						cancelAnimationFrame(this._raf),
						(this._raf = null));
				},
				{ passive: !0 }
			);
	}
}
function c() {
	return (
		(c = Object.assign
			? Object.assign.bind()
			: function (t) {
					for (var o = 1; o < arguments.length; o++) {
						var i = arguments[o];
						for (var s in i)
							Object.prototype.hasOwnProperty.call(i, s) &&
								(t[s] = i[s]);
					}
					return t;
				}),
		c.apply(this, arguments)
	);
}
class S extends p {
	constructor(t = {}) {
		super(),
			(this.name = "SwupScrollPlugin"),
			(this.requires = { swup: ">=4.2.0" }),
			(this.scrl = void 0),
			(this.defaults = {
				doScrollingRightAway: !1,
				animateScroll: {
					betweenPages: !0,
					samePageWithHash: !0,
					samePage: !0,
				},
				scrollFriction: 0.3,
				scrollAcceleration: 0.04,
				getAnchorElement: void 0,
				offset: 0,
				scrollContainers: "[data-swup-scroll-container]",
				shouldResetScrollPosition: () => !0,
				markScrollTarget: !1,
			}),
			(this.options = void 0),
			(this.cachedScrollPositions = {}),
			(this.previousScrollRestoration = void 0),
			(this.currentCacheKey = void 0),
			(this.getAnchorElement = (t = "") =>
				"function" == typeof this.options.getAnchorElement
					? this.options.getAnchorElement(t)
					: this.swup.getAnchorElement(t)),
			(this.getOffset = (t) =>
				t
					? "function" == typeof this.options.offset
						? parseInt(String(this.options.offset(t)), 10)
						: parseInt(String(this.options.offset), 10)
					: 0),
			(this.onBeforeLinkToSelf = (t) => {
				t.scroll.animate = this.shouldAnimate("samePage");
			}),
			(this.handleScrollToTop = (t) => {
				var o, i;
				return (
					null == (o = (i = this.swup).scrollTo) ||
						o.call(i, 0, t.scroll.animate),
					!0
				);
			}),
			(this.onBeforeLinkToAnchor = (t) => {
				t.scroll.animate = this.shouldAnimate("samePageWithHash");
			}),
			(this.handleScrollToAnchor = (t, { hash: o }) =>
				this.maybeScrollToAnchor(o, t.scroll.animate)),
			(this.onBeforeVisitStart = (t) => {
				(t.scroll.scrolledToContent = !1),
					(t.scroll.animate = this.shouldAnimate("betweenPages"));
			}),
			(this.onVisitStart = (t) => {
				var o;
				this.cacheScrollPositions(t.from.url),
					this.maybeResetScrollPositions(t);
				const i = null != (o = t.scroll.target) ? o : t.to.hash;
				t.scroll.animate &&
					this.options.doScrollingRightAway &&
					!i &&
					this.doScrollingBetweenPages(t);
			}),
			(this.handleScrollToContent = (t) => {
				t.scroll.scrolledToContent || this.doScrollingBetweenPages(t),
					this.restoreScrollContainers(t.to.url);
			}),
			(this.doScrollingBetweenPages = (t) => {
				var o, i;
				if (t.history.popstate && !t.animation.animate) return;
				const s = null != (o = t.scroll.target) ? o : t.to.hash;
				if (
					(s && this.maybeScrollToAnchor(s, t.scroll.animate)) ||
					!t.scroll.reset
				)
					return;
				const e = this.getCachedScrollPositions(t.to.url),
					n =
						(null == e || null == (i = e.window)
							? void 0
							: i.top) || 0;
				requestAnimationFrame(() => {
					var o, i;
					return null == (o = (i = this.swup).scrollTo)
						? void 0
						: o.call(i, n, t.scroll.animate);
				}),
					(t.scroll.scrolledToContent = !0);
			}),
			(this.maybeResetScrollPositions = (t) => {
				const { popstate: o } = t.history,
					{ url: i } = t.to,
					{ el: s } = t.trigger;
				o ||
					(s && !this.options.shouldResetScrollPosition(s)) ||
					this.resetScrollPositions(i);
			}),
			(this.options = c({}, this.defaults, t));
	}
	mount() {
		const t = this.swup;
		t.hooks.create("scroll:start"), t.hooks.create("scroll:end");
		const o = this.swup.createVisit({ to: this.swup.currentPageUrl });
		(this.scrl = new g({
			onStart: () => t.hooks.callSync("scroll:start", o, void 0),
			onEnd: () => t.hooks.callSync("scroll:end", o, void 0),
			onCancel: () => t.hooks.callSync("scroll:end", o, void 0),
			friction: this.options.scrollFriction,
			acceleration: this.options.scrollAcceleration,
		})),
			(t.scrollTo = (i, s = !0) => {
				s
					? this.scrl.scrollTo(i)
					: (t.hooks.callSync("scroll:start", o, void 0),
						window.scrollTo(0, i),
						t.hooks.callSync("scroll:end", o, void 0));
			}),
			(this.previousScrollRestoration = window.history.scrollRestoration),
			t.options.animateHistoryBrowsing &&
				(window.history.scrollRestoration = "manual"),
			(this.updateScrollTarget = this.updateScrollTarget.bind(this)),
			this.options.markScrollTarget &&
				(window.addEventListener("popstate", this.updateScrollTarget),
				window.addEventListener("hashchange", this.updateScrollTarget),
				this.on("page:view", this.updateScrollTarget),
				this.on("link:anchor", this.updateScrollTarget),
				this.on("link:self", this.updateScrollTarget),
				this.updateScrollTarget()),
			this.before("visit:start", this.onBeforeVisitStart, {
				priority: -1,
			}),
			this.on("visit:start", this.onVisitStart, { priority: 1 }),
			this.replace("content:scroll", this.handleScrollToContent),
			this.before("link:self", this.onBeforeLinkToSelf, { priority: -1 }),
			this.replace("scroll:top", this.handleScrollToTop),
			this.before("link:anchor", this.onBeforeLinkToAnchor, {
				priority: -1,
			}),
			this.replace("scroll:anchor", this.handleScrollToAnchor);
	}
	unmount() {
		super.unmount(),
			this.previousScrollRestoration &&
				(window.history.scrollRestoration =
					this.previousScrollRestoration),
			window.removeEventListener("popstate", this.updateScrollTarget),
			window.removeEventListener("hashchange", this.updateScrollTarget),
			(this.cachedScrollPositions = {}),
			delete this.swup.scrollTo,
			delete this.scrl;
	}
	shouldAnimate(t) {
		return "boolean" == typeof this.options.animateScroll
			? this.options.animateScroll
			: this.options.animateScroll[t];
	}
	maybeScrollToAnchor(t, o = !1) {
		var i, s;
		if (!t) return !1;
		const e = this.getAnchorElement(t);
		if (!e) return console.warn(`Anchor target ${t} not found`), !1;
		if (!(e instanceof Element))
			return console.warn(`Anchor target ${t} is not a DOM node`), !1;
		const { top: n } = e.getBoundingClientRect(),
			r = n + window.scrollY - this.getOffset(e);
		return null == (i = (s = this.swup).scrollTo) || i.call(s, r, o), !0;
	}
	cacheScrollPositions(t) {
		const o = this.swup.resolveUrl(t),
			i = u(this.options.scrollContainers).map((t) => ({
				top: t.scrollTop,
				left: t.scrollLeft,
			})),
			s = {
				window: { top: window.scrollY, left: window.scrollX },
				containers: i,
			};
		this.cachedScrollPositions[o] = s;
	}
	resetScrollPositions(t) {
		const o = this.swup.resolveUrl(t);
		delete this.cachedScrollPositions[o];
	}
	getCachedScrollPositions(t) {
		const o = this.swup.resolveUrl(t);
		return this.cachedScrollPositions[o];
	}
	restoreScrollContainers(t) {
		const o = this.getCachedScrollPositions(t);
		o &&
			0 !== o.containers.length &&
			u(this.options.scrollContainers).forEach((t, i) => {
				const s = o.containers[i];
				null != s && ((t.scrollTop = s.top), (t.scrollLeft = s.left));
			});
	}
	updateScrollTarget() {
		var t;
		const { hash: o } = window.location,
			i = document.querySelector("[data-swup-scroll-target]");
		let s = this.getAnchorElement(o);
		s instanceof HTMLBodyElement && (s = null),
			i !== s &&
				(i?.removeAttribute("data-swup-scroll-target"),
				null == (t = s) ||
					t.setAttribute("data-swup-scroll-target", ""));
	}
}
export { S as default };
