"use client";

import React, { useRef, useEffect } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import images from './data';
import styles from './styles.module.css';
import './index.css';

const calculateX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20;
const calculateY = (x, lx) => (x - lx - window.innerWidth / 2) / 20;

const wheel = (y) => {
  const imgHeight = window.innerWidth * 0.3 - 20;
  return `translateY(${-imgHeight * (y < 0 ? 6 : 1) - (y % (imgHeight * 5))}px)`;
};

export default function SpringAnimation() {

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
    };
  }, []);

  const target = useRef(null);

  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] =
    useSpring(() => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 350, friction: 40 }
    }));

  const [{ wheelY }, wheelApi] = useSpring(() => ({ wheelY: 0 }));

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) =>
        api.start({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
      onPinch: ({ offset: [d, a] }) => api.start({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api.start({
          rotateX: calculateX(py, y.get()),
          rotateY: calculateY(px, x.get()),
          scale: 1.1,
        }),
      onHover: ({ hovering }) =>
        !hovering && api.start({ rotateX: 0, rotateY: 0, scale: 1 }),
      onWheel: ({ event, offset: [, y] }) => {
        event.preventDefault();
        wheelApi.set({ wheelY: y });
      },
    },
    { target, eventOptions: { passive: false } }
  );

  return (
    <div className={styles.container}>
      <animated.div
        ref={target}
        className={styles.card}
        style={{
          transform: "perspective(600px)",
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}
      >
        <animated.div style={{ transform: wheelY.to(wheel) }}>
          {images.map((img, i) => (
            <div key={i} style={{ backgroundImage: `url(${img})` }} />
          ))}
        </animated.div>
      </animated.div>
    </div>
  );
}
