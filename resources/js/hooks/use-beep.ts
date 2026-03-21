import { useCallback, useRef } from "react";

type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle';

interface BeepOptions {
    freq?: number;
    duration?: number;
    volume?: number;
    type?: OscillatorType;
}

export default function useBeep() {
    const ctxRef = useRef<AudioContext | null>(null);

    const beep = useCallback(({
        freq = 440,
        duration = 200,
        volume = 0.3,
        type = 'square'
    }: BeepOptions = {}) => {
        if (!ctxRef.current) {
            ctxRef.current = new AudioContext();
        }
        const ctx = ctxRef.current;

        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = freq;
        osc.type = type;
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration / 1000);
    }, []);

    const buzzer = useCallback(() => {
        if (!ctxRef.current) {
            ctxRef.current = new AudioContext();
        }

        const ctx = ctxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sawtooth';

        // Sweep down from 300Hz to 80Hz over 1 second
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 1);

        gain.gain.setValueAtTime(1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1);
    }, []);

    const whistle = useCallback(() => {
        if (!ctxRef.current) {
            ctxRef.current = new AudioContext();
        }

        const ctx = ctxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();   // vibrato effect
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();

        // LFO modulates the main oscillator's frequency (vibrato)
        lfo.frequency.value = 18;            // wobble speed
        lfoGain.gain.value = 12;             // wobble intensity

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);      // LFO → pitch modulation

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.value = 2800;          // high pitch like a whistle

        // Sharp attack, hold, then fade out
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.02);  // sharp attack
        gain.gain.setValueAtTime(0.5, ctx.currentTime + 0.3);            // hold
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6); // fade

        lfo.start(ctx.currentTime);
        osc.start(ctx.currentTime);
        lfo.stop(ctx.currentTime + 1);
        osc.stop(ctx.currentTime + 1);
    }, []);

    return {
        beep,
        tick: () => beep({ freq: 440, duration: 120, volume: 0.2 }),
        success: () => beep({ freq: 880, duration: 400, volume: 0.3 }),
        warning: () => beep({ freq: 330, duration: 600, volume: 0.4 }),
        buzzer,
        whistle
    };
}
