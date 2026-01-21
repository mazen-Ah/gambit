import gsap from "gsap";

export interface MarqueeScrollerOptions {
  container: HTMLElement | string;
  itemSelector: HTMLElement[] | string;
  direction?: "rtl" | "ltr";
  baseDuration?: number;
  wheelControl?: boolean;
}

export interface MarqueeInstance {
  root: HTMLElement;
  items: HTMLElement[];
  indexes: number[];

  baseDuration: number;
  baseSign: number;
  wheelControl: boolean;

  totalW: number;
  cumWidths: Record<number, number>;
  pxPerSec: number;
  pos: number;
  _destroyed: boolean;

  rebuild(keepPhase?: boolean): void;
  setWheelControl(enabled: boolean): void;
  destroy(): void;
}


interface MarqueeContext {
  instances: MarqueeInstance[];
  tickerOn: boolean;
  lastNow: number;

  ScrollState: { dir: number; velPerSec: number };

  dirTarget: number;
  dirBlend: number;
  velTarget: number;
  DIR_SMOOTH: number;
  VEL_SMOOTH: number;
  MAX_BOOST_MULT: number;

  kickTween: gsap.core.Tween | null;

  LINE_PIXELS: number;
  VELOCITY_DECAY: number;
  VELOCITY_GAIN: number;

  lastWheelT: number;
  lastTouchT: number;
  lastTouchY: number | null;

  listenersOn: boolean;
  lastW: number;
  resizeTO: number | null;

  MOMENTUM_EPS: number;
  RELEASE_GRACE_MS: number;
  RELEASE_DECAY: number;
  immediateStopOnRelease: boolean;
  lastStrongWheelT: number;
  ignoreMomentumUntil: number;
  releaseTimer: gsap.core.Tween | null;
}

declare global {
  interface Window {
    __MARQUEE_CTX__?: MarqueeContext;
  }
}


