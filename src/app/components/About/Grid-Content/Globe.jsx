"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "./globe.json";

extend({ ThreeGlobe: ThreeGlobe });

// OPTIMIZATION: Reduced speed for better performance
const RING_PROPAGATION_SPEED = 2; // Reduced from 3
const aspect = 1.2;
const cameraZ = 300;

export function Globe({
  globeConfig,
  data,
  isVisible = true // OPTIMIZATION: Accept visibility prop
}) {
  const globeRef = useRef(null);
  const groupRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);
  const intervalRef = useRef(null); // Reference to store interval ID

  // OPTIMIZATION: Track window focus state
  const [isActive, setIsActive] = useState(false);

  // OPTIMIZATION: Monitor window focus for performance optimization
  useEffect(() => {
    const handleFocus = () => setIsActive(true);
    const handleBlur = () => setIsActive(false);

    // Initial state
    setIsActive(document.hasFocus());

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.3,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // OPTIMIZATION: Determine if we should use reduced quality based on config
  const useReducedQuality = globeConfig.isLowPerformanceMode || false;

  // OPTIMIZATION: Enhanced dispose function to thoroughly clean up ThreeGlobe resources
  const disposeGlobe = useCallback(() => {
    if (globeRef.current) {
      // Clear all data
      if (globeRef.current.arcsData) globeRef.current.arcsData([]);
      if (globeRef.current.pointsData) globeRef.current.pointsData([]);
      if (globeRef.current.ringsData) globeRef.current.ringsData([]);
      if (globeRef.current.hexPolygonsData) globeRef.current.hexPolygonsData([]);

      // Remove from parent
      if (groupRef.current) {
        groupRef.current.remove(globeRef.current);
      }

      // Dispose materials
      if (globeRef.current.globeMaterial) {
        const material = globeRef.current.globeMaterial();
        if (material && material.dispose) {
          material.dispose();
        }
      }

      // Dispose atmosphereMaterial if exists
      if (globeRef.current.atmosphereMaterial) {
        const atmosphereMaterial = globeRef.current.atmosphereMaterial();
        if (atmosphereMaterial && atmosphereMaterial.dispose) {
          atmosphereMaterial.dispose();
        }
      }

      // Force three-globe internal cleanup
      if (globeRef.current.__globeObj) {
        // Attempt to clear internal object
        globeRef.current.__globeObj = null;
      }

      // Call dispose method if available
      if (typeof globeRef.current.dispose === 'function') {
        globeRef.current.dispose();
      }

      // Null the reference
      globeRef.current = null;
    }

    // Clear any running intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Reset initialization state
    setIsInitialized(false);
  }, []);

  // Initialize globe only once with cleanup
  useEffect(() => {
    // Only initialize if visible
    if (!isVisible) return;

    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current).add(globeRef.current);
      setIsInitialized(true);
    }

    // OPTIMIZATION: Enhanced cleanup
    return () => {
      disposeGlobe();
    };
  }, [isVisible, disposeGlobe]);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !isVisible) return;

    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
    isVisible
  ]);

  // OPTIMIZATION: Memoize point data creation to reduce calculations
  const filteredPoints = useMemo(() => {
    if (!data) return [];

    let points = [];
    for (let i = 0; i < data.length; i++) {
      const arc = data[i];
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // remove duplicates for same lat and lng
    return points.filter((v, i, a) =>
      a.findIndex((v2) =>
        ["lat", "lng"].every((k) => v2[k] === v[k])) === i);
  }, [data, defaultProps.pointSize]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data || !isVisible) return;

    // OPTIMIZATION: Reduced polygon resolution for better performance
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(useReducedQuality ? 2 : 3) // Reduced from 3 to 2 for better performance
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    // OPTIMIZATION: Only set up arcs if we're visible and have data
    if (data.length > 0) {
      globeRef.current
        .arcsData(data)
        .arcStartLat((d) => (d).startLat * 1)
        .arcStartLng((d) => (d).startLng * 1)
        .arcEndLat((d) => (d).endLat * 1)
        .arcEndLng((d) => (d).endLng * 1)
        .arcColor((e) => (e).color)
        .arcAltitude((e) => (e).arcAlt * 1)
        // OPTIMIZATION: Simplified arc stroke calculation
        .arcStroke(() => useReducedQuality ? 0.28 : [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
        .arcDashLength(defaultProps.arcLength)
        .arcDashInitialGap((e) => (e).order * 1)
        .arcDashGap(15)
        .arcDashAnimateTime(() => defaultProps.arcTime);
    }

    // OPTIMIZATION: Use memoized filtered points
    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => (e).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings);
  }, [
    isInitialized,
    data,
    isVisible,
    filteredPoints,
    useReducedQuality,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data || !isVisible) return;

    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // OPTIMIZATION: Adjust interval speed based on focus and visibility
    intervalRef.current = setInterval(() => {
      if (!globeRef.current || !isVisible) return;

      // OPTIMIZATION: Skip updates when tab not active or component not visible
      if (!isActive) return;

      // OPTIMIZATION: Generate fewer rings when in reduced quality mode
      const ringCount = useReducedQuality
        ? Math.floor((data.length * 2) / 5)
        : Math.floor((data.length * 4) / 5);

      const newNumbersOfRings = genRandomNumbers(0, data.length, ringCount);

      const ringsData = data
        .filter((d, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, isActive ? 2000 : 5000); // OPTIMIZATION: Slower updates when inactive

    return () => {
      // Clear interval on cleanup
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInitialized, data, isVisible, isActive, useReducedQuality]);

  // OPTIMIZATION: Add effect to cleanup when visibility changes
  useEffect(() => {
    // When component becomes invisible, fully clean up resources
    if (!isVisible) {
      disposeGlobe();
    }
  }, [isVisible, disposeGlobe]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    // OPTIMIZATION: Cap pixel ratio for better performance
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);

    // OPTIMIZATION: Enable logarithmic depth buffer for better performance with complex scenes
    gl.logarithmicDepthBuffer = true;

    // OPTIMIZATION: Set power preference to high-performance when available
    if (gl.getContext) {
      const context = gl.getContext();
      if (context && context.powerPreference) {
        context.powerPreference = 'high-performance';
      }
    }

    return () => {
      // Ensure proper cleanup of WebGL context resources
      try {
        // Force release of GPU resources
        gl.dispose();
      } catch (e) {
        console.error("Error during WebGL context cleanup:", e);
      }
    };
  }, [gl, size]);

  return null;
}

