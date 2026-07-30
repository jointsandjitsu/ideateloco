import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MilesMode } from "@/components/idea/MilesVisualizer";

type Props = {
  /** Scroll progress 0–1 across the page for parallax depth */
  scrollY?: number;
  mode?: MilesMode;
  speakLevel?: number;
  /** Conversation step / intent for iterative generation */
  seed?: string;
  intensity?: number;
};

/**
 * Full-stage WebGL field: floating bots (incl. CIAO bee), generative
 * response-driven ambient “video” field — not a static image collage.
 */
export function ImmersiveStage({
  scrollY = 0,
  mode = "idle",
  speakLevel = 0,
  seed = "intro",
  intensity = 0.5,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const api = useRef<{
    setScroll: (n: number) => void;
    setMode: (m: MilesMode) => void;
    setSpeak: (n: number) => void;
    setSeed: (s: string) => void;
  } | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const el = host;

    let disposed = false;
    let raf = 0;
    let scroll = scrollY;
    let modeState: MilesMode = mode;
    let speak = speakLevel;
    let seedStr = seed;
    let time = 0;
    let frameAccum = 0;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
      pointerEvents: "none",
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0.2, 6);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(2, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x2d5b3a, 1.4, 20);
    rim.position.set(-2, 1, 2);
    scene.add(rim);
    const glow = new THREE.PointLight(0x6ec8ff, 0.8, 16);
    glow.position.set(1.5, -0.5, 1);
    scene.add(glow);

    // --- Generative “video” plane (canvas texture, iterative per response) ---
    const genCanvas = document.createElement("canvas");
    genCanvas.width = 640;
    genCanvas.height = 360;
    const genCtx = genCanvas.getContext("2d")!;
    const genTex = new THREE.CanvasTexture(genCanvas);
    genTex.colorSpace = THREE.SRGBColorSpace;
    const genMat = new THREE.MeshBasicMaterial({
      map: genTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const genPlane = new THREE.Mesh(new THREE.PlaneGeometry(10.5, 5.9), genMat);
    genPlane.position.set(0, 0, -4.5);
    scene.add(genPlane);

    // Secondary soft field
    const fieldCanvas = document.createElement("canvas");
    fieldCanvas.width = 256;
    fieldCanvas.height = 256;
    const fieldCtx = fieldCanvas.getContext("2d")!;
    const fieldTex = new THREE.CanvasTexture(fieldCanvas);
    const fieldMat = new THREE.MeshBasicMaterial({
      map: fieldTex,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fieldPlane = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), fieldMat);
    fieldPlane.position.set(0, 0, -5.2);
    scene.add(fieldPlane);

    // --- Floating bots ---
    const botsRoot = new THREE.Group();
    scene.add(botsRoot);

    const loader = new THREE.TextureLoader();
    const beeTex = loader.load("/assets/brand/bot-bee.webp");
    beeTex.colorSpace = THREE.SRGBColorSpace;

    function makeBillboard(tex: THREE.Texture, w: number, h: number) {
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      return new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    }

    // CIAO bee bot — hero floater
    const bee = makeBillboard(beeTex, 1.35, 1.7);
    bee.position.set(2.2, 0.4, 1.2);
    botsRoot.add(bee);

    // Procedural companion bots (orb + antenna silhouettes)
    const companions: THREE.Group[] = [];
    for (let i = 0; i < 4; i++) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.SphereGeometry(0.22 + i * 0.02, 20, 16),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xf5f2e6 : 0x2d5b3a,
          roughness: 0.35,
          metalness: 0.25,
        }),
      );
      g.add(body);
      const eyeL = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 12, 10),
        new THREE.MeshBasicMaterial({ color: 0x6ec8ff }),
      );
      eyeL.position.set(-0.07, 0.05, 0.18);
      g.add(eyeL);
      const eyeR = eyeL.clone();
      eyeR.position.x = 0.07;
      g.add(eyeR);
      const ant = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.35, 6),
        new THREE.MeshStandardMaterial({ color: 0x1c242c, metalness: 0.6, roughness: 0.3 }),
      );
      ant.position.y = 0.35;
      g.add(ant);
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 10, 8),
        new THREE.MeshBasicMaterial({ color: 0x6ec8ff }),
      );
      tip.position.y = 0.52;
      g.add(tip);
      const angle = (i / 4) * Math.PI * 2;
      g.position.set(Math.cos(angle) * 2.6, Math.sin(angle * 1.3) * 0.8, -0.5 - i * 0.3);
      g.userData = { phase: i * 1.7, radius: 2.2 + i * 0.35, y0: g.position.y };
      botsRoot.add(g);
      companions.push(g);
    }

    // Floating particles for “video grain” motion
    const pCount = 180;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 12;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pPos[i * 3 + 2] = -1 - Math.random() * 5;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x2d5b3a,
      size: 0.04,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // Hash seed → color mood
    function seedHue(s: string) {
      let h = 0;
      for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
      return (h % 360) / 360;
    }

    function paintGenerative(t: number) {
      const w = genCanvas.width;
      const h = genCanvas.height;
      const ctx = genCtx;
      const hue = seedHue(seedStr);
      const speakBoost = speak;

      // Base wash — iterative “video frame”
      const g = ctx.createRadialGradient(
        w * (0.5 + Math.sin(t * 0.3) * 0.12),
        h * (0.45 + Math.cos(t * 0.22) * 0.1),
        20,
        w * 0.5,
        h * 0.5,
        w * 0.7,
      );
      if (modeState === "speaking") {
        g.addColorStop(0, `hsla(${180 + speakBoost * 40}, 55%, ${42 + speakBoost * 20}%, 0.95)`);
        g.addColorStop(0.45, `hsla(${140 + hue * 40}, 40%, 28%, 0.9)`);
        g.addColorStop(1, "hsla(150, 25%, 12%, 0.98)");
      } else if (modeState === "thinking") {
        g.addColorStop(0, `hsla(${40 + hue * 30}, 50%, 35%, 0.95)`);
        g.addColorStop(0.5, "hsla(150, 30%, 18%, 0.92)");
        g.addColorStop(1, "hsla(210, 35%, 10%, 0.98)");
      } else if (modeState === "listening") {
        g.addColorStop(0, `hsla(${160 + hue * 20}, 45%, 38%, 0.92)`);
        g.addColorStop(0.55, "hsla(150, 35%, 22%, 0.9)");
        g.addColorStop(1, "hsla(200, 30%, 12%, 0.98)");
      } else {
        g.addColorStop(0, `hsla(${150 + hue * 25}, 35%, 32%, 0.9)`);
        g.addColorStop(0.55, "hsla(155, 28%, 20%, 0.9)");
        g.addColorStop(1, "hsla(210, 30%, 11%, 0.98)");
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Scanlines / film
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);

      // Concentric rings — IDEATE “get miles ahead” motif, driven by response
      const cx = w * 0.5;
      const cy = h * 0.48;
      const rings = 7 + Math.floor(speakBoost * 4);
      for (let i = 0; i < rings; i++) {
        const r = 28 + i * (22 + speakBoost * 10) + Math.sin(t * 1.4 + i) * 6;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245,242,230,${0.06 + (1 - i / rings) * 0.12 + speakBoost * 0.08})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Rays
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.08);
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        ctx.rotate(a);
        ctx.strokeStyle = `rgba(245,242,230,${0.04 + speakBoost * 0.06})`;
        ctx.beginPath();
        ctx.moveTo(40, 0);
        ctx.lineTo(140 + speakBoost * 40, 0);
        ctx.stroke();
        ctx.rotate(-a);
      }
      ctx.restore();

      // Waveform ribbon when speaking / seed text pulse
      ctx.strokeStyle = `rgba(110,200,255,${0.35 + speakBoost * 0.45})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const baseY = h * 0.78;
      for (let x = 0; x < w; x += 4) {
        const n =
          Math.sin(x * 0.03 + t * 6) * (8 + speakBoost * 28) +
          Math.sin(x * 0.09 - t * 4 + seedStr.length) * (4 + speakBoost * 12);
        const y = baseY + n;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Intent label (generative caption from seed)
      ctx.fillStyle = "rgba(245,242,230,0.55)";
      ctx.font = "600 14px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(seedStr.replace(/-/g, " · ").toUpperCase().slice(0, 42), cx, h * 0.12);

      genTex.needsUpdate = true;

      // Soft field
      const f = fieldCtx;
      f.clearRect(0, 0, 256, 256);
      const fg = f.createRadialGradient(128, 128, 10, 128, 128, 120);
      fg.addColorStop(0, `hsla(${150 + hue * 40}, 50%, 50%, ${0.35 + speakBoost * 0.3})`);
      fg.addColorStop(1, "hsla(160, 30%, 20%, 0)");
      f.fillStyle = fg;
      f.fillRect(0, 0, 256, 256);
      fieldTex.needsUpdate = true;
    }

    function resize() {
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener("resize", resize);

    api.current = {
      setScroll: (n) => {
        scroll = n;
      },
      setMode: (m) => {
        modeState = m;
      },
      setSpeak: (n) => {
        speak = THREE.MathUtils.clamp(n, 0, 1);
      },
      setSeed: (s) => {
        seedStr = s;
      },
    };

    const clock = new THREE.Clock();
    paintGenerative(0);

    function tick() {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      frameAccum += clock.getDelta();
      if (frameAccum < 1 / 30) return;
      const dt = Math.min(frameAccum, 0.05);
      frameAccum = 0;
      time += dt;

      // Scroll-driven camera / depth
      camera.position.y = 0.2 - scroll * 1.8;
      camera.position.z = 6 + scroll * 1.2;
      camera.lookAt(0, -scroll * 0.6, 0);
      genPlane.position.y = scroll * 0.4;
      fieldPlane.position.y = scroll * 0.25;
      genMat.opacity = 0.35 + (1 - Math.min(scroll, 1)) * 0.25 + speak * 0.15;

      // Bee float path
      bee.position.x = 2.1 + Math.sin(time * 0.55) * 0.55 + Math.sin(scroll * 2) * 0.2;
      bee.position.y = 0.35 + Math.cos(time * 0.7) * 0.35 - scroll * 0.8;
      bee.position.z = 1.1 + Math.sin(time * 0.4) * 0.2;
      bee.rotation.z = Math.sin(time * 0.8) * 0.08;
      bee.rotation.y = Math.sin(time * 0.35) * 0.15;

      companions.forEach((c, i) => {
        const ph = c.userData.phase as number;
        const r = c.userData.radius as number;
        c.position.x = Math.cos(time * 0.35 + ph) * r;
        c.position.z = Math.sin(time * 0.35 + ph) * r * 0.4 - 0.8;
        c.position.y = (c.userData.y0 as number) + Math.sin(time * 0.9 + ph) * 0.25 - scroll * 0.5;
        c.rotation.y = time * 0.4 + i;
        c.scale.setScalar(0.85 + speak * 0.2 + Math.sin(time * 2 + i) * 0.05);
      });

      // Particles drift
      const arr = pGeo.attributes.position!.array as Float32Array;
      for (let i = 0; i < pCount; i++) {
        arr[i * 3 + 1]! += Math.sin(time + i) * 0.002 * (1 + speak);
        arr[i * 3]! += Math.cos(time * 0.5 + i) * 0.001;
        if (arr[i * 3 + 1]! > 4) arr[i * 3 + 1] = -4;
      }
      pGeo.attributes.position!.needsUpdate = true;
      pMat.opacity = 0.35 + speak * 0.4;
      pMat.color.set(modeState === "thinking" ? 0xc4a35a : 0x2d5b3a);

      glow.intensity = 0.6 + speak * 1.2;
      rim.intensity = 1.0 + speak * 0.8;

      if (Math.floor(time * 18) !== Math.floor((time - dt) * 18)) paintGenerative(time);

      renderer.render(scene, camera);
    }
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      api.current = null;
      renderer.dispose();
      genMat.dispose();
      genTex.dispose();
      fieldMat.dispose();
      fieldTex.dispose();
      pGeo.dispose();
      pMat.dispose();
      if (renderer.domElement.parentElement === el) el.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    api.current?.setScroll(scrollY);
  }, [scrollY]);
  useEffect(() => {
    api.current?.setMode(mode);
  }, [mode]);
  useEffect(() => {
    api.current?.setSpeak(speakLevel);
  }, [speakLevel]);
  useEffect(() => {
    api.current?.setSeed(seed);
  }, [seed]);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    />
  );
}
