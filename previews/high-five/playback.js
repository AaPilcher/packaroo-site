(function (global) {
  const spec = {
    width: 768,
    height: 768,
    durationMs: 2400,
    contactMs: 630,
    pushIn: { startMs: 390, endMs: 1120, fromScale: 1, toScale: 1.11, anchor: [384, 160], easing: 'easeOutCubic' },
    impact: { startMs: 900, endMs: 1300, fromScale: 1, toScale: 1.9, crop: [328, 89, 100, 51], expansionEasing: 'easeOut', fadeEasing: 'easeIn' },
    frames: [
      ['01-ready.png', 'Ready', 0],
      ['02-dip.png', 'Dip', 180],
      ['03-crouched.png', 'Crouch', 250],
      ['04-drive.png', 'Push off', 340],
      ['05-takeoff.png', 'Takeoff', 390],
      ['06-rising.png', 'Rising', 445],
      ['07-airborne.png', 'Airborne', 505],
      ['08-approach.png', 'Almost touching', 575],
      ['09-contact.png', 'Contact', 630],
      ['10-impact-start.png', 'Impact begins', 685],
      ['11-impact-grow.png', 'Strokes extend', 730],
      ['12-hold.png', 'Full impact', 780]
    ].map(([file, label, startMs], index, rows) => ({ file, label, startMs, durationMs: (rows[index + 1]?.[2] ?? 2400) - startMs }))
  };
  // Standard ease-in curve (0.42, 0, 1, 1); reflecting it gives ease-out.
  function easeIn(progress) {
    if (progress <= 0 || progress >= 1) return progress;
    let low = 0, high = 1;
    for (let i = 0; i < 18; i++) {
      const t = (low + high) / 2, inverse = 1 - t;
      const x = 3 * inverse * inverse * t * 0.42 + 3 * inverse * t * t + t * t * t;
      if (x < progress) low = t; else high = t;
    }
    const t = (low + high) / 2;
    return 3 * (1 - t) * t * t + t * t * t;
  }
  function stateAt(milliseconds) {
    const t = Math.max(0, Math.min(spec.durationMs, milliseconds));
    const index = spec.frames.findLastIndex(f => t >= f.startMs);
    const progress = Math.max(0, Math.min(1, (t - spec.pushIn.startMs) / (spec.pushIn.endMs - spec.pushIn.startMs)));
    const scale = spec.pushIn.fromScale + (spec.pushIn.toScale - spec.pushIn.fromScale) * (1 - Math.pow(1 - progress, 3));
    const impactProgress = Math.max(0, Math.min(1, (t - spec.impact.startMs) / (spec.impact.endMs - spec.impact.startMs)));
    const impactScale = spec.impact.fromScale + (spec.impact.toScale - spec.impact.fromScale) * (1 - easeIn(1 - impactProgress));
    const impactOpacity = index >= 9 ? 1 - easeIn(impactProgress) : 0;
    return { t, index, frame: spec.frames[index], bodyIndex: Math.min(index, 8), scale, impactScale, impactOpacity };
  }
  function draw(ctx, images, milliseconds, background) {
    const state = stateAt(milliseconds);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, spec.width, spec.height);
    if (background) { ctx.fillStyle = background; ctx.fillRect(0, 0, spec.width, spec.height); }
    ctx.save();
    const [x, y] = spec.pushIn.anchor;
    ctx.translate(x, y);
    ctx.scale(state.scale, state.scale);
    ctx.translate(-x, -y);
    ctx.drawImage(images[state.bodyIndex], 0, 0);
    if (state.impactOpacity > 0) {
      ctx.save();
      ctx.globalAlpha = state.impactOpacity;
      ctx.translate(x, y);
      ctx.scale(state.impactScale, state.impactScale);
      ctx.translate(-x, -y);
      const [cropX, cropY, cropWidth, cropHeight] = spec.impact.crop;
      ctx.drawImage(images[state.index], cropX, cropY, cropWidth, cropHeight, cropX, cropY, cropWidth, cropHeight);
      ctx.restore();
    }
    ctx.restore();
    return state;
  }
  const api = { spec, stateAt, draw };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.HighFivePlayback = api;
})(typeof window !== 'undefined' ? window : globalThis);