export function World(props) {
  const { globeConfig, isVisible = true } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  // OPTIMIZATION: Detect performance capability
  const [devicePerformance, setDevicePerformance] = useState('high');

  // Simple performance detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const start = performance.now();
    let count = 0;
    while (performance.now() - start < 5) {
      count++;
    }

    if (count < 50000) setDevicePerformance('low');
    else if (count < 200000) setDevicePerformance('medium');
  }, []);

// OPTIMIZATION: Cleanup function when component unmounts
  useEffect(() => {
    return () => {
      // Clean up scene resources properly
      if (scene) {
        // Traverse the scene and dispose of all objects
        scene.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }

          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => {
                if (material.map) material.map.dispose();
                material.dispose();
              });
            } else {
              if (object.material.map) object.material.map.dispose();
              object.material.dispose();
            }
          }
        });

        // Remove all children
        while (scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }

        // Clear the scene (removes all objects)
        scene.clear();
      }

      // Clean up any global resources that might leak
      if (typeof window !== 'undefined') {
        // Force garbage collection hint if available
        if (window.gc) window.gc();
      }
    };
  }, [scene]);

  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <WebGLRendererConfig />
      {/* OPTIMIZATION: Adjusted light intensity based on performance */}
      <ambientLight
        color={globeConfig.ambientLight}
        intensity={devicePerformance === 'low' ? 0.4 : 0.6}
      />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
        intensity={devicePerformance === 'low' ? 0.7 : 1}
      />
      {/* OPTIMIZATION: Skip secondary lights on low-performance devices */}
      {devicePerformance !== 'low' && (
        <>
          <directionalLight
            color={globeConfig.directionalTopLight}
            position={new Vector3(-200, 500, 200)}
          />
          <pointLight
            color={globeConfig.pointLight}
            position={new Vector3(-200, 500, 200)}
            intensity={0.8}
          />
        </>
      )}
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={0.5}
        autoRotate={isVisible && globeConfig?.autoRotate !== false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min, max, count) {
  // OPTIMIZATION: More efficient algorithm for generating random numbers
  if (max - min < count) count = max - min;
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
