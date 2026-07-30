import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type MilesMode = "idle" | "listening" | "speaking" | "thinking";

type Props = {
  compact: boolean;
  mode: MilesMode;
  muted: boolean;
  speakLevel?: number;
  seed?: string;
};

/**
 * Photoreal MILES — Locomotive L.I.S.A. architecture:
 * dual CRT/TV face screens, articulated neck, EXR studio lighting,
 * mouse-follow, speak-reactive glow. Official IDEATE logo on chest.
 */
export function MilesVisualizer({ compact, mode, muted, speakLevel = 0, seed = "idle" }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{
    setCompact: (v: boolean) => void;
    setMode: (m: MilesMode) => void;
    setSpeak: (n: number) => void;
    setMuted: (v: boolean) => void;
    setSeed: (s: string) => void;
  } | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const el: HTMLDivElement = host;

    let disposed = false;
    let raf = 0;
    const mouse = new THREE.Vector2(0, 0);
    const mouseSmooth = new THREE.Vector2(0, 0);
    const mouseLag = new THREE.Vector2(0, 0);
    let compactState = compact;
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
    renderer.setClearColor(0xf5f2e6, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
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
    const camera = new THREE.PerspectiveCamera(28, 1, 0.05, 40);

    const pmrem = new THREE.PMREMGenerator(renderer);
    let envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    scene.environmentIntensity = 0.95;

    new EXRLoader().load(
      "/assets/miles/envmap.exr",
      (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        const mapped = pmrem.fromEquirectangular(tex).texture;
        scene.environment = mapped;
        envMap.dispose();
        envMap = mapped;
        tex.dispose();
      },
      undefined,
      () => {},
    );

    scene.add(new THREE.AmbientLight(0xffffff, 0.28));
    scene.add(new THREE.HemisphereLight(0xfff6e8, 0x8a9a8c, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.85);
    key.position.set(1.8, 4.2, 5.5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc8d8ff, 0.55);
    fill.position.set(-3.2, 1.8, 2.5);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(0.2, 2.5, -3.5);
    scene.add(rim);
    const faceLight = new THREE.PointLight(0x8ec0ff, 0.6, 4);
    faceLight.position.set(0, 1.4, 1.2);
    scene.add(faceLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(2.4, 64),
      new THREE.MeshStandardMaterial({
        color: 0xe4dece,
        roughness: 0.92,
        metalness: 0,
        envMapIntensity: 0.25,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.08;
    scene.add(ground);

    // Photoreal materials
    const skin = new THREE.MeshPhysicalMaterial({
      color: 0xf3ecdf,
      roughness: 0.32,
      metalness: 0.04,
      clearcoat: 0.45,
      clearcoatRoughness: 0.35,
      sheen: 0.45,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color(0xf8f2e8),
      envMapIntensity: 0.85,
    });
    const cloth = new THREE.MeshPhysicalMaterial({
      color: 0x15261c,
      roughness: 0.82,
      metalness: 0.08,
      sheen: 0.25,
      sheenRoughness: 0.75,
      sheenColor: new THREE.Color(0x2d5b3a),
      envMapIntensity: 0.4,
    });
    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0xd6dbe4,
      roughness: 0.12,
      metalness: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.5,
    });
    const plastic = new THREE.MeshPhysicalMaterial({
      color: 0x121820,
      roughness: 0.28,
      metalness: 0.45,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
      envMapIntensity: 0.95,
    });
    const bezel = new THREE.MeshPhysicalMaterial({
      color: 0x0a0c10,
      roughness: 0.4,
      metalness: 0.55,
      envMapIntensity: 0.8,
    });
    const cableMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1e24,
      roughness: 0.38,
      metalness: 0.6,
      envMapIntensity: 1,
    });
    const glassEye = new THREE.MeshPhysicalMaterial({
      color: 0x0a1018,
      roughness: 0.08,
      metalness: 0.2,
      transmission: 0.15,
      thickness: 0.4,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.2,
      transparent: true,
      opacity: 0.92,
    });

    // Dual screen canvases — LISA-style TV faces
    const screenCanvases = [0, 1].map(() => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 640;
      return c;
    });
    const screenTex = screenCanvases.map((c) => {
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      return t;
    });
    const screenMats = screenTex.map(
      (map) =>
        new THREE.MeshPhysicalMaterial({
          map,
          emissiveMap: map,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 0.55,
          roughness: 0.35,
          metalness: 0.05,
          toneMapped: false,
        }),
    );

    const root = new THREE.Group();
    scene.add(root);
    const torso = new THREE.Group();
    root.add(torso);

    // Rounded torso
    const chest = new THREE.Mesh(new THREE.CapsuleGeometry(0.44, 0.62, 14, 40), cloth);
    chest.position.y = 0.14;
    chest.scale.set(1.12, 1, 0.86);
    torso.add(chest);

    // Soft shoulder pads
    for (const side of [-1, 1] as const) {
      const pad = new THREE.Mesh(new THREE.SphereGeometry(0.2, 28, 22), cloth);
      pad.scale.set(1.3, 0.88, 1.05);
      pad.position.set(side * 0.52, 0.52, 0.02);
      torso.add(pad);
      const joint = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.028, 14, 28), chrome);
      joint.rotation.y = Math.PI / 2;
      joint.position.set(side * 0.58, 0.48, 0.02);
      torso.add(joint);
      const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.28, 8, 16), cloth);
      arm.position.set(side * 0.68, 0.22, 0.06);
      arm.rotation.z = side * 0.55;
      torso.add(arm);
    }

    // Collar ring
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 16, 48), chrome);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, 0.62, 0.06);
    torso.add(collar);

    // Chest plate + official logo
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.28, 0.06), chrome);
    plate.position.set(0, 0.2, 0.4);
    plate.rotation.x = -0.1;
    torso.add(plate);
    const badgeTex = new THREE.TextureLoader().load("/assets/brand/ideate-logo.png");
    badgeTex.colorSpace = THREE.SRGBColorSpace;
    const badge = new THREE.Mesh(
      new THREE.PlaneGeometry(0.2, 0.2),
      new THREE.MeshBasicMaterial({ map: badgeTex, transparent: true, toneMapped: false }),
    );
    badge.position.set(0, 0.2, 0.435);
    badge.rotation.x = -0.1;
    torso.add(badge);

    // Neck chain
    const neck1 = new THREE.Group();
    neck1.position.set(0, 0.72, 0.06);
    torso.add(neck1);
    neck1.add(new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.16, 28), chrome));

    const neck2 = new THREE.Group();
    neck2.position.set(0, 0.15, 0);
    neck1.add(neck2);
    neck2.add(new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.14, 24), plastic));

    // Cables
    for (const side of [-1, 1] as const) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.12, 0, 0),
        new THREE.Vector3(side * 0.18, 0.14, -0.1),
        new THREE.Vector3(side * 0.14, 0.32, -0.08),
        new THREE.Vector3(side * 0.08, 0.48, -0.02),
      ]);
      neck1.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.016, 8, false), cableMat));
      const curve2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.08, 0.02, -0.04),
        new THREE.Vector3(side * 0.14, 0.2, -0.12),
        new THREE.Vector3(side * 0.1, 0.42, -0.04),
      ]);
      neck1.add(new THREE.Mesh(new THREE.TubeGeometry(curve2, 24, 0.011, 6, false), cableMat));
    }

    const head = new THREE.Group();
    head.position.set(0, 0.22, 0);
    neck2.add(head);

    // Rounded skull
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.32, 48, 40), skin);
    skull.scale.set(1.08, 1.12, 0.82);
    skull.position.set(0, 0.14, -0.06);
    head.add(skull);

    // Jaw / chin
    const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.16, 28, 20), skin);
    jaw.scale.set(1.45, 0.75, 1.1);
    jaw.position.set(0, -0.08, 0.12);
    head.add(jaw);

    // Ear pods
    for (const side of [-1, 1] as const) {
      const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.09, 20), chrome);
      ear.rotation.z = Math.PI / 2;
      ear.position.set(side * 0.34, 0.14, 0);
      head.add(ear);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.05, 0.01, 10, 28),
        new THREE.MeshBasicMaterial({ color: 0x5cb87a }),
      );
      ring.rotation.y = Math.PI / 2;
      ring.position.set(side * 0.385, 0.14, 0);
      head.add(ring);
    }

    // ── Dual TV face (Locomotive L.I.S.A. signature) ──
    const tv = new THREE.Group();
    tv.position.set(0, 0.16, 0.26);
    head.add(tv);

    // Shared chassis
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.4, 0.08), bezel);
    chassis.position.z = -0.01;
    tv.add(chassis);

    // Rounded outer frame
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.42, 0.03), chrome);
    frame.position.z = -0.04;
    tv.add(frame);

    // Two independent CRT screens side by side
    for (const side of [-1, 1] as const) {
      const idx = side < 0 ? 0 : 1;
      // bezel per screen
      const housing = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.32, 0.05), plastic);
      housing.position.set(side * 0.115, 0.01, 0.03);
      tv.add(housing);
      // slightly inset glowing screen
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.185, 0.28), screenMats[idx]);
      panel.position.set(side * 0.115, 0.01, 0.056);
      tv.add(panel);
      // glass cover
      const glass = new THREE.Mesh(
        new THREE.PlaneGeometry(0.195, 0.29),
        new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          roughness: 0.05,
          metalness: 0,
          transmission: 0.35,
          thickness: 0.05,
          transparent: true,
          opacity: 0.25,
          envMapIntensity: 1.2,
        }),
      );
      glass.position.set(side * 0.115, 0.01, 0.06);
      tv.add(glass);
    }

    // Antennae with glowing orbs (robot character energy)
    for (const side of [-1, 1] as const) {
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.28, 8), chrome);
      ant.position.set(side * 0.12, 0.52, -0.05);
      ant.rotation.z = side * 0.25;
      head.add(ant);
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0x6ec8ff }),
      );
      tip.position.set(side * 0.18, 0.66, -0.05);
      head.add(tip);
    }

    // Status LEDs under chin
    const leds = [0, 1, 2].map((i) => {
      const m = new THREE.MeshBasicMaterial({ color: 0x5cb87a });
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.015, 12, 12), m);
      led.position.set(-0.1 + i * 0.1, -0.2, 0.28);
      head.add(led);
      return m;
    });

    const camCompact = new THREE.Vector3(0, 1.18, 2.5);
    const camExpanded = new THREE.Vector3(0, 1.22, 2.85);
    const lookCompact = new THREE.Vector3(0, 1.02, 0);
    const lookExpanded = new THREE.Vector3(0, 1.12, 0);
    const camPos = camCompact.clone();
    const lookAt = lookCompact.clone();
    camera.position.copy(camPos);
    camera.lookAt(lookAt);

    const rest = { neck1: { x: 0.04 }, neck2: { x: 0.02 } };
    const additive = { neck1: { x: 0, y: 0 }, neck2: { x: 0, z: 0 }, torso: { x: 0 } };

    function seedHue(s: string) {
      let h = 0;
      for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
      return h % 360;
    }

    function drawScreens(t: number) {
      const hue = seedHue(seedStr);
      for (let i = 0; i < 2; i++) {
        const c = screenCanvases[i]!;
        const ctx = c.getContext("2d")!;
        const w = c.width;
        const h = c.height;

        // Deep CRT base
        const g = ctx.createLinearGradient(0, 0, w, h);
        if (modeState === "speaking") {
          g.addColorStop(0, `hsl(${200 + (hue % 30)}, 55%, 7%)`);
          g.addColorStop(1, `hsl(${190 + (hue % 25)}, 50%, 16%)`);
        } else if (modeState === "thinking") {
          g.addColorStop(0, `hsl(${40 + (hue % 20)}, 40%, 8%)`);
          g.addColorStop(1, `hsl(${30}, 35%, 14%)`);
        } else if (modeState === "listening") {
          g.addColorStop(0, `hsl(${150 + (hue % 20)}, 35%, 8%)`);
          g.addColorStop(1, `hsl(${155}, 30%, 14%)`);
        } else {
          g.addColorStop(0, "#06080c");
          g.addColorStop(1, "#0e1218");
        }
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        // Scanlines
        ctx.fillStyle = "rgba(255,255,255,0.035)";
        for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);

        // Vignette
        const vig = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w * 0.7);
        vig.addColorStop(0, "rgba(0,0,0,0)");
        vig.addColorStop(1, "rgba(0,0,0,0.45)");
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, w, h);

        const cx = w * 0.5;
        const cy = h * 0.4;
        const pulse = 0.55 + speak * 0.45 + Math.sin(t * 3 + i) * 0.05;

        // Eye / core
        if (modeState === "thinking") {
          ctx.strokeStyle = `rgba(200,170,90,${0.55 + pulse * 0.35})`;
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.arc(cx, cy, 54 + Math.sin(t * 3.5 + i) * 10, t * 2 + i, t * 2 + i + Math.PI * 1.4);
          ctx.stroke();
        } else {
          // outer ring
          ctx.beginPath();
          ctx.arc(cx, cy, 62, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(100,180,255,${0.45 + pulse * 0.4})`;
          ctx.lineWidth = 3.5;
          ctx.stroke();
          // pupil glow
          const pr = 16 + speak * 18;
          const lookX = mouseSmooth.x * 12 * (i === 0 ? 1 : 0.35);
          const lookY = -mouseSmooth.y * 10;
          const grd = ctx.createRadialGradient(cx + lookX, cy + lookY, 1, cx + lookX, cy + lookY, pr * 1.8);
          grd.addColorStop(0, "#f2f8ff");
          grd.addColorStop(0.25, "#7eb6ff");
          grd.addColorStop(0.7, "rgba(40,80,140,0.5)");
          grd.addColorStop(1, "rgba(10,20,40,0)");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(cx + lookX, cy + lookY, pr, 0, Math.PI * 2);
          ctx.fill();
        }

        // Waveform / idle code
        if (modeState === "speaking" || speak > 0.05) {
          ctx.strokeStyle = `rgba(126,182,255,${0.55 + speak * 0.4})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          const baseY = h * 0.74;
          for (let x = 32; x < w - 32; x += 4) {
            const n =
              Math.sin(x * 0.05 + t * 10 + i) * (12 + speak * 36) +
              Math.sin(x * 0.13 - t * 7) * (6 + speak * 16);
            const y = baseY + n;
            if (x === 32) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        } else {
          ctx.fillStyle = "rgba(140,170,200,0.28)";
          ctx.font = "11px ui-monospace, monospace";
          for (let k = 0; k < 6; k++) {
            const x = 36 + ((k * 67 + Math.floor(t * 14 + i * 11)) % (w - 100));
            const y = h * 0.66 + ((k * 27) % 50);
            ctx.fillText(i === 0 ? "MILES" : seedStr.slice(0, 8).toUpperCase(), x, y);
          }
        }

        // Brand footer on each screen
        ctx.fillStyle = "rgba(245,242,230,0.75)";
        ctx.font = "700 22px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(i === 0 ? "M" : "S", cx, h * 0.92);

        screenTex[i]!.needsUpdate = true;
        const mat = screenMats[i]!;
        mat.emissiveIntensity = 0.35 + speak * 0.55 + (modeState === "speaking" ? 0.15 : 0);
      }
    }

    function smooth(v: number, min: number, max: number) {
      const t = THREE.MathUtils.clamp((v - min) / (max - min), 0, 1);
      return t * t * (3 - 2 * t);
    }

    function resize() {
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    }

    function onPointer(e: PointerEvent) {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);

    apiRef.current = {
      setCompact: (v) => {
        compactState = v;
      },
      setMode: (m) => {
        modeState = m;
      },
      setSpeak: (n) => {
        speak = THREE.MathUtils.clamp(n, 0, 1);
      },
      setMuted: () => {},
      setSeed: (s) => {
        seedStr = s;
      },
    };

    drawScreens(0);
    const clock = new THREE.Clock();

    function tick() {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      frameAccum += clock.getDelta();
      if (frameAccum < 1 / 30) return;
      const dt = Math.min(frameAccum, 0.05);
      frameAccum = 0;
      time += dt;

      mouseSmooth.lerp(mouse, 0.05);
      mouseLag.lerp(mouse, 0.12);
      const vel = mouseLag.clone().sub(mouseSmooth);

      camPos.lerp(compactState ? camCompact : camExpanded, 0.08);
      lookAt.lerp(compactState ? lookCompact : lookExpanded, 0.08);
      root.position.y = THREE.MathUtils.lerp(root.position.y, compactState ? 0.04 : 0.32, 0.08);
      root.position.z = THREE.MathUtils.lerp(root.position.z, compactState ? 0.12 : 0.32, 0.08);
      camera.position.copy(camPos);
      camera.lookAt(lookAt);

      const breath = Math.sin(time * 1.1) * 0.016;
      const breath2 = Math.sin(time * 0.48) * 0.035;

      neck1.rotation.z = THREE.MathUtils.lerp(-0.08, 0.08, smooth(mouseSmooth.x, -1, 1));
      neck1.rotation.x =
        THREE.MathUtils.lerp(rest.neck1.x + 0.12, rest.neck1.x - 0.12, smooth(mouseSmooth.y, -1, 1)) +
        additive.neck1.x;
      neck1.rotation.y =
        THREE.MathUtils.lerp(0.35, -0.35, smooth(mouseSmooth.x, -1, 1)) + additive.neck1.y;

      torso.rotation.z = THREE.MathUtils.lerp(-0.02, 0.02, smooth(mouseSmooth.x, -1, 1));
      torso.rotation.x =
        THREE.MathUtils.lerp(0.05, -0.05, smooth(mouseSmooth.y, -1, 1)) + additive.torso.x + breath;
      torso.rotation.y = THREE.MathUtils.lerp(0.1, -0.1, smooth(mouseSmooth.x, -1, 1));

      neck2.rotation.x = rest.neck2.x + breath2 + additive.neck2.x;
      neck2.rotation.z = Math.sin(time * 0.2) * 0.025 + additive.neck2.z;

      faceLight.intensity = 0.4 + speak * 1.1;

      const ledCol =
        modeState === "thinking" ? 0xc4a35a : modeState === "speaking" ? 0x6ec8ff : 0x5cb87a;
      for (const m of leds) m.color.setHex(ledCol);

      if (modeState === "speaking") {
        additive.neck2.x = Math.sin(time * 10) * 0.025 * Math.max(speak, 0.25);
      } else if (modeState === "thinking") {
        additive.neck1.y = Math.sin(time * 1.3) * 0.09;
        additive.neck2.x = Math.sin(time * 2) * 0.03;
      } else {
        additive.neck1.y *= 0.92;
        additive.neck2.x *= 0.92;
      }

      void vel;
      void muted;

      if (Math.floor(time * 24) !== Math.floor((time - dt) * 24)) drawScreens(time);
      renderer.render(scene, camera);
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      apiRef.current = null;
      renderer.dispose();
      pmrem.dispose();
      envMap.dispose();
      skin.dispose();
      cloth.dispose();
      chrome.dispose();
      plastic.dispose();
      bezel.dispose();
      cableMat.dispose();
      glassEye.dispose();
      screenMats.forEach((m) => m.dispose());
      screenTex.forEach((t) => t.dispose());
      badgeTex.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      if (renderer.domElement.parentElement === el) el.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    apiRef.current?.setCompact(compact);
  }, [compact]);
  useEffect(() => {
    apiRef.current?.setMode(mode);
  }, [mode]);
  useEffect(() => {
    apiRef.current?.setSpeak(speakLevel);
  }, [speakLevel]);
  useEffect(() => {
    apiRef.current?.setMuted(muted);
  }, [muted]);
  useEffect(() => {
    apiRef.current?.setSeed(seed);
  }, [seed]);

  return (
    <div ref={hostRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden />
  );
}
