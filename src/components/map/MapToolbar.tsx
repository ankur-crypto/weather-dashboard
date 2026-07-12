interface Props {
  layer: string;
  setLayer: (layer: string) => void;
}

const layers = [
  {
    id: "street",
    label: "🗺 Street",
  },
  {
    id: "satellite",
    label: "🛰 Satellite",
  },
  {
    id: "rain",
    label: "🌧 Rain",
  },
  {
    id: "clouds",
    label: "☁ Clouds",
  },
  {
    id: "temp",
    label: "🌡 Temp",
  },
];

export default function MapToolbar({
  layer,
  setLayer,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 p-3">
      {layers.map((item) => (
        <button
          key={item.id}
          onClick={() => setLayer(item.id)}
          className={`rounded-lg px-4 py-2 text-sm transition ${
            layer === item.id
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}