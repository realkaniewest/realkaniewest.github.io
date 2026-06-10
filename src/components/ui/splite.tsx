import { Suspense } from "react";

interface SplineSceneProps {
  scene?: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<div className="spline-loader">loading scene</div>}>
      {scene ? (
        <iframe className={className} src={scene.replace("/scene.splinecode", "")} title="Interactive kitten scene" />
      ) : (
        <div className={className}>
          <div className="kitten-scene" aria-label="Летний котёнок">
            <div className="kitten-sun" />
            <div className="kitten-cloud kitten-cloud--one" />
            <div className="kitten-cloud kitten-cloud--two" />
            <div className="kitten">
              <span className="kitten__ear kitten__ear--left" />
              <span className="kitten__ear kitten__ear--right" />
              <span className="kitten__head">
                <span className="kitten__eye kitten__eye--left" />
                <span className="kitten__eye kitten__eye--right" />
                <span className="kitten__nose" />
                <span className="kitten__mouth" />
              </span>
              <span className="kitten__body" />
              <span className="kitten__tail" />
              <span className="kitten__paw kitten__paw--left" />
              <span className="kitten__paw kitten__paw--right" />
            </div>
            <div className="kitten-grass" />
          </div>
        </div>
      )}
    </Suspense>
  );
}