export function createMarqueeScroller({
  container,
  itemSelector,
  direction = "rtl",
  baseDuration = 10,
  wheelControl = true
}: MarqueeScrollerOptions): MarqueeInstance {

  const root =
    typeof container === "string"
      ? (document.querySelector(container) as HTMLElement)
      : container;

  if (!root) throw new Error("createMarqueeScroller: container not found");

  const items = Array.from(
    typeof itemSelector === "string"
      ? root.querySelectorAll(itemSelector)
      : itemSelector
  ) as HTMLElement[];

  if (!items.length)
    throw new Error("createMarqueeScroller: no items found");

  /* ---------------------------------------------------------
   * Global Context
   * --------------------------------------------------------- */

  const ctx: MarqueeContext = (() => {
    if (!window.__MARQUEE_CTX__) {
      window.__MARQUEE_CTX__ = {
        instances: [],
        tickerOn: false,
        lastNow: performance.now(),

        ScrollState: { dir: 1, velPerSec: 0 },

        dirTarget: 1,
        dirBlend: 1,
        velTarget: 0,
        DIR_SMOOTH: 12,
        VEL_SMOOTH: 20,
        MAX_BOOST_MULT: 6,

        kickTween: null,

        LINE_PIXELS: 40,
        VELOCITY_DECAY: 2.5,
        VELOCITY_GAIN: 0.25,

        lastWheelT: performance.now(),
        lastTouchT: performance.now(),
        lastTouchY: null,

        listenersOn: false,
        lastW: window.innerWidth,
        resizeTO: null,

        MOMENTUM_EPS: 1,
        RELEASE_GRACE_MS: 80,
        RELEASE_DECAY: 0.12,
        immediateStopOnRelease: true,
        lastStrongWheelT: 0,
        ignoreMomentumUntil: 0,
        releaseTimer: null
      };
    }
    return window.__MARQUEE_CTX__;
  })();

  /* ---------------------------------------------------------
   * Helpers
   * --------------------------------------------------------- */

  function scheduleRelease(now: number) {
    if (ctx.releaseTimer) ctx.releaseTimer.kill();
    ctx.releaseTimer = gsap.delayedCall(ctx.RELEASE_GRACE_MS / 1000, () => {
      if (ctx.kickTween) ctx.kickTween.kill();
      if (ctx.immediateStopOnRelease) {
        ctx.velTarget = 0;
        ctx.ScrollState.velPerSec = 0;
      } else {
        gsap.to(ctx, {
          velTarget: 0,
          duration: ctx.RELEASE_DECAY,
          ease: "power2.out"
        });
      }
    });
    ctx.ignoreMomentumUntil = now + ctx.RELEASE_GRACE_MS;
  }

  function startTicker() {
    if (ctx.tickerOn) return;
    ctx.tickerOn = true;
    ctx.lastNow = performance.now();
    gsap.ticker.add(globalTick);
  }

  function stopTicker() {
    if (!ctx.tickerOn) return;
    ctx.tickerOn = false;
    gsap.ticker.remove(globalTick);
  }

  function anyWheelEnabled() {
    return ctx.instances.some((i) => i.wheelControl);
  }

  /* ---------------------------------------------------------
   * Animation Ticker
   * --------------------------------------------------------- */

  function globalTick() {
    const now = performance.now();
    const dt = (now - ctx.lastNow) / 1000;
    ctx.lastNow = now;

    const smoothStep = (cur: number, target: number, rate: number) =>
      cur + (target - cur) * (1 - Math.exp(-rate * dt));

    ctx.dirBlend = smoothStep(ctx.dirBlend, ctx.dirTarget, ctx.DIR_SMOOTH);
    ctx.ScrollState.velPerSec = smoothStep(
      ctx.ScrollState.velPerSec,
      ctx.velTarget,
      ctx.VEL_SMOOTH
    );

    for (const inst of ctx.instances) {
      const baseSign = inst.baseSign;
      const dirFactor = inst.wheelControl ? ctx.dirBlend : 1;
      const vBoostRaw = inst.wheelControl
        ? ctx.VELOCITY_GAIN * ctx.ScrollState.velPerSec
        : 0;

      const maxBoost = inst.pxPerSec * ctx.MAX_BOOST_MULT;
      const vBoost = Math.min(vBoostRaw, maxBoost);

      const speed = inst.pxPerSec + vBoost;
      const move = baseSign * dirFactor * speed * dt;

      inst.pos += move;
      inst.pos = wrapRange(-inst.totalW, 0, inst.pos);

      for (let i = 0; i < inst.items.length; i++) {
        const el = inst.items[i];
        const idx = inst.indexes[i];
        const cum = inst.cumWidths[idx];
        const min = -cum;
        const max = inst.totalW - cum;
        const x = wrapRange(min, max, inst.pos);
        gsap.set(el, { x });
      }
    }
  }

  /* ---------------------------------------------------------
   * Pointer / wheel listeners
   * --------------------------------------------------------- */

  function onWheel(e: WheelEvent) {
    if (!anyWheelEnabled()) return;

    const now = performance.now();
    const dt = Math.max(1, now - ctx.lastWheelT) / 1000;
    ctx.lastWheelT = now;

    const dm = e.deltaMode || 0;
    const norm =
      dm === 1 ? ctx.LINE_PIXELS : dm === 2 ? window.innerHeight : 1;

    const dyPx = (e.deltaY || 0) * norm;
    const absDy = Math.abs(dyPx);

    if (absDy < ctx.MOMENTUM_EPS && now < ctx.ignoreMomentumUntil) return;

    if (absDy >= ctx.MOMENTUM_EPS) {
      ctx.lastStrongWheelT = now;
      const dir = dyPx === 0 ? ctx.ScrollState.dir : dyPx > 0 ? 1 : -1;
      const magPerSec = absDy / dt;

      ctx.ScrollState.dir = dir;
      ctx.dirTarget = dir > 0 ? 1 : -1;

      ctx.velTarget = magPerSec;

      if (ctx.kickTween) ctx.kickTween.kill();
      ctx.kickTween = gsap.to(ctx, {
        velTarget: 0,
        duration: ctx.VELOCITY_DECAY,
        ease: "linear"
      });

      scheduleRelease(now);
      return;
    }

    scheduleRelease(now);
  }

  let _pd = false;
  let _pid: number | null = null;

  function onPtrDown(e: PointerEvent) {
    if (!anyWheelEnabled()) return;
    if (e.pointerType !== "touch") return;
    _pd = true;
    _pid = e.pointerId;

    try {
      inst.root.setPointerCapture(_pid);
    } catch {}

    ctx.lastTouchY = e.clientY;
    ctx.lastTouchT = performance.now();
  }

  function onPtrMove(e: PointerEvent) {
    if (!_pd || e.pointerId !== _pid) return;

    const now = performance.now();
    const dt = Math.max(1, now - ctx.lastTouchT) / 1000;
    const dy = (ctx.lastTouchY ?? e.clientY) - e.clientY;

    ctx.lastTouchY = e.clientY;
    ctx.lastTouchT = now;

    const dir = dy === 0 ? ctx.ScrollState.dir : dy > 0 ? 1 : -1;
    const magPerSec = Math.abs(dy) / dt;

    ctx.ScrollState.dir = dir;
    ctx.dirTarget = dir > 0 ? 1 : -1;

    ctx.velTarget = magPerSec;

    if (ctx.kickTween) ctx.kickTween.kill();
    ctx.kickTween = gsap.to(ctx, {
      velTarget: 0,
      duration: ctx.VELOCITY_DECAY,
      ease: "power3.out"
    });

    scheduleRelease(now);
  }

  function onPtrUp(e: PointerEvent) {
    if (e.pointerId !== _pid) return;
    _pd = false;
    try {
      inst.root.releasePointerCapture(_pid!);
    } catch {}
    _pid = null;
    scheduleRelease(performance.now());
  }

  function attachListeners() {
    if (ctx.listenersOn) return;
    ctx.listenersOn = true;

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerdown", onPtrDown, { passive: true });
    window.addEventListener("pointermove", onPtrMove, { passive: true });
    window.addEventListener("pointerup", onPtrUp, { passive: true });
    window.addEventListener("pointercancel", onPtrUp, { passive: true });
    window.addEventListener("resize", onResize);
  }

  function detachListeners() {
    if (!ctx.listenersOn) return;
    ctx.listenersOn = false;

    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("pointerdown", onPtrDown);
    window.removeEventListener("pointermove", onPtrMove);
    window.removeEventListener("pointerup", onPtrUp);
    window.removeEventListener("pointercancel", onPtrUp);
    window.removeEventListener("resize", onResize);
  }

  function onResize() {
    if (window.innerWidth === ctx.lastW) return;
    ctx.lastW = window.innerWidth;

    if (ctx.resizeTO) clearTimeout(ctx.resizeTO);
    ctx.resizeTO = window.setTimeout(() => {
      ctx.instances.forEach((i) => rebuildInstance(i, true));
    }, 80);
  }

  function wrapRange(min: number, max: number, v: number) {
    const r = max - min;
    let x = (v - min) % r;
    if (x < 0) x += r;
    return x + min;
  }

  /* ---------------------------------------------------------
   * Instance object
   * --------------------------------------------------------- */

  const indexes = items.map((_, i) => i);

  const origRoot = {
    position: root.style.position,
    overflow: root.style.overflow
  };

  const origItemStyles = items.map((el) => ({
    position: el.style.position,
    left: el.style.left,
    willChange: el.style.willChange,
    transform: el.style.transform
  }));

  const inst: MarqueeInstance = {
    root,
    items,
    indexes,
    baseDuration,
    baseSign: direction === "ltr" ? -1 : 1,
    wheelControl,
    totalW: 0,
    cumWidths: {},
    pxPerSec: 0,
    pos: 0,
    _destroyed: false,

    rebuild(keepPhase = true) {
      if (this._destroyed) return;
      rebuildInstance(this, keepPhase);
    },

    setWheelControl(enabled: boolean) {
      this.wheelControl = !!enabled;
    },

    destroy() {
      if (this._destroyed) return;
      this._destroyed = true;

      const idx = ctx.instances.indexOf(this);
      if (idx > -1) ctx.instances.splice(idx, 1);

      root.style.position = origRoot.position;
      root.style.overflow = origRoot.overflow;

      items.forEach((el, i) => {
        const st = origItemStyles[i];
        el.style.position = st.position;
        el.style.left = st.left;
        el.style.willChange = st.willChange;
        el.style.transform = st.transform;
        gsap.set(el, { clearProps: "x" });
      });

      if (ctx.instances.length === 0) {
        stopTicker();
        detachListeners();
      }
    }
  };

  /* ---------------------------------------------------------
   * Measurement & rebuild
   * --------------------------------------------------------- */

  function measureInstance(inst: MarqueeInstance) {
    const cs = getComputedStyle(inst.root);
    if (cs.position === "static") inst.root.style.position = "relative";
    inst.root.style.overflow = "hidden";

    gsap.set(inst.items, { x: 0 });

    inst.totalW = 0;
    inst.cumWidths = {};
    let runningLeft = 0;

    inst.items.forEach((el, i) => {
      const w = el.getBoundingClientRect().width;
      gsap.set(el, {
        position: "absolute",
        left: runningLeft,
        willChange: "transform"
      });
      runningLeft += w;
      inst.totalW += w;
      inst.cumWidths[i] = inst.totalW;
    });

    inst.pxPerSec = inst.totalW / Math.max(0.001, inst.baseDuration);
  }

  function rebuildInstance(inst: MarqueeInstance, keepPhase: boolean) {
    let phase = 0;

    if (keepPhase && inst.totalW > 0) {
      phase = (inst.pos + inst.totalW) / inst.totalW;
    }

    measureInstance(inst);

    inst.pos = keepPhase
      ? wrapRange(-inst.totalW, 0, -inst.totalW * phase)
      : 0;

    inst.items.forEach((el, i) => {
      const idx = inst.indexes[i];
      const cum = inst.cumWidths[idx];
      const min = -cum;
      const max = inst.totalW - cum;
      const x = wrapRange(min, max, inst.pos);
      gsap.set(el, { x });
    });
  }

  /* ---------------------------------------------------------
   * Initialize
   * --------------------------------------------------------- */

  measureInstance(inst);
  attachListeners();
  startTicker();

  setTimeout(() => {
    ctx.resizeTO = window.setTimeout(() => {
      ctx.instances.forEach((i) => rebuildInstance(i, true));
    }, 80);
  }, 1000);

  ctx.instances.push(inst);

  return inst;
}