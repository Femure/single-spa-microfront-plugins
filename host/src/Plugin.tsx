import { useRef, useEffect, useState } from "react";
import { mountRootParcel, type Parcel } from "single-spa";
import { useHostStore } from "./store";

export function Plugin() {
  const pocPluginRef = useRef<HTMLDivElement>(null);
  const currentParcel = useRef<Parcel | null>(null);
  const mountingRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { increase } = useHostStore();
  const url = "http://localhost:3000/plugin.js";

  useEffect(() => {
    const mountPlugin = async () => {
      // Prevent multiple mounts
      if (mountingRef.current || currentParcel.current || !pocPluginRef.current) {
        return;
      }

      mountingRef.current = true;

      try {
        setError(null);
        setIsLoading(true);

        // Create a unique container for this mount
        const containerDiv = document.createElement('div');
        containerDiv.setAttribute('data-plugin-id', `plugin-${Date.now()}`);
        
        // Clear and setup the container
        pocPluginRef.current.innerHTML = '';
        pocPluginRef.current.appendChild(containerDiv);

        const parcel = mountRootParcel(() => import(/* @vite-ignore */ url), {
          name: `poc-plugin-${Date.now()}`, // Unique name
          domElement: containerDiv,
          customProps: {
            customprop: "custompropvalue",
            customcallback: () => console.log("customcallback triggered"),
            customstorecallback: () => increase(),
            getStore: useHostStore.getState(),
          },
        });

        currentParcel.current = parcel;
        setIsLoading(false);
      } catch (err) {
        console.error('Error mounting plugin:', err);
        setError(`Failed to load plugin: ${err.message}`);
        setIsLoading(false);
      } finally {
        mountingRef.current = false;
      }
    };

    mountPlugin();

    return () => {
      if (currentParcel.current) {
        currentParcel.current.unmount().catch(console.warn);
        currentParcel.current = null;
      }
      mountingRef.current = false;
    };
  }, []); // Empty dependency array - only run once

  if (error) {
    return (
      <div
        style={{
          border: "2px dashed #ff4444",
          padding: "10px",
          marginTop: "20px",
          minHeight: "100px",
          backgroundColor: "#fff5f5",
        }}
      >
        <div style={{ color: "#cc0000", marginBottom: "10px" }}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "2px dashed #ccc",
        padding: "10px",
        marginTop: "20px",
        minHeight: "100px",
        position: "relative",
      }}
    >
      {isLoading && (
        <div 
          style={{ 
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#666",
            fontSize: "14px"
          }}
        >
          Loading plugin...
        </div>
      )}
      <div ref={pocPluginRef} />
    </div>
  );
}