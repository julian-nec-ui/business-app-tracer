import {Map, MapMarker, MapPopup, MapTileLayer, MapZoomControl } from "../../components/ui/map"; // Adjust the import path as needed

export default function MapExample() {
  return (
    <div>
    <Map
      center={[51.505, -0.09]}
      zoom={20}
      style={{ height: "400px", width: "100%" }}
    >
      <MapTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapMarker position={[51.505, -0.09]}>
        <MapPopup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </MapPopup>
      </MapMarker>
      <MapZoomControl position="topright" />
    </Map>
    </div>
  );
}