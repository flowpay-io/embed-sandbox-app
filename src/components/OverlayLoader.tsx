import "./OverlayLoader.css";

interface OverlayLoaderProps {
  isLoading: boolean;
  message?: string;
}

export function OverlayLoader({
  isLoading,
  message = "Loading...",
}: OverlayLoaderProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="overlay-loader">
      <div className="overlay-loader-backdrop" />
      <div className="overlay-loader-content">
        <div className="overlay-loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        {message && <p className="overlay-loader-message">{message}</p>}
      </div>
    </div>
  );
}
