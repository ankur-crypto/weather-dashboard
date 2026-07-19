"use client";

interface Props {
  layer: MapLayer;
  setLayer: (
    layer: MapLayer
  ) => void;
}

export type MapLayer =
  | "street"
  | "satellite"
  | "rain"
  | "clouds"
  | "temp";

interface LayerItem {
  id: MapLayer;
  label: string;
}

const layers: LayerItem[] = [
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
    label: "🌡 Temperature",
  },
];

export default function MapToolbar({
  layer,
  setLayer,
}: Props) {
  return (
    <div
      className="
        flex
        flex-wrap
        gap-3
        bg-slate-50
        p-4
        dark:bg-slate-900/40
      "
    >
      {layers.map((item) => {
        const active =
          layer === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              setLayer(
                item.id
              )
            }
            className={`
              rounded-xl
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-300
              ${
                active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "border border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-slate-700"
              }
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}